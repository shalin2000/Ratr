import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";

class GoogleBookScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      
    };
	}

	componentDidMount(){

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

export default GoogleBookScreen;