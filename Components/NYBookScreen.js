import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";

class NYBookScreen extends React.Component {
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
	}

	// Stores all results found from google api when user searched a specifc title
	// storeAllBooks(books){
		
	// }

	render() {
		return (
			<ScrollView style={styles.container}>

				<Text style={styles.text}>{this.state.volumeInfo.title}</Text>
				<Text style={styles.text}>{this.state.saleInfo.buyLink}</Text>


				{/* <Text style={styles.text}>{this.state.NYBook.title}</Text> */}
				<Image source = {{uri:this.props.route.params.book.book_image}} style = {styles.image} /> 
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

export default NYBookScreen;