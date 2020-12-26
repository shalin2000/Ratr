import React from 'react';
import {View, Button, Text, ScrollView, StyleSheet, Switch} from 'react-native'
import Constants from 'expo-constants'

let id = 0

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,  },
  fill: {
    flex: 1,
  }
})

const List = props => (
  <View style={styles.listContainer}>
    <Switch value={props.item.checked} onValueChange={props.onToggle} />
    <Button onPress={props.onDelete} title="delete" />
    <Text>{props.item.text}</Text>
  </View>
)

export default class MyList extends React.Component {
  constructor() {
    super()
    this.state = {
      lists: [],
    }
  }

  addlist() {
    id++
    const text = `List number ${id}`
    this.setState({
      lists: [
        ...this.state.lists,
        {id: id, text: text, checked: false},
      ], 
    })
  }

  removelist(id) {
    this.setState({
      lists: this.state.lists.filter(item => item.id !== id)
    })
  }

  togglelist(id) {
    this.setState({
      lists: this.state.lists.map(item => {
        if (item.id !== id) return item
        return {
          id: item.id,
          text: item.text,
          checked: !item.checked,
        }
      })
    })
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text>List count: {this.state.lists.length}</Text>
        <Text>Unchecked List count: {this.state.lists.filter(item => !item.checked).length}</Text>
        <Button onPress={() => this.addlist()} title="Add to List" />
        <ScrollView style={styles.fill}>
          {this.state.lists.map(item => (
            <List
              onToggle={() => this.togglelist(item.id)}
              onDelete={() => this.removelist(item.id)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}