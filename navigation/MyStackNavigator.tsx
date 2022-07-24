import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MyBottomTabNavigator from './MyBottomTabNavigator';

const Stack = createNativeStackNavigator();

const MyStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={MyBottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStackNavigator;