import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity } from "react-native";

const Separator = () => (
  <View style={styles.separator} />
);

class SignUp extends React.Component {
  constructor(props){
    super(props);
      this.state = {username: '',password: ''};
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
          onChangeText={(username) => this.setState({username})}
        />
      </View>

      <View>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => this.setState({username})}
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
 
      <TouchableOpacity style={styles.action}>
        <Separator />
        <Button title="Register"/>
        <Separator />
        <Button 
          title="Proceed as Guest"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
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
