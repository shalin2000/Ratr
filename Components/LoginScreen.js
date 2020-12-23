import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity } from "react-native";
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
      };
      this.Login = this.Login.bind(this)
  }

  // when user clicks login it will check if that email and password is correct and login otherwise show error
  Login = (email, password) => { 
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      // if email is not verifed then put alert else move to Home screen
      if (user.user.emailVerified === true){
        this.props.navigation.navigate('Home')
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
      // console.error(error)
    })
  };

  render(){
    return (
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
          <Separator />
          <Button 
            title="Proceed as Guest"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </TouchableOpacity>
        
        <Text style={styles.secondary}>{this.state.errorMessage}</Text>
        
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
});

export default LoginScreen;
