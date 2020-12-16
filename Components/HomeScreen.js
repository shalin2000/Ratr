import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from "axios";

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=iVMyu76Ghr7mUmgiypvYFsas8A73bA2K', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          data: responseJson.results.books.title
        })
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return (
      <View>
        <Text> {this.state.data} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
