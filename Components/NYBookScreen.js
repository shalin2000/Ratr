import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, 
        ScrollView, Image, Linking, TouchableOpacity, Modal, TextInput, 
        TouchableWithoutFeedback, Dimensions } from "react-native";
import { FAB } from 'react-native-paper';
import ReadMore from 'react-native-read-more-text';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'firebase'
require('firebase/auth')

const windowWidth = Dimensions.get('window').width;

class NYBookScreen extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      NYBook: [],
      buyLink: [],
      Amazon: '',
      AppleBooks: '',
      BarnesandNoble: '',
      BooksAMillion: '',
      Bookshop: '',
      Indiebound: '',
      placeholder: 'Select option',
      modalVisible: false,
      userRating: '',
      userComment: '',
      userProgress: '',
      user: []
    };
    this.getBuyLinkurl = this.getBuyLinkurl.bind(this);
	}

	componentDidMount(){
		this.setState({
      NYBook: this.props.route.params.book,
      buyLink: this.props.route.params.book.buy_links
    });
    this.getBuyLinkurl(this.props.route.params.book.buy_links)

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
	}

  // gets the links and stores them into the state if there exist those buy links
  getBuyLinkurl(buyLink){
    var x;
    for (x = 0; x < buyLink.length; x++){
      if (buyLink[x].name === 'Amazon'){
        this.setState({Amazon: buyLink[x].url})
      }
      if (buyLink[x].name === 'Apple Books'){
        this.setState({AppleBooks: buyLink[x].url})
      }
      if (buyLink[x].name === 'Barnes and Noble'){
        this.setState({BarnesandNoble: buyLink[x].url})
      }
      if (buyLink[x].name === 'Books-A-Million'){
        this.setState({BooksAMillion: buyLink[x].url})
      }
      if (buyLink[x].name === 'Bookshop'){
        this.setState({Bookshop: buyLink[x].url})
      }
      if (buyLink[x].name === 'Indiebound'){
        this.setState({Indiebound: buyLink[x].url})
      }
    } 
  }

  // it will post to the api with the correct info that user enters
  postToAPI(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.user.email,
        book_name: this.state.NYBook.title,
        book_author: this.state.NYBook.author,
        book_url: this.state.NYBook.book_image,
        user_rating: this.state.userRating,
        user_comment: this.state.userComment,
        user_progress: this.state.userProgress,
      }),
    };
    fetch('http://192.168.1.74:8000/api/list/', requestOptions)
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

	render() {
    const closeIcon = <Icon name="close" size={20} color="grey" />

		return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.container}>
          <ScrollView >
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 10}}>
                <Image source = {{uri:this.state.NYBook.book_image}} style = {styles.image} /> 
              </View>
              <View >
                <Text style={styles.title}>{this.state.NYBook.title}</Text>
                <Text style={styles.author}>{this.state.NYBook.author}</Text>
                {this.state.NYBook.primary_isbn13 !== '' ? <Text style={styles.isbn}>ISBN 13: {this.state.NYBook.primary_isbn13}</Text> : null}
                {this.state.NYBook.primary_isbn10 !== '' ? <Text style={styles.isbn}>ISBN 10: {this.state.NYBook.primary_isbn10}</Text> : null}
              </View>
            </View>
            
            {this.state.NYBook.description !== '' ? 
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
                    {this.state.NYBook.description}
                  </Text>
                </ReadMore>
              </View>
            </View> : null }

            <View>
              <Text style={styles.description}>
                Buy Links
              </Text>
              <View >
                <RNPickerSelect
                  placeholder={{
                      label: 'Select a Store',
                      value: 'undefined',
                  }}
                  onValueChange={(value) => value !== 'undefined' ? Linking.openURL(value) : null}
                  items={[
                      { label: 'Amazon', value: this.state.Amazon },
                      { label: 'Apple Books', value: this.state.AppleBooks },
                      { label: 'Barnes and Noble', value: this.state.BarnesandNoble },
                      { label: 'Books-A-Million', value: this.state.BooksAMillion },
                      { label: 'Bookshop', value: this.state.Bookshop },
                      { label: 'Indiebound', value: this.state.Indiebound },
                  ]}
                />
              </View>
            </View>

          </ScrollView>

          <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity style={{marginRight: -20, marginTop: 5, alignSelf: 'flex-end'}} 
                  onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                >
                  {closeIcon}
                </TouchableOpacity>
                <View style={{alignItems: "center", marginTop: 10}}>
                  <Text>{this.state.NYBook.title}</Text>
                  <Text>{this.state.NYBook.author}</Text>
                  <TextInput style={styles.modalText} placeholder="Enter number between 1-10" 
                  onChangeText={userRating => this.setState({userRating: userRating})} defaultValue={this.state.userRating}
                  />
                  <TextInput style={styles.modalText} placeholder="Enter your comment about the book" 
                  onChangeText={userComment => this.setState({userComment: userComment})} defaultValue={this.state.userComment}
                  />
                  <TextInput style={styles.modalText} placeholder="Enter Completed or currently reading" 
                  onChangeText={userProgress => this.setState({userProgress: userProgress})} defaultValue={this.state.userProgress}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {this.setState({userComment: '', userRating: '', userProgress: ''})}}>
                      <Text style={styles.textStyle}>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "#2196F3", marginLeft: 10 }}
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
          color="yellow"
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
    width: 140, height: 200, resizeMode: 'stretch'
  },
  title: {
    color: 'lightblue', fontSize: 28, flexWrap: 'wrap', width: windowWidth-140
  },
	author: {
    color: '#ebe4d3', fontSize: 18, flexWrap: 'wrap', width: windowWidth-140
  },
  isbn: {
    color: '#ebe4d3', fontSize: 12, marginTop: 5, flexWrap: 'wrap'
  },
	description: {
    color: 'lightblue', fontSize: 20, marginBottom: 15, marginTop: 20
  },
  descriptionText: {
    color: '#ebe4d3', fontSize: 15
  },
  fab: {
    position: 'absolute', margin: 16, right: 0, bottom: 0,
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

export default NYBookScreen;