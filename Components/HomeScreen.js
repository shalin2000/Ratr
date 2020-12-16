import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList } from 'react-native';

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
    this.callAPI('young-adult-hardcover');
    this.callAPI('middle-grade-paperback-monthly');
    this.callAPI('graphic-books-and-manga');
    this.callAPI('series-books');
  }

  render() {
    const flat = (list) => <FlatList
                              horizontal={true}
                              data={list}
                              renderItem={({item}) => (
                                <Image source = {{uri:item.book_image}}
                                  style = {styles.image} /> 
                              )}
                              keyExtractor={(item,key) => key.toString()}
                            />
                  
    return (

      <ScrollView style={styles.container}>
        
        <Text style={styles.text}> Fiction </Text>
        {flat(this.state.ficBS)}
        
        <Text style={styles.text}> Non-Fiction </Text>
        {flat(this.state.nonficBS)}
        
        <Text style={styles.text}> Young Adult </Text>
        {flat(this.state.adultBS)}

        <Text style={styles.text}> Middle Grade </Text>
        {flat(this.state.middleGradeBS)}
        
        <Text style={styles.text}> Graphic/Manga </Text>
        {flat(this.state.graphicBS)}
        
        <Text style={styles.text}> Series </Text>
        {flat(this.state.seriesBS)}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1c',
    flexDirection: 'column',
  },
  text: {
    color: '#ebe4d3',
    fontSize: 20,
  },
  image: {
    marginVertical: 10,
    borderRadius: 5,
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  }
});

export default HomeScreen;
