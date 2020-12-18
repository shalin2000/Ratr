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
		fetch('https://www.googleapis.com/books/v1/volumes?q='+title+'&key=AIzaSyC2uH3lMt5kv43Ys9p34UGWPtJymgOc-Qk', {
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

	// Stores all results found from google api when user searched a specifc title
	storeAllBooks(books){
		var book;
    var tmpLst = []
    if (books.totalItems === 0){
      tmpLst = []
    }
    else {
      for (book of books.items){
        tmpLst.push(book)
      }
    }
    this.setState({ resultFound: tmpLst })
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
                                        bookImg: item.volumeInfo.imageLinks.thumbnail
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
		width: 150,
		height: 150,
		resizeMode: 'contain',
	}
});

export default SearchScreen;