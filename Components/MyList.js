import React from 'react';
import {View, Button, Text, ScrollView, StyleSheet, Switch, SafeAreaView, 
        StatusBar, Image, ImageBackground} from 'react-native'
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from 'firebase'
require('firebase/auth')

let id = 0

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
      loggedOut: false,
      user: [],
      myListData: [],
    }
  }

  // gets the data from the django backend
  fetchDataFromApi = () => {
    const url = "http://192.168.1.74:8000/api/list/";
    fetch(url).then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({myListData: res})
    })
    .catch(error => {
      console.log(error)
    })
  };

  componentDidMount(){
    // listens for when the tab is selected as MyList
    this.focusListener = this.props.navigation.addListener("focus", () => {      
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log('user is logged out')
          this.setState({loggedOut: true, user: null})
        }
        else{
          // console.log(user)
          console.log('user is logged in ', user.email)
          this.fetchDataFromApi()
          this.setState({user: user, loggedOut: false})
        }
      });
    });
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
    const dotsIcon = <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />

    return (
      this.state.loggedOut === true ? 
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Login in first to access your list</Text>
        </View>
      </SafeAreaView>
      :
      <SafeAreaView style={styles.droidSafeArea}>
        <ScrollView style={styles.container}>
          <View>
            {/* <Text style={styles.textStyle}> MY LIST: </Text> */}
            {this.state.myListData.map((element,key) => {
              return element.email === this.state.user.email ? 
                <View key={key} style={{marginBottom: 10}}>
                  <ImageBackground source={{ uri:element.book_url }}
                    style={{ width: 140, height: 220, position: 'relative', top: 0, left: 0 }} >
                    {element.user_rating !== 'N/A' ? 
                      <Text style={styles.overlayRatingText} >
                        {element.user_rating}/5
                      </Text> : 
                      <Text style={styles.overlayRatingText} >
                        -/5
                      </Text>
                    }
                  </ImageBackground>
                  <View style={{flexDirection: 'row', width: 140, height: 35, backgroundColor: 'tomato', justifyContent: 'center', alignItems: 'center'}}>
                    {element.book_name.length <= 30 ? 
                    <Text style={styles.textStyle}>{element.book_name}</Text> 
                    : 
                    <Text style={styles.textStyle}>{element.book_name.substring(0,27)}...</Text> 
                    }
                    {dotsIcon}
                  </View>
                </View> 
                : null}
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1c',
    paddingHorizontal: 15, paddingTop: 15,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? 'gray' : '#1b1b1c',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    width: 120,
    marginLeft: 5
  },
  image: {
    width: 140, height: 200, resizeMode: 'stretch'
  },
  overlayRatingText: {
    backgroundColor: 'rgba(52, 52, 52, 0.7)', fontWeight: 'bold', color: 'white', 
    position: 'absolute', top: 0, right: 0, fontSize: 22
  }
})