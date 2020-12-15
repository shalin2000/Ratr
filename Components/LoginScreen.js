import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Separator = () => (
  <View style={styles.separator} />
);

class LoginScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style = {styles.title}> 
          RATr
        </Text>
        <Text style = {styles.secondary} >
          Rate! Track! Enjoy!
        </Text>
        <View>
          <Button
            title="Login"
            onPress={() => Alert.alert('Button pressed')}
          />
        </View>
        <Separator />
        <View>
          <Button
            title="Continue as Guest"
            color="#f194ff"
            onPress={() =>
              this.props.navigation.navigate('Home')
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 50, 
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  secondary: {
    textAlign: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'purple',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default LoginScreen;