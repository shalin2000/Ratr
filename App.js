import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/HomeScreen';
import NYBookScreen from './Components/NYBookScreen';
import SearchScreen from './Components/SearchScreen';
import GoogleBookScreen from './Components/GoogleBookScreen';

const Stack = createStackNavigator();

class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="NYBook"
            component={NYBookScreen}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
          />
          <Stack.Screen
            name="GoogleBook"
            component={GoogleBookScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;