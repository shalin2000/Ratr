import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, 
      ActivityIndicator, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ficBS: [], nonficBS: [], adultBS: [], middleGradeBS: [], graphicBS: [], seriesBS: [], audioficBS: [], 
      audioNonficBS: [], adviceBS: [],
      isLoading: false,
      searchQuery: '',
    };
    this.storeTitle = this.storeTitle.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  componentDidMount() {
    // calls the apis
    this.callAPI('combined-print-and-e-book-fiction');
    this.callAPI('combined-print-and-e-book-nonfiction');
    this.callAPI('young-adult-hardcover');
    this.callAPI('middle-grade-paperback-monthly');
    this.callAPI('graphic-books-and-manga');
    this.callAPI('series-books');
    this.callAPI('audio-fiction');
    this.callAPI('audio-nonfiction');
    this.callAPI('advice-how-to-and-miscellaneous');

    // adds 1 sec delay for the api and everything to render 
    setTimeout(() => {
      this.setState({ isLoading: true });
    }, 1000);
  }

  // calls the api with the genre parameter which was passed in by the componentdidmount
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

  // stores the book titles into the correct state
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

  // updates the search field with the characters that are being writen by the user
  searchChange = event => {
    this.setState({
      searchQuery: event
    });
  };

  render() {
    // Makes the flatlist for each genre
    const flat = (list, secTitle) => <View>
                                        <Text style={styles.text}> {secTitle} </Text>
                                          <FlatList
                                            horizontal={true}
                                            data={list}
                                            renderItem={({item}) => (
                                              <TouchableOpacity 
                                                onPress={() => {
                                                  this.props.navigation.navigate('NYBook', {
                                                    book: item
                                                  });
                                                }}
                                              >
                                                <Image source = {{uri:item.book_image}}
                                                  style = {styles.image} /> 
                                              </TouchableOpacity>
                                            )}
                                            keyExtractor={(item,key) => key.toString()}
                                          />
                                      </View>
    
    // returns loading screen for 1 sec and then displays the genre after rendering                                       
    return this.state.isLoading ? 
      <ScrollView style={styles.container}>
        {/* Search feature */}
        <Searchbar
          placeholder="Search Book"
          onChangeText={this.searchChange}
          value={this.state.searchQuery}
          onSubmitEditing={() => {
            this.props.navigation.navigate('Search', {
              search: this.state.searchQuery
            });
          }}
        />
        {/* displays the best seller books */}
        {flat(this.state.ficBS, 'Fiction')}
        {flat(this.state.nonficBS, 'Non-Fiction')}
        {flat(this.state.adultBS, 'Young Adult')}
        {flat(this.state.middleGradeBS, 'Middle Grade')}
        {flat(this.state.graphicBS, 'Graphic/Manga')}
        {flat(this.state.seriesBS, 'Series')}
        {flat(this.state.audioficBS, 'Audio Fiction')}
        {flat(this.state.audioNonficBS, 'Audio Non-Fiction')}
        {flat(this.state.adviceBS, 'Advice, How-To and Miscellaneous')}
      </ScrollView>
     :
      <View>
        <ActivityIndicator
            style={{ height: 80 }}
            color="#C00"
            size="large"
        />
      </View>
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#1b1b1c', flexDirection: 'column',
  },
  text: {
    color: '#ebe4d3', fontSize: 20, marginTop: 10
  },
  image: {
    marginVertical: 10, borderRadius: 5, flex: 1, width: 150, height: 200, 
    resizeMode: 'stretch', marginRight: 10, marginTop: 10
  },
});

export default HomeScreen;
