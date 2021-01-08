import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity, Image, 
  TouchableHighlight, Modal, SafeAreaView, FlatList} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; 

import firebase from 'firebase'
require('firebase/auth')

var config = { 
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// firebase.initializeApp(config);

const Separator = () => (
  <View style={styles.separator} />
);

class LoginScreen extends React.Component {
  _isMounted = false;

  constructor(props){
    super(props);
      this.state = {
        email: '',
        password: '',
        errorMessage: '',
        loggedOut: false,
        user: [],
        modalVisible: false,
        userName: '',
      };
      this.Login = this.Login.bind(this)
  }

  // when component mounts, it checks if user is logged in or not
  componentDidMount(){
    this._isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('user is logged out')
        this.setState({loggedOut: true, user: null})
      }
      else{
        // console.log(user)
        console.log('user is logged in ', user.email)
        this.setState({user: user, loggedOut: false})
      }
    });
  }

  // unmounts the component to avoid any leaks
  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state,callback)=>{
      return;
    };
  }

  // updates the users name on the firebase auth system
  updateName(){
    const update = {
      displayName: this.state.userName,
      photoURL: null,
    };
    firebase.auth().currentUser.updateProfile(update);
  }

  // logout
  logout = () => {
    firebase.auth().signOut().then(() => console.log('User signed out!'));
  }

  // when user clicks login it will check if that email and password is correct and login otherwise show error
  Login = (email, password) => { 
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      // if email is not verifed then put alert else move to Home screen
      if (user.user.emailVerified === true){
        // this.props.navigation.navigate('Home')
        this.setState({loggedOut: false, user: user})
      }
      else {
        alert('Email not verifed...')
      }
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        this.setState({errorMessage: 'No user record'})
      }
      if (error.code === 'auth/invalid-email') {
        this.setState({errorMessage: 'That email address is invalid!'})
      }
      if (error.code === 'auth/wrong-password') {
        this.setState({errorMessage: 'Wrong Password'})
      }
    })
  };

  // makes the modal visibal when user presses the edit button and if they click done then it will update their name
  setModalVisible = (visible,txt) => {
    if (txt === 'submit'){
      this.updateName()
    }
    this.setState({ modalVisible: visible });
  }
  
  render(){
    const editIcon = <Icon name="edit" size={20} color="white" />

    const personIcon = <MaterialIcons name="person-pin" size={120} color="white" />
              
    return (
      this.state.loggedOut === true ? 
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.container}>
          <Text style = {styles.title}>Ratr</Text>
          <Text style = {styles.secondary} > Rate. Log. Track.</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Email"
              placeholderTextColor="#003f5c"
              onChangeText={(email) => this.setState({email})}
            />
          </View>
    
          <View >
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          
          <View style={styles.row}>
            <Text>
              {/* OnPress for Forgot Pass */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}> 
                <Text style={styles.forgot_button}> Forgot Password? </Text>
              </TouchableOpacity>
            </Text>
          </View>
          
          <TouchableOpacity style={{marginTop: 8}}>
            <Button  
              title="LOGIN"
              onPress={() => this.Login(this.state.email, this.state.password)}
            />
            <Separator />
            <Button 
              title="SIGN UP"
              onPress={() => this.props.navigation.navigate('SignUp')}  
            />
          </TouchableOpacity>
          
          <Text style={styles.secondary}>{this.state.errorMessage}</Text>
        </View> 
      </SafeAreaView>
      : 
      // if user is logged in then display this
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.container}>
          {/* brings up the edit username popup */}
          <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput style={styles.modalText} placeholder="Edit User Name" 
                onChangeText={userName => this.setState({userName: userName})} defaultValue={this.state.userName}
                onSubmitEditing = {() => {this.setModalVisible(!this.state.modalVisible)} } />
                <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {this.setModalVisible(!this.state.modalVisible,'submit')}}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* userImage */}
          {/* <Image source={require('../../Images/profile.png')} style={{width: 150, height: 150, resizeMode: 'contain', marginTop: 25}} />  */}
          {personIcon}
          <Text style={styles.secondary}>Welcome {this.state.userName !== '' ? this.state.userName : this.state.user.displayName !== null ? this.state.user.displayName : null}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.secondary}>
              UserName: {this.state.userName !== '' ? this.state.userName : this.state.user.displayName !== null ? this.state.user.displayName : "Enter User Name"}
            </Text> 
            
            <TouchableOpacity style={{marginLeft: 10, marginTop: 7}} onPress={() => {this.setModalVisible(true)}}>
              {editIcon}
            </TouchableOpacity> 
          </View>

          <Text style={styles.secondary}>Email: {this.state.user.email}</Text>

          {/* log out button */}
          <TouchableOpacity style={{marginTop: 8}}>
            <Button  
              title="LOG OUT"
              onPress={this.logout}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  action: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#1b1b1c",
    alignItems: "center",
    justifyContent: "center",
  },
  forgot_button: {
    color: "cyan", 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  secondary: {
    textAlign: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    color: "azure", 
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#282828',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  TextInput: {
    backgroundColor: "#C0C0C0",
    margin: 8,
    width: 200,
    borderRadius: 20,
    textAlign: "center",
    height: 50,
    padding: 10,
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'azure',
    textAlign: 'center',
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

export default LoginScreen;
