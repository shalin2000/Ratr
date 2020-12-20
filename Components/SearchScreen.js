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
		fetch('https://www.googleapis.com/books/v1/volumes?q='+title1+'&key=AIzaSyC2uH3lMt5kv43Ys9p34UGWPtJymgOc-Qk', {
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
    const flat = (list) => <View>
                              <FlatList
                                numColumns={2}
                                data={list}
                                renderItem={({item}) => (
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
                                )}
                                keyExtractor={(item,key) => key.toString()}
                              />
                          </View>
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Searched Result... {this.state.search}</Text>
        
        {/* shows the results that was found by the search */}
        {this.state.resultFound.length !== 0 ? flat(this.state.resultFound) : <Text style={styles.text}>NO BOOKS FOUND!!!</Text>}

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#1b1b1c',
	},
	text: {
    color: '#ebe4d3',
    fontSize: 20,
  },
	image: {
		marginVertical: 10,
		borderRadius: 5,
		flex: 1,
		width: 165,
		height: 180,
		resizeMode: 'contain',
	}
});

export default SearchScreen;