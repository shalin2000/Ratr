import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
// import axios from "axios";

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ficBestSeller: []
    };
    this.storeTitle = this.storeTitle.bind(this);
  }

  storeTitle(res){
    var x;
    var tmpLst = []
    for (x of res){
      tmpLst.push(x)
    }
    this.setState({
      ficBestSeller: tmpLst
    })
  }

  componentDidMount() {
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=iVMyu76Ghr7mUmgiypvYFsas8A73bA2K', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.storeTitle(responseJson.results.books)
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return (
      <View>
        {this.state.ficBestSeller.map((item, key) => <Text key={key}> {item.title} </Text>)}
        {/* <Image source = {{uri:this.state.data}}
        style = {{ width: 328, height: 500 }} */}
        {/* /> */}
        {/* <Text> {this.state.data[0].title} </Text> */}
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
