import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Tab');
    }, 3000);
  }, []);
  let content;
  if (Platform.OS) {
    content = (
      <View style={{paddingBottom: 200}}>
        <Text style={style.txtOS}>Welcome to the Application!!</Text>
      </View>
    );
  } else {
    content = (
      <View style={{paddingBottom: 200}}>
        <Text style={style.txtAD}>Welcome to the Application!!</Text>
      </View>
    );
  }
  return <View style={style.mainView}>{content}</View>;
};
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#151C26',
    padding: 10,
  },
  txtOS: {
    fontFamily: 'HelveticaNeue-ThinItalic',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
  },
  txtAD: {
    fontFamily: 'sans-serif-medium',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
  },
});
export default Splash;
