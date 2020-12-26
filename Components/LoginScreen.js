import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity, Image, 
  TouchableHighlight, Modal} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'firebase'
require('firebase/auth')

var config = { 
  apiKey: "AIzaSyBRgkmxwN9JAXVy_3xtcJpcbdF1nY4GC0k",
  authDomain: "ratr-9b78a.firebaseapp.com",
  projectId: "ratr-9b78a",
  storageBucket: "ratr-9b78a.appspot.com",
  messagingSenderId: "63538580742",
  appId: "1:63538580742:web:decec5c5918f3aaecae287",
  measurementId: "G-6XCC71P2S4"
};

// firebase.initializeApp(config);

const Separator = () => (
  <View style={styles.separator} />
);

class LoginScreen extends React.Component {
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

  setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('user is logged out')
        this.setState({loggedOut: true, user: null})
      }
      else{
        // console.log(user)
        console.log('user is logged in ', user.email)
        this.setState({user: user})
      }
    });
  }

  updateName(){
    const update = {
      displayName: this.state.userName,
      photoURL: null,
    };
    firebase.auth().currentUser.updateProfile(update);
  }

  // logout
  logout(){
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

  render(){
    const editIcon = <Icon name="edit" size={20} color="white" />
    const checkIcon = <Icon name="check" size={20} color="white" />

    return (
      this.state.loggedOut === true ? 
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
      : 
      // if user is logged in then display this
      <View style={{flex: 1, backgroundColor: "#282828", alignItems: "center",}}>
        
        {/* brings up the edit username popup */}
        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput style={styles.modalText} placeholder="Edit User Name" 
              onChangeText={userName => this.setState({userName: userName})} defaultValue={this.state.userName}
              onSubmitEditing = {() => {this.setModalVisible(!this.state.modalVisible)} } />
              <TouchableOpacity style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
              >
                <Text style={styles.textStyle}>Done</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

        {/* userImage */}
        <Image source={require('../Images/anon.png')} style={{width: 150, height: 150, resizeMode: 'contain', marginTop: 25}} /> 
        
        <Text style={styles.secondary}>Welcome {this.state.userName !== '' ? this.state.userName : this.state.user.displayName !== null ? this.state.user.displayName : null}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.secondary}>
            UserName: {this.state.userName !== '' ? this.state.userName : this.state.user.displayName !== null ? this.state.user.displayName : "Enter User Name"}
          </Text> 
          
          <TouchableOpacity style={{marginLeft: 10, marginTop: 7}} onPress={() => {this.setModalVisible(true)}}>
            {editIcon}
          </TouchableOpacity> 
          <TouchableOpacity style={{marginLeft: 10, marginTop: 7}} onPress={this.updateName.bind(this)}>
            {checkIcon}
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
    );
  }
}
 
const styles = StyleSheet.create({
  action: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#282828",
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
  }
});

export default LoginScreen;
