import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList } from 'react-native';
// import axios from "axios";

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ficBestSeller: [],
      width: 110
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
      console.log(responseJson.results.books)
      this.storeTitle(responseJson.results.books)
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    const numColumns = 3;
    return (
        <FlatList
          data={this.state.ficBestSeller}
          renderItem={({item}) => (
            <Image source = {{uri:item.book_image}}
              style = {styles.image} /> 
          )}
          keyExtractor={(item,key) => key.toString()}
          numColumns={numColumns}
        />       
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  }
});

export default HomeScreen;
