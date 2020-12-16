import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList } from 'react-native';
// import axios from "axios";

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ficBS: [], nonficBS: [], adultBS: [], middleGradeBS: [], graphicBS: [], seriesBS: [], audioficBS: [], 
      audioNonficBS: [], adviceBS: []
    };
    this.storeTitle = this.storeTitle.bind(this);
  }

  storeTitle(genre, res){
    var x;
    var tmpLst = []
    for (x of res){
      tmpLst.push(x)
    }
    if (genre === 'combined-print-and-e-book-fiction'){
      this.setState({ ficBS: tmpLst })
    }
    if (genre === 'combined-print-and-e-book-nonfiction'){
      this.setState({ nonficBS: tmpLst })
    }
    if (genre ==='young-adult-hardcover'){
      this.setState({ adultBS: tmpLst })
    }
    if (genre === 'middle-grade-paperback-monthly'){
      this.setState({ middleGradeBS: tmpLst })
    }
    if (genre === 'graphic-books-and-manga'){
      this.setState({ graphicBS: tmpLst })
    }
    if (genre === 'series-books'){
      this.setState({ seriesBS: tmpLst })
    }
    if (genre === 'audio-fiction'){
      this.setState({ audioficBS: tmpLst })
    }
    if (genre === 'audio-nonfiction'){
      this.setState({ audioNonficBS: tmpLst })
    }
    if (genre === 'advice-how-to-and-miscellaneous'){
      this.setState({ adviceBS: tmpLst })
    }
    
  }

  callAPI(genre){
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/'+genre+'.json?api-key=iVMyu76Ghr7mUmgiypvYFsas8A73bA2K', {
          method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.results.books)
        this.storeTitle(genre, responseJson.results.books)
      })
      .catch((error) => {
          console.error(error);
    });
  }

  componentDidMount() {
    this.callAPI('combined-print-and-e-book-fiction');
    this.callAPI('combined-print-and-e-book-nonfiction');
  }

  render() {
    const numColumns = 3;
    const flat = (list) => <FlatList
                              data={list}
                              renderItem={({item}) => (
                                <Image source = {{uri:item.book_image}}
                                  style = {styles.image} /> 
                              )}
                              keyExtractor={(item,key) => key.toString()}
                              numColumns={numColumns}
                            />
                  
    return (
      <View style = {styles.container}>
        {flat(this.state.ficBS)}
        {flat(this.state.nonficBS)}
      </View>      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1c',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  image: {
    marginVertical: 10,
    borderRadius: 5,
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  }
});

export default HomeScreen;
