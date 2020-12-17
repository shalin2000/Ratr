import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";

class BookScreen extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				googleBook: [],
				NYBook: []
			};
	}

	componentDidMount(){
		fetch('https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=AIzaSyC2uH3lMt5kv43Ys9p34UGWPtJymgOc-Qk', {
          method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({googleBook: responseJson})
      })
      .catch((error) => {
          console.error(error);
		});
		

		this.setState({
			NYBook: this.props.route.params.book
		});
		console.log(this.props.route.params.book)
	}

	render() {
		return (
			<ScrollView style={styles.container}>
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