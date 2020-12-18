import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";

class GoogleBookScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      book: [],
      bookImg: '',
      author: '',
    };
    this.getAuthors = this.getAuthors.bind(this);
	}

	componentDidMount(){
    console.log(this.props.route.params.book)
		this.setState({
      book: this.props.route.params.book,
      bookImg: this.props.route.params.bookImg,
    });
    this.getAuthors(this.props.route.params.book.authors)

    // fetch('https://www.googleapis.com/books/v1/volumes?q=Harry_Potter_and_the_Sorcerers_Stone&key=AIzaSyC2uH3lMt5kv43Ys9p34UGWPtJymgOc-Qk', {
		// 		method: 'GET'
		// })
		// .then((response) => response.json())
		// .then((responseJson) => {
		// 	console.log(responseJson)
		// })
		// .catch((error) => {
		// 		console.error(error);
    // });
    
  }

  // gets the author and adds "AND" between multiple authors if there is
  getAuthors(authors){
    var i;
    var combined = '';
    if (authors.length !== 1){
      for (i = 0; i < authors.length; i++){
        if (i === authors.length-1){
          combined = combined + authors[i]
        }
        else {
          combined = combined + authors[i] + ' AND '
        }
      }
    }
    else {
      combined = authors[0]
    }
    this.setState({
      author: combined
    });
  }

	render() {
		return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image source = {{uri:this.state.bookImg}} style = {styles.image} /> 
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>{this.state.book.title}</Text>
              <Text style={styles.text}><Text style={styles.boldAndUnderline}>WRITTEN BY:</Text> {this.state.author}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.descriptionText}><Text style={styles.boldAndUnderline}>Description:</Text> {this.state.book.description}</Text>
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1, backgroundColor: '#1b1b1c',
  },
  image: {
    width: 200, height: 200, resizeMode: 'contain', marginTop: 50
  },
	text: {
    color: '#ebe4d3', fontSize: 20, marginTop: 50, flexWrap: 'wrap',
  },
  descriptionText: {
    color: '#ebe4d3', fontSize: 20, marginTop: 50, flexWrap: 'wrap', marginLeft: 10
  },
  boldAndUnderline: {
    fontWeight: 'bold', textDecorationLine: 'underline'
  }
});

export default GoogleBookScreen;