import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";

class BookScreen extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				book: []
			};
	}

	componentDidMount(){
		this.setState({
			book: this.props.route.params.book
		});
	}

	render() {
		return (
			<ScrollView>
				<Text>{this.state.book.title}</Text>
				<Image source = {{uri:this.state.book.book_image}} style = {styles.image} /> 
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
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