import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverMovies from './DiscoverMovies';
import MovieDetails from './MovieDetails';
import ViewAllScreen from './ViewAllScreen';
import MovieTabNav from './MovieTabNav';
import Splash from './Spalsh';
import PeopleDetails from './PeopleDetails';

const Stack = createNativeStackNavigator();
const MovieNavg = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Spalsh">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tab"
            component={MovieTabNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewAllScreen"
            component={ViewAllScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PeopleDetails"
            component={PeopleDetails}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default MovieNavg;
