import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './Components/LoginScreen';
import MyList from './Components/MyList';
import SignUp from './Components/SignUp'
import HomeScreen from './Components/HomeScreen';
import NYBookScreen from './Components/NYBookScreen';
import SearchScreen from './Components/SearchScreen';
import GoogleBookScreen from './Components/GoogleBookScreen';
import ForgotPassword from './Components/ForgetPassword'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabAScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NYBook" component={NYBookScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="GoogleBook" component={GoogleBookScreen} />
    </Stack.Navigator>
  );
}

function TabBScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = focused
        ? 'md-home'
        : 'ios-home';
      } else if (route.name === 'My List') {
        iconName = focused
        ? 'ios-list-box'
        : 'ios-list';
      } else if (route.name === 'My Profile') {
        iconName = focused
        ? 'md-contact'
        : 'ios-person';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
      },
      })}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={TabAScreen} />
      <Tab.Screen name="My List" component={MyList} />
      <Tab.Screen name="My Profile" component={TabBScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabScreen />
    </NavigationContainer>
  )
}