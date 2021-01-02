import React from 'react';
import {View, Button, Text, ScrollView, StyleSheet, Switch, SafeAreaView, 
        StatusBar, Image, ImageBackground, FlatList, TouchableOpacity, Modal,
        TextInput, TouchableWithoutFeedback, Dimensions, KeyboardAvoidingView, Platform, 
        Keyboard} from 'react-native'
import Constants from 'expo-constants';
// import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption,} from 'react-native-popup-menu';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Ionicons, FontAwesome, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from 'firebase'
require('firebase/auth')

export default class BookmarkScreen extends React.Component {
  _isMounted = false;

  constructor() {
    super()
    this.state = {
      lists: [],
      loggedOut: false,
      user: [],
      myListData: [], userData: [],
      progress: 'Bookmark',
      uniqueValue: 1,
      modalVisible: false,
      selectedItem: [],
      updateModalVisible: false,
      userRating: '', userComment: '', userProgress: '', userCommentForModal: '',
      selectedReading: false, selectedDone: false, selectedBookmark: false,
      keyboard: false, refreshing: false
    }
  }

  // when component mounts, it will check for focus on myList and call the API
  componentDidMount(){
    this._isMounted = true;
    // listens for when the tab is selected as MyList
    this.focusListener = this.props.navigation.addListener("focus", () => {      
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          console.log('user is logged out')
          this.setState({loggedOut: true, user: null})
        }
        else{
          console.log('user is logged in ', user.email)
          this.fetchDataFromApi()
          this.setState({user: user, loggedOut: false, progress: 'Bookmark', selectedBookmark: true, userProgress: 'Read Later'})
        }
      });
    });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow,);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide,);
  }
  
  // unmounts the component to avoid any leaks
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this._isMounted = false;
    this.setState = (state,callback)=>{
      return;
    };
  }

  _keyboardDidShow = () => {
    this.setState({keyboard: true})
  }

  _keyboardDidHide = () => {
    this.setState({keyboard: false})
  }

  // helps to refresh the screen
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }))
  }

  // gets the data from the django backend
  fetchDataFromApi = () => {
    const url = "http://192.168.0.13:8000/api/list/";
    fetch(url).then(res => res.json())
    .then(res => {
      this.setState({myListData: res, refreshing: false})
    })
    .catch(error => {
      console.log(error)
    })
  };

  // it will post to the api with the correct info that user enters
  updateToAPI(item){
    const data = { 
      email: this.state.user.email,
      book_name: item.book_name,
      book_author: item.book_author,
      book_url: item.book_url,
      user_rating: this.state.userRating,
      user_comment: this.state.userComment,
      user_progress: this.state.userProgress, 
    };

    fetch('http://192.168.0.13:8000/api/list/'+item.id+'/', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // Make the Delete call using fetch api
  deleteFromAPI(item){
    fetch('http://192.168.0.13:8000/api/list/'+item.id+'/', {
     method: 'DELETE',
     headers: {
      'Content-type': 'application/json'
     },
    }) 
    .then(response => response.json())
    .then(data => console.log(data)) 
    .catch(err => console.log(err)) 
  }

  // when item in the picker is selected it will naviagte 
  itemSelected = (item) => {
    if (item.value === 'In-Progress'){
      this.forceRemount()
      this.props.navigation.navigate('InProgress')
    }
    if (item.value === 'Completed'){
      this.forceRemount()
      this.props.navigation.navigate('Completed')
    }
  }

  // when rating has been done it will set state to store for backend
  ratingCompleted = (rating) => {
    this.setState({userRating: rating.toString()})
  }

  // view comment modal
  setModalVisible = (visible, item) => {
    this.setState({ modalVisible: visible, userCommentForModal: item});
  }

  // makes the modal visible when user clicks the plus button
  setUpdateModalVisible = (visible,item,txt) => {
    if (txt === 'submit'){
      this.updateToAPI(item)
      if (this.state.userProgress === 'Read Later'){
        this.fetchDataFromApi()
        this.forceRemount()
      }
      if (this.state.userProgress === 'Reading'){
        this.forceRemount()
        this.props.navigation.navigate('InProgress')
      }
      if (this.state.userProgress === 'Completed'){
        this.forceRemount()
        this.props.navigation.navigate('Completed')
      }
    }
    if (txt === 'close'){
      this.setState({ selectedDone: false, selectedBookmark: true, selectedReading: false })
    }
    if (txt === 'open'){
      this.setState({userRating: item.user_rating})
    }
    this.setState({ updateModalVisible: visible, selectedItem: item, userComment: item.user_comment, 
                    selectedDone: false, selectedBookmark: true, selectedReading: false });
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
      this.setState({selectedReading: false, selectedDone: false, selectedBookmark: true, userProgress: 'Read Later',})
    }
  }

  // refreshes the screen and calls api when pull down
  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.fetchDataFromApi()
    })
  }

  render() {
    const dotsIcon = <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
    const commentIcon = <FontAwesome name="comment-o" size={24} color="#FFEBCD" />

    const closeIcon = <Icon name="close" size={20} color="grey" />

    const readingOutlineIcon = <MaterialCommunityIcons name="book-open-variant" size={50} color="black" />
    const readingFilledIcon = <MaterialCommunityIcons name="book-open-page-variant" size={50} color="tomato" />
    const doneOutlineIcon = <Ionicons name="ios-checkmark-circle-outline" size={50} color="black" />
    const doneFilledIcon = <Ionicons name="ios-checkmark-circle" size={50} color="tomato" />
    const bookmarkOutlineIcon = <MaterialCommunityIcons name="bookmark-multiple-outline" size={50} color="black" />
    const bookmarkFilledIcon = <MaterialCommunityIcons name="bookmark-multiple" size={50} color="tomato" />

    // gets only the data that belongs to the current user that is logged in
    var userData = this.state.user !== null ? this.state.myListData.filter(x => (x.email === this.state.user.email) && (x.user_progress === 'Read Later')) : null;

    return (
      this.state.loggedOut === true ? 
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Login in first to access your list</Text>
        </View>
      </SafeAreaView>
      :
      <SafeAreaView style={styles.droidSafeArea}>
        {/* <ScrollView style={styles.container}> */}
          <View style={styles.container} key={this.state.uniqueValue}>
            <DropDownPicker
                items={[
                    {label: 'Bookmark', value: 'Bookmark'},
                    {label: 'Completed', value: 'Completed'},
                    {label: 'In-Progress', value: 'In-Progress'},
                ]}
                defaultValue={this.state.progress}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{ justifyContent: 'flex-start' }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => this.itemSelected(item)}
            />
            <MenuProvider style={styles.container}>
              <FlatList
                data={userData}
                extraData={this.state.uniqueValue}
                columnWrapperStyle={{flex: 1, justifyContent: "space-around"}}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={{marginBottom: -10}}>
                    <ImageBackground source={{ uri:item.book_url }}
                        style={{ width: 140, height: 220, position: 'relative', top: 0, left: 0 }} >
                        {item.user_rating !== '' ? 
                          <Text style={styles.overlayRatingText}>
                            {item.book_name === this.state.selectedItem.book_name ? 
                              <Text>{this.state.userRating}/5</Text> : <Text>{item.user_rating}/5</Text>}
                          </Text> : 
                          <Text style={styles.overlayRatingText} >
                            -/5
                          </Text>
                        }
                        {item.user_comment !== '' ? 
                          <TouchableOpacity style={styles.overlayCommentIcon}
                          onPress={() => { this.setModalVisible(true, item.user_comment)}}
                          >
                            {commentIcon}
                          </TouchableOpacity>
                          : null
                        }
                    </ImageBackground>
                    
                    <View style={{flexDirection: 'row', width: 140, height: 35, backgroundColor: '#7d606f', justifyContent: 'center', alignItems: 'center'}}>
                      {item.book_name.length <= 30 ? 
                      <Text style={styles.textStyle}>{item.book_name}</Text> : 
                      <Text style={styles.textStyle}>{item.book_name.substring(0,27)}...</Text> 
                      }
                      <Menu>
                        <MenuTrigger>
                          {dotsIcon}
                        </MenuTrigger>
                        <MenuOptions>
                          <MenuOption onSelect={() => this.setUpdateModalVisible(true,item,'open')} text='Update' />
                          <MenuOption onSelect={() => this.deleteFromAPI(item)} text='Delete' />
                        </MenuOptions>
                      </Menu>
                    </View>
                    
                    {/* modal for the comment */}
                    <View style={styles.centeredView}>
                      <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalViewComment}>
                            <Text style={styles.modalText}>{this.state.userCommentForModal}</Text>

                            <TouchableOpacity
                              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                              onPress={() => {
                                this.setModalVisible(!this.state.modalVisible,[]);
                              }}
                            >
                              <Text style={styles.modalTextStyle}>Hide Comment</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                    </View>
                              
                    {/* update modal */}
                    <Modal animationType="slide" transparent={true} visible={this.state.updateModalVisible}>
                      <View style={this.state.keyboard ? styles.topView : styles.centeredView}>
                        <View style={styles.modalView}>
                          <TouchableOpacity style={{marginRight: -20, marginTop: 5, alignSelf: 'flex-end'}} 
                            onPress={() => {this.setUpdateModalVisible(!this.state.updateModalVisible,[],'close')}}>
                            {closeIcon}
                          </TouchableOpacity>
                          <View style={{alignItems: "center", marginTop: 10}}>
                            <Text>Update this book</Text>

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
                              startingValue={this.state.selectedItem.user_rating !== '' ? Number(this.state.selectedItem.user_rating) : Number(item.user_rating)}
                              ratingCount={5}
                              imageSize={35}
                              showRating
                              onFinishRating={this.ratingCompleted}
                            />

                            <Text style={{marginVertical: 10}} >_________________</Text>
                            
                            <TextInput style={styles.modalText} multiline = {true} 
                            placeholder={this.state.selectedItem.user_comment !== '' ? this.state.selectedItem.user_comment : 'No Comment made yet'}
                            maxLength = {280} onSubmitEditing={()=>Keyboard.dismiss()}
                            onChangeText={userComment => this.setState({userComment: userComment})} defaultValue={this.state.userComment}
                            />

                            <View style={{flexDirection: 'row'}}>
                              <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "tomato" }}
                                onPress={() => {this.setState({userComment: ''})}}>
                                <Text style={styles.textStyle}>Clear</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "tomato", marginLeft: 10 }}
                                onPress={() => {this.setUpdateModalVisible(!this.state.updateModalVisible,this.state.selectedItem,'submit')}}>
                                <Text style={styles.textStyle}>Update</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Modal>

                  </View> 

                )}
                keyExtractor={item => item.id}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            </MenuProvider>
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1c',
    paddingHorizontal: 15, paddingTop: 9,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? 'gray' : '#1b1b1c',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    width: 120,
    textAlign: 'center'
  },
  image: {
    width: 140, height: 200, resizeMode: 'stretch',
  },
  overlayRatingText: {
    backgroundColor: 'rgba(52, 52, 52, 0.7)', color: '#FFEBCD', 
    borderRadius: 5, borderWidth: 1, padding: 2, borderColor: "#696969",
    position: 'absolute', top: 2, right: 2, fontSize: 20
  },
  overlayCommentIcon: {
    backgroundColor: 'rgba(52, 52, 52, 0.3)', color: '#FFEBCD',
    borderRadius: 5, borderWidth: 1, padding: 1, borderColor: '#696969',
    position: 'absolute', bottom: 2, right: 2,
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
  modalViewComment: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
  modalTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})