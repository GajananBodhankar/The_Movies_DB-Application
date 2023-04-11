import React, {createContext} from 'react';
import Hook from './RN_training/MTproject/context';
import DrawerNavg from './RN_training/ChepAssignment/DrawerNavg';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './RN_training/ChepAssignment/BottomTab';
import Home from './RN_training/ChepAssignment/Home';
import {Provider} from 'react-redux';
import {StoreAsync} from './RN_training/ReduxAsync/StoreAsync';
import ReduxAsyncAction from './RN_training/ReduxAsync/ReduxAsyncAction';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PickUp from './RN_training/ChepAssignment/PickUp';
import Transfer from './RN_training/ChepAssignment/Transfer';

import RedStore from './RN_training/Assignment/Redux/Store';
import { MovieStore } from './RN_training/TheMovieDB/Redux/MovieStore';
import MovieNavg from './RN_training/TheMovieDB/MovieNavg';
export const User1 = createContext({
  mainData: [
    {name: 'Food', amount: 0},
    {name: 'Travel', amount: 0},
    {name: 'Movies', amount: 0},
    {name: 'Hospital', amount: 0},
    {EmpId: ''},
    {lastupdated: ''},
    {billingdetails: []},
  ],
  setMainData: (i: any) => null,
});

const App = () => {
  const {memo} = Hook();
  return (
    // <User1.Provider value={memo}>
    //   <MainNavg />
    // </User1.Provider>

    <Provider store={MovieStore}>
      <MovieNavg />
    </Provider>
  );
};
export default App;
// //bodhankargajanan@gmail.com
// //Passion@8266
