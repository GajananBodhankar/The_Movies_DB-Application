import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import People from './People';
import DiscoverMovies from './DiscoverMovies';
import DiscoverTV from './DiscoverTV';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const MovieTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}: any) => {
          let iconName;
          if (route.name == 'Movies') {
            iconName = focused ? 'movie' : 'movie-outline';
            return <Icon name={iconName} size={20} color="black" />;
          } else if (route.name == 'Television') {
            iconName = focused ? 'tv' : 'tv-outline';
            return <Ionicons name={iconName} size={20} color="black" />;
          } else if (route.name == 'People') {
            iconName = focused ? 'people' : 'people-outline';
            return <Ionicons name={iconName} size={20} color="black" />;
          }
        },
      })}>
      <Tab.Screen
        name="Movies"
        component={DiscoverMovies}
        options={{
          // headerTitleAlign: 'center',
          // headerStyle: {backgroundColor: '#151C26'},
          // headerTitle: 'Movies',
          // headerLeft:()=> <Ionicons name='search' size={20} color='white' /> ,
          // headerTitleStyle: {color: 'white', fontSize: 22},
          headerShown: false,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'red',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
      <Tab.Screen
        name="Television"
        component={DiscoverTV}
        options={{
          // headerTitleAlign: 'center',
          // headerStyle: {backgroundColor: '#151C26'},
          // headerTitle: 'Television',
          // headerTitleStyle: {color: 'white', fontSize: 22},
          headerShown: false,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'red',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
      <Tab.Screen
        name="People"
        component={People}
        options={{
          // headerTitleAlign: 'center',
          // headerStyle: {backgroundColor: '#151C26'},
          // headerTitle: 'People',
          // headerTitleStyle: {color: 'white', fontSize: 22},
          headerShown: false,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'red',
          tabBarLabelStyle: {fontSize: 14},
        }}
      />
    </Tab.Navigator>
  );
};
export default MovieTabNav;
