import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, Image } from "react-native";
// import StarRating from 'react-native-star-rating';

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
            <View style={{}}>
              <View style={{flexDirection: 'column', margin: 10}}>
                <Text style={styles.text}>{this.state.book.title}</Text>
                <Text style={styles.author}>{this.state.author}</Text>
                {/* <Text style={styles.rating}>Rating: {this.state.book.averageRating}</Text> */}
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
    color: '#ebe4d3', fontSize: 28, marginTop: 50, flexWrap: 'wrap', width: 200
  },
	author: {
    color: 'lightblue', fontSize: 20, marginTop: 0, flexWrap: 'wrap',
  },
  rating: {
    color: 'white', fontSize: 25, marginTop: 0, flexWrap: 'wrap', margin: 5
  },
  descriptionText: {
    color: '#ebe4d3', fontSize: 20, marginTop: 50, flexWrap: 'wrap', marginLeft: 10
  },
  boldAndUnderline: {
    fontWeight: 'bold', textDecorationLine: 'underline'
  }
});

export default GoogleBookScreen;