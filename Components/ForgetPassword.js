import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity, ScrollView } from "react-native";
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

class SignUp extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        email: '',
        errorMessage: '',
        linkSent: false,
      };
      this.forgotPassword = this.forgotPassword.bind(this)
  }

  // if forget password is clicked then it will send a link to reset the password
  forgotPassword = (Email) => {
    firebase.auth().sendPasswordResetEmail(Email).then(function (user) {
      alert('Please check your email...')
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        this.setState({errorMessage: 'That email address is invalid!'})
      }
      else {
        this.setState({errorMessage: 'Enter valid email or sign up'})
      }
    })
    this.setState({
      linkSent: true
    })
  }
  
  render(){
    return (
      <View style={styles.container}>
        <Text style = {styles.title}>Ratr</Text>
        <Text style = {styles.secondary} > Rate. Log. Track.</Text>

        <View>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => this.setState({email})}
          />
        </View>
  
        <Separator />

        <View>
          {this.state.linkSent === false ? <Button title="Send link" onPress={() => this.forgotPassword(this.state.email)}/> 
          : 
          <Button title="Resend link" onPress={() => this.forgotPassword(this.state.email)}/>}
        
          <Separator />
        
          <Button title="Back to Login" onPress={() => this.props.navigation.navigate('Login')}/>
        </View>

        <Text style={styles.secondary}>{this.state.errorMessage}</Text>

      </View>
    );
  }
}
 
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
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
});

export default SignUp;
