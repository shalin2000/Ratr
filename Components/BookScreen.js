import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";

class BookScreen extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				volumeInfo: [],
				saleInfo: [],
				NYBook: [],
			};
	}

	componentDidMount(){
		this.setState({
			NYBook: this.props.route.params.book
		});
		this.fetchAPI(this.props.route.params.book.title)
	}

	fetchAPI(bookTitle){
		var title = bookTitle.split(' ').join('_');
		fetch('https://www.googleapis.com/books/v1/volumes?q='+title+'&key=AIzaSyC2uH3lMt5kv43Ys9p34UGWPtJymgOc-Qk', {
				method: 'GET'
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson)
			var x;
			for (x of responseJson.items){
				if (((x.volumeInfo.industryIdentifiers[0].identifier === this.props.route.params.book.isbns[0].isbn13) ||
						(x.volumeInfo.industryIdentifiers[0].identifier === this.props.route.params.book.isbns[1].isbn13) ||
						(x.volumeInfo.industryIdentifiers[1].identifier === this.props.route.params.book.isbns[0].isbn10) ||
						(x.volumeInfo.industryIdentifiers[1].identifier === this.props.route.params.book.isbns[1].isbn10)) ||
						((x.volumeInfo.title === this.props.route.params.book.title) && (x.volumeInfo.authors === this.props.route.params.book.author))){
					this.storeBook(x)
				}
			}
			this.storeAllBooks(responseJson)
		})
		.catch((error) => {
				console.error(error);
		});
	}

	// Stores the correct book that was selected from the NYTIMES
	storeBook(book){
		this.setState({
			volumeInfo: book.volumeInfo,
			saleInfo: book.saleInfo,
		})
	}

	// Stores all results found from google api when user searched a specifc title
	storeAllBooks(books){
		
	}

	render() {
		return (
			<ScrollView style={styles.container}>

				<Text style={styles.text}>{this.state.volumeInfo.title}</Text>
				<Text style={styles.text}>{this.state.saleInfo.buyLink}</Text>



				<Text style={styles.text}>{this.state.NYBook.title}</Text>
				<Image source = {{uri:this.state.NYBook.book_image}} style = {styles.image} /> 
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

export default BookScreen;