import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";

class SearchScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      
    };
	}

	componentDidMount(){
		this.fetchAPI('whatever they search')
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
		
	}

	render() {
		return (
			<ScrollView style={styles.container}>

			</ScrollView>
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
		width: 200,
		height: 200,
		resizeMode: 'contain',
	}
});

export default SearchScreen;