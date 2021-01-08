import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList, 
      ActivityIndicator, TouchableHighlight, TouchableOpacity, SafeAreaView, Platform, Linking } from 'react-native';
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
    const key = ''
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/'+genre+'.json?api-key='+key, {
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
      <SafeAreaView style={styles.droidSafeArea}>
        <ScrollView style={styles.container}>
          {/* Search feature */}
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style = {styles.title}>Ratr</Text>
            <Searchbar style={{flex: 1}}
              placeholder="Search Books"
              onChangeText={this.searchChange}
              value={this.state.searchQuery}
              onSubmitEditing={() => {
                this.props.navigation.navigate('Search', {
                  search: this.state.searchQuery
                });
              }}
            />
          </View>
          
          <Text style={styles.subPara}> New York Times Best Sellers </Text>
          {/* <Text style={styles.subPara}>Authoritatively ranked lists of books sold in the United States, 
            sorted by format and genre.</Text> */}
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
          
         
          <TouchableOpacity onPress={() => {Linking.openURL('https://developer.nytimes.com/');}} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20,}}>
            <Text style={styles.nyText}>Data provided by The New York Times </Text>
            <Image source={require('../Images/ny_times_logo.png')} /> 
          </TouchableOpacity>
          

        </ScrollView>
      </SafeAreaView>
     :
      <SafeAreaView style={styles.droidSafeArea}>
        <ActivityIndicator
            style={{ height: 80 }}
            color="#C00"
            size="large"
        />
      </SafeAreaView>
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#1b1b1c', 
    flexDirection: 'column', paddingHorizontal: 10, paddingTop: 10,
  },
  subPara: {
    color: 'azure', fontSize: 23, marginTop: 10, textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    color: '#ebe4d3', fontSize: 20, marginTop: 10,
    fontWeight: 'bold', textAlign: 'center',
  },
  nyText: {
    color: '#ebe4d3', fontSize: 12, marginRight: 5,
    fontWeight: 'bold', textAlign: 'center',
  },
  title: {
    paddingRight: 10,
    fontSize: 40, 
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'azure',
    
  },
  image: {
    marginVertical: 10, borderRadius: 5, flex: 1, width: 140, height: 200, 
    resizeMode: 'stretch', marginRight: 10, marginTop: 10
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? 'gray' : '#1b1b1c',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});

export default HomeScreen;
