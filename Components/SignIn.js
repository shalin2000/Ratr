import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity } from "react-native";

class SignIn extends React.Component {
  constructor(props){
    super(props);
      this.state = {username: '',password: ''};
  }
  render(){
    return (
    <View style={styles.container}>
      <Text style = {styles.title}>Ratr</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => this.setState({username})}
        />
      </View>
 
      <View >
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
      </View>
 
      <TouchableOpacity style={styles.action}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
        <Button style={styles.loginBtn} title="LOGIN" onPress={() => this.props.navigation.navigate('MyList')}/>
      </TouchableOpacity>
 
      
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
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color: 'azure',
    textAlign: 'center',
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
  action: {
    justifyContent: 'center',
  },
 
  forgot_button: {
    color: "cyan", 
    height: 30,
    marginBottom: 10,
  },
 
});

export default SignIn;