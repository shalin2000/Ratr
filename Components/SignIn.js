import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity } from "react-native";

const Separator = () => (
  <View style={styles.separator} />
);

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
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <Button style={styles.loginBtn} title="LOGIN"/>
    </View>
  );
}
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
 
  inputView: {
    backgroundColor: "lightgrey",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
});

export default SignIn;


//   render() {  
//     return (  
//         <SafeAreaView style={styles.view}>  
//             <TextInput  
//                 style={styles.textInput}  
//                 placeholder="UserName"  
//                 onChangeText={(username) => this.setState({username})}  
//             />   
//         </SafeAreaView>  
//     );  
// }  
// }

// const styles = StyleSheet.create({
// view:{
//   flex: 1,
//   backgroundColor: '#fff',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// textInput:{height: 40, borderColor: 'grey', borderWidth: 1, fontSize: 20}
// });

// 