import LoginScreen from './Components/LoginScreen';
import MyList from './Components/MyList';
import SignUp from './Components/SignUp'
import HomeScreen from './Components/HomeScreen';
import NYBookScreen from './Components/NYBookScreen';
import SearchScreen from './Components/SearchScreen';
import GoogleBookScreen from './Components/GoogleBookScreen';
import ForgotPassword from './Components/ForgetPassword'

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NYBook" component={NYBookScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="GoogleBook" component={GoogleBookScreen} />
    </Stack.Navigator>
  )
}

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="My List" component={MyList} />
    </Drawer.Navigator>
  );
}

export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerStyle={{ backgroundColor: 'white'}}>
          <Drawer.Screen name="Login" component={LoginStack}/>
          <Drawer.Screen name="Home" component={HomeDrawer} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}