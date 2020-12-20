import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, 
        Image, TouchableOpacity, Linking } from "react-native";
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReadMore from 'react-native-read-more-text';
import { FAB } from 'react-native-paper';

class GoogleBookScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      book: [],
      bookImg: '',
      author: '',
      isbn: '',
    };
    this.getAuthors = this.getAuthors.bind(this);
	}

	componentDidMount(){
    console.log(this.props.route.params.book)
		this.setState({
      book: this.props.route.params.book,
      bookImg: this.props.route.params.bookImg,
      isbn: this.props.route.params.isbn,
      
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
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection: 'row'}}>
              <Image source = {{uri:this.state.bookImg}} style = {styles.image} /> 
              <View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.title}>{this.state.book.title}</Text>
                  <Text style={styles.author}>{this.state.author}</Text>
                  {this.state.isbn !== 'undefined' ? <Text style={styles.isbnAndPage}>ISBN: {this.state.isbn}</Text> : null }
                  {typeof this.state.book.pageCount !== 'undefined' ? <Text style={styles.isbnAndPage}>Page Count: {this.state.book.pageCount}</Text> : null }
                </View>
              </View>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10, alignItems:'center'}}>
            <Stars
              default={this.state.book.averageRating}
              count={5}
              half={true}
              // starSize={20}
              disabled={true}
              fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
              emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
              halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
            />
            {typeof this.state.book.ratingsCount !== 'undefined' ? <Text style={{color: 'white', fontSize: 12, flexWrap: 'wrap', margin: 5}}>- {this.state.book.ratingsCount} Ratings</Text> 
            : <Text style={{color: 'white', fontSize: 12, flexWrap: 'wrap', margin: 5}}>- 0 Ratings</Text>}
          </View>
          
          <View>
            <Text style={styles.description}>
              Description
            </Text>
            <View style={{marginLeft: 20}}>
              <ReadMore 
              numberOfLines={5} 
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
                <Text style={styles.descriptionText}>
                  {this.state.book.description}
                </Text>
              </ReadMore>
            </View>
          </View>

          <View style={{marginLeft: 20, marginTop: 25}}>
            {typeof this.state.book.infoLink !== 'undefined' ? <TouchableOpacity onPress={()=> {Linking.openURL(this.state.book.infoLink)}}>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Image source={require('../Images/moreInfo.png')} style={{width: 20, height: 20, resizeMode: 'contain'}} /> 
                <Text style={{color: '#ebe4d3', fontSize: 18}}>  More Info</Text>
              </View>
            </TouchableOpacity>
            : null}
            {typeof this.state.book.previewLink !== 'undefined' ? <TouchableOpacity onPress={()=> {Linking.openURL(this.state.book.previewLink)}}>
              <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                <Image source={require('../Images/preview.webp')} style={{width: 25, height: 25, resizeMode: 'contain'}} /> 
                <Text style={{color: '#ebe4d3', fontSize: 18}}> Preview</Text>
              </View>
            </TouchableOpacity>
            : null}
          </View>

        </ScrollView>

        <FAB
        style={styles.fab}
        small
        icon="plus"
        color="yellow"
        onPress={() => console.log('Pressed')}
        />
      </View>
      
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#1b1b1c',
  },
  image: {
    width: 175, height: 200, resizeMode: 'contain', marginTop: 50
  },
  title: {
    color: '#ebe4d3', fontSize: 28, marginTop: 50, flexWrap: 'wrap', width: 175
  },
	author: {
    color: 'lightblue', fontSize: 18, marginTop: 0, flexWrap: 'wrap', width: 175
  },
  isbnAndPage: {
    color: 'white', fontSize: 12, marginTop: 5, flexWrap: 'wrap'
  },
  secondView:{
    margin: 5, marginTop: 5, fontSize: 25, fontWeight: '800', color: 'grey',

  },
  description: {
    color: '#ebe4d3', fontSize: 20, marginLeft:20, marginBottom: 15, marginTop: 20
  },
  descriptionText: {
    color: '#ebe4d3', fontSize: 15
  },
  myStarStyle: {
    color: 'pink',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  fab: {
    position: 'absolute', margin: 16, right: 0, bottom: 0,
  },
});

export default GoogleBookScreen;