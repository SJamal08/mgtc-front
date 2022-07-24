import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllPlans from '../screens/AllPlans';
import MyPlans from '../screens/MyPlans';

const Tab = createBottomTabNavigator();

const MyBottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mes plans" component={MyPlans} />
      <Tab.Screen name="Tous les plans" component={AllPlans} />
    </Tab.Navigator>
  );
};

export default MyBottomTabNavigator;
