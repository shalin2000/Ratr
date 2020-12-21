import * as React from "react";
import { StyleSheet, TextInput, View, Button, StatusBar, Text, TouchableOpacity } from "react-native";

const Separator = () => (
  <View style={styles.separator} />
);

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
      this.state = {username: '',password: ''};
  }
  render(){
    return (
    <View style={styles.container}>
      <Text style = {styles.title}>Ratr</Text>
      <Text style = {styles.secondary} > Rate. Log. Track.</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => this.setState({username})}
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
            <TouchableOpacity> 
              <Text style={styles.forgot_button}> Forgot Password? </Text>
            </TouchableOpacity>
            <TouchableOpacity><Text style={styles.forgot_button}> | </Text></TouchableOpacity>
            {/* OnPress for Forgot User */}
            <TouchableOpacity> 
              <Text style={styles.forgot_button}> Forgot Username? </Text>
            </TouchableOpacity>
          </Text>
        </View>
        
        <TouchableOpacity style={{marginTop: 8}}>
          <Button  
            title="LOGIN"
            onPress={() =>
              this.props.navigation.navigate('MyList')
            }
          />
          <Separator />
          <Button 
            title="SIGN UP"
            onPress={() =>
              this.props.navigation.navigate('SignUp')
            }  
          />
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
