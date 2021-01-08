import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, 
        Text, Alert, ScrollView, Image, FlatList, TouchableOpacity} from "react-native";

class SearchScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      search: '',
      resultFound: [],
    };
    this.storeAllBooks = this.storeAllBooks.bind(this);
	}

	componentDidMount(){
		this.setState({
			search: this.props.route.params.search,
    });
		this.fetchAPI(this.props.route.params.search)
	}

	fetchAPI(bookTitle){
    var title = bookTitle.split(' ').join('_');
    var title1 = this.removeStuff(title);
    const key = ''
		fetch('https://www.googleapis.com/books/v1/volumes?q='+title1+'&key='+key, {
				method: 'GET'
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson)
			this.storeAllBooks(responseJson)
		})
		.catch((error) => {
				console.error(error);
		});
	}

  // removes the punctuations from the title
  removeStuff(title){
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g;
    return title.replace(regex, '');
  }

	// Stores all results found from google api when user searched a specifc title
	storeAllBooks(books){
		var book;
    var tmpLst = [];
    if (books.totalItems === 0){
      tmpLst = []
    }
    else {
      for (book of books.items){
        tmpLst.push(book)
      }
    }
    var newLst = this.removeNoImg(tmpLst);
    this.setState({ resultFound: newLst })
	}

  // removes books that have no imageLink
  removeNoImg(lst){
    var i;
    var newLst = [];
    for (i = 0; i < lst.length; i++){
      if (typeof(lst[i].volumeInfo.imageLinks) !== 'undefined'){
        newLst.push(lst[i])
      }
    }
    return newLst
  }

	render() {
    // Makes the flatlist for the resultFound from search
    const flat = (list) => <View style={styles.container}>
                              <FlatList
                                columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
                                numColumns={2}
                                // contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                                data={list}
                                renderItem={({item}) => (
                                  <View style={{ flexDirection: "column", margin: 1}}>
                                  <TouchableOpacity 
                                    onPress={() => {
                                      this.props.navigation.navigate('GoogleBook', {
                                        book: item.volumeInfo,
                                        bookImg: item.volumeInfo.imageLinks.thumbnail,
                                        isbn: item.volumeInfo.industryIdentifiers.length > 1 ? item.volumeInfo.industryIdentifiers[1].identifier : 'undefined'
                                      });
                                    }}
                                  > 

                                    <Image source = {{uri:item.volumeInfo.imageLinks.thumbnail}}
                                      style = {styles.image} />
                                  </TouchableOpacity>
                                  </View>
                                )}
                                keyExtractor={(item,key) => key.toString()}
                              />
                          </View>
		return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.container}>
          <Text style={styles.text}>Searched Result... {this.state.search}</Text>
          {/* shows the results that was found by the search */}
          {this.state.resultFound.length !== 0 ? flat(this.state.resultFound) : <Text style={styles.text}>NO BOOKS FOUND!!!</Text>}
        </View>
      </SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#1b1b1c',
    paddingHorizontal: 10, paddingTop: 10,
	},
	text: {
    color: '#ebe4d3',
    fontSize: 20,
    textAlign: "center",
  },
	image: {
    width: 150, height: 200, resizeMode: 'stretch',
		marginVertical: 10,
    borderRadius: 3,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? 'gray' : '#1b1b1c',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});

export default SearchScreen;