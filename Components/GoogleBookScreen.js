import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ScrollView, 
        Image, TouchableOpacity, Linking, Modal, TextInput, Dimensions, KeyboardAvoidingView, 
        Platform, Keyboard  } from "react-native";
import Stars from 'react-native-stars';
import ReadMore from 'react-native-read-more-text';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Ionicons, FontAwesome, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from 'firebase'
require('firebase/auth')

const windowWidth = Dimensions.get('window').width;

class GoogleBookScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      book: [],
      bookImg: '',
      author: '',
      isbn: '',
      modalVisible: false,
      userRating: '',
      userComment: '',
      userProgress: '',
      user: [],
      selectedReading: false, selectedDone: false, selectedBookmark: false,
      keyboard: false,
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
    // listens for when the tab is selected as MyList
    this.focusListener = this.props.navigation.addListener("focus", () => {      
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log('user is logged out')
          this.setState({user: null})
        }
        else{
          // console.log(user)
          console.log('user is logged in ', user.email)
          this.setState({user: user})
        }
      });
    });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow,);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide,);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({keyboard: true})
  }

  _keyboardDidHide = () => {
    this.setState({keyboard: false})
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

  // it will post to the api with the correct info that user enters
  postToAPI(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.user.email,
        book_name: this.state.book.title,
        book_author: this.state.author,
        book_url: this.state.bookImg,
        user_rating: this.state.userRating,
        user_comment: this.state.userComment,
        user_progress: this.state.userProgress,
      }),
    };
    fetch("https://ratr-app21.herokuapp.com/api/list/", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  // makes the modal visible when user clicks the plus button
  setModalVisible = (visible,txt) => {
    if (txt === 'submit'){
      this.postToAPI()
    }
    this.setState({ modalVisible: visible });
  }

  // sets the state of the selected icon which shows the progess of the book
  changeIcon = (icon) => {
    if (icon === 'reading'){
      this.setState({selectedReading: true, selectedDone: false, selectedBookmark: false, userProgress: 'Reading'})
    }
    if (icon === 'done'){
      this.setState({selectedReading: false, selectedDone: true, selectedBookmark: false, userProgress: 'Completed'})
    }
    if (icon === 'bookmark'){
      this.setState({selectedReading: false, selectedDone: false, selectedBookmark: true, userProgress: 'Read Later', 
                      userRating: 'N/A',
                    })
    }
  }

  // when rating has been done it will set state to store for backend
  ratingCompleted = (rating) => {
    this.setState({userRating: rating.toString()})
  }

	render() {    
    const closeIcon = <Icon name="close" size={20} color="grey" />

    const readingOutlineIcon = <MaterialCommunityIcons name="book-open-variant" size={50} color="black" />
    const readingFilledIcon = <MaterialCommunityIcons name="book-open-page-variant" size={50} color="tomato" />
    const doneOutlineIcon = <Ionicons name="ios-checkmark-circle-outline" size={50} color="black" />
    const doneFilledIcon = <Ionicons name="ios-checkmark-circle" size={50} color="tomato" />
    const bookmarkOutlineIcon = <MaterialCommunityIcons name="bookmark-multiple-outline" size={50} color="black" />
    const bookmarkFilledIcon = <MaterialCommunityIcons name="bookmark-multiple" size={50} color="tomato" />

		return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.container}>
          <ScrollView >
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 10}}>
                <Image source = {{uri:this.state.bookImg}} style = {styles.image} /> 
              </View>
              <View >
                <Text style={styles.title}>{this.state.book.title}</Text>
                <Text style={styles.author}>{this.state.author}</Text>
                {this.state.isbn !== 'undefined' ? <Text style={styles.isbnAndPage}>ISBN: {this.state.isbn}</Text> : null }
                {typeof this.state.book.pageCount !== 'undefined' ? <Text style={styles.isbnAndPage}>Page Count: {this.state.book.pageCount}</Text> : null }
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10, alignItems:'center'}}>
              <Stars
                default={this.state.book.averageRating}
                count={5}
                half={true}
                // starSize={20}
                disabled={true}
                fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                emptyStar={<Icon name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
              />
              {typeof this.state.book.ratingsCount !== 'undefined' ? <Text style={{color: 'white', fontSize: 12, flexWrap: 'wrap', margin: 5}}>- {this.state.book.ratingsCount} Ratings</Text> 
              : <Text style={{color: 'white', fontSize: 12, flexWrap: 'wrap', margin: 5}}>- 0 Ratings</Text>}
            </View>
            
            <View>
              <Text style={styles.description}>
                Description
              </Text>
              <View >
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

            <View style={{marginTop: 25}}>
              {typeof this.state.book.infoLink !== 'undefined' ? <TouchableOpacity onPress={()=> {Linking.openURL(this.state.book.infoLink)}}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <Image source={require('../Images/moreInfo.png')} style={{width: 20, height: 20, resizeMode: 'contain'}} /> 
                  <Text style={{color: '#ebe4d3', fontSize: 18}}>  More Info</Text>
                </View>
              </TouchableOpacity>
              : null}
              {typeof this.state.book.previewLink !== 'undefined' ? <TouchableOpacity onPress={()=> {Linking.openURL(this.state.book.previewLink)}}>
                <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                  <Image source={require('../Images/preview.webp')} style={{width: 20, height: 25, resizeMode: 'contain'}} /> 
                  <Text style={{color: '#ebe4d3', fontSize: 18, paddingLeft: 5}}> Preview</Text>
                </View>
              </TouchableOpacity>
              : null}
            </View>

          </ScrollView>

          <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
            <View style={this.state.keyboard ? styles.topView : styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity style={{marginRight: -20, marginTop: 5, alignSelf: 'flex-end'}} 
                  onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                  {closeIcon}
                </TouchableOpacity>
                <View style={{alignItems: "center", marginTop: 10}}>
                  <Text >Add to your list</Text>

                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => {this.changeIcon('done')}}>
                        {this.state.selectedDone ? doneFilledIcon : doneOutlineIcon}
                      </TouchableOpacity>
                      <Text style={{fontSize: 7}}>Completed</Text>
                    </View>
                    <View style={{marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => {this.changeIcon('reading')}}>
                        {this.state.selectedReading ? readingFilledIcon : readingOutlineIcon}
                      </TouchableOpacity>
                      <Text style={{fontSize: 7}}>In-Progess</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => {this.changeIcon('bookmark')}}>
                        {this.state.selectedBookmark ? bookmarkFilledIcon : bookmarkOutlineIcon}
                      </TouchableOpacity>
                      <Text style={{fontSize: 7}}>Bookmark</Text>
                    </View>
                  </View>
                  
                  <Text style={{marginVertical: 10}}>_________________</Text>

                  <Rating
                    type='custom'
                    fractions={1}
                    type='star'
                    startingValue={0}
                    ratingCount={5}
                    imageSize={35}
                    showRating
                    readonly={this.state.selectedBookmark}
                    onFinishRating={this.ratingCompleted}
                  />

                  <Text style={{marginVertical: 10}} >_________________</Text>

                  <TextInput style={styles.modalText} multiline = {true} placeholder="Enter your comment about the book" 
                  maxLength = {280}
                  onChangeText={userComment => this.setState({userComment: userComment})} defaultValue={this.state.userComment}
                  />

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "tomato", flex: 1 }}
                      onPress={() => {this.setState({userComment: '', userRating: '', userProgress: ''})}}>
                      <Text style={styles.textStyle}>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "tomato", flex: 1, marginLeft: 10 }}
                      onPress={() => {this.setModalVisible(!this.state.modalVisible,'submit')}}>
                      <Text style={styles.textStyle}>Add To List</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <FAB
          style={styles.fab}
          small
          icon="plus"
          color="white"
          onPress={() => this.state.user !== null ? this.setModalVisible(true) : alert("Please log in before adding to list")}
          />
        </View>
      </SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#1b1b1c',
    paddingHorizontal: 15, paddingTop: 15,
  },
  image: {
    width: 150, height: 200, resizeMode: 'stretch'
  },
  title: {
    color: 'lightblue', fontSize: 28, flexWrap: 'wrap', width: windowWidth-190
  },
	author: {
    color: '#ebe4d3', fontSize: 18, flexWrap: 'wrap', width: windowWidth-190
  },
  isbnAndPage: {
    color: '#ebe4d3', fontSize: 12, marginTop: 5, flexWrap: 'wrap'
  },
  secondView:{
    margin: 5, marginTop: 5, fontSize: 25, fontWeight: '800', color: 'grey',
  },
  description: {
    color: 'lightblue', fontSize: 20, marginBottom: 15, marginTop: 20
  },
  descriptionText: {
    color: '#ebe4d3', fontSize: 15
  },
  myStarStyle: {
    color: '#de0b2b',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: '#de0b2b',
  },
  fab: {
    position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: 'tomato'
  },
  topView: {
    flex: 1,
    justifyContent: Platform.OS === 'android' ? 'center' : 'flex-start',
    alignItems: "center",
    marginTop: 22
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    paddingLeft: 35,
    paddingBottom: 35,
    paddingRight: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? 'gray' : '#1b1b1c',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});

export default GoogleBookScreen;