import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity, 
        ScrollView, SafeAreaView } from "react-native";
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

firebase.initializeApp(config);

const Separator = () => (
  <View style={styles.separator} />
);

class SignUp extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
      };
      this.SignUp = this.SignUp.bind(this)
  }

  // When the user clicks signUp then it will create a account for them and log them in
  SignUp = (email, password) => { 
    if (password !== this.state.confirmPassword){
      this.setState({errorMessage: 'Password do not match!'})
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        alert('Please verify your Email')
        this.props.navigation.navigate('Login')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({errorMessage: 'That email address is already in use!'})
        }
        if (error.code === 'auth/invalid-email') {
          this.setState({errorMessage: 'That email address is invalid!'})
        }
        if (error.code === 'auth/weak-password') {
          this.setState({errorMessage: 'Password should be at least 6 characters'})
        }
        // console.error(error)
      });
      // verify the email
      this.sendEmailVar()
    }
  };

  // verify the email
  sendEmailVar(){
    firebase.auth().onAuthStateChanged(function(user) {
      user.sendEmailVerification();
    });
  }
  
  render(){
    return (
      <SafeAreaView style={styles.droidSafeArea}>
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
    
          <View >
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            />
          </View>

          <View >
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
          </View>

          <Separator />
          <Button title="Register Account" onPress={() => this.SignUp(this.state.email, this.state.password)}/>
          
          <Text style={styles.secondary}>{this.state.errorMessage}</Text>

        </View>
      </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1c",
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
  droidSafeArea: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? 'gray' : '#1b1b1c',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});

export default SignUp;
