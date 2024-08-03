import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, Pressable, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const ViewAllScreen = ({navigation, route}: any) => {
const [movies] = route.params;
 const Disp = ({item}: any) => {
    let contents;
    if (item.title) {
      contents = (
        <Pressable onPress={() => navigation.navigate('MovieDetails', {item})}>
          <Image
            source={{uri: item.pimage}}
            style={style.image}
            resizeMethod="resize"
            resizeMode="stretch"
          />
        </Pressable>
      );
    } else if (item.name) {
      contents = (
        <Image
          source={{uri: item.pimage}}
          style={style.image}
          resizeMethod="resize"
          resizeMode="stretch"
        />
      );
    }
    return <View style={style.flatView}>{contents}</View>;
  };
  return (
    <View style={style.mainView}>
      <Pressable onPress={() => navigation.navigate('Tab')} style={style.back}>
        <Text
          style={[style.back, {color: 'white', fontSize: 18}]}>{`< Back`}</Text>
      </Pressable>
      <View style={style.separator} />
      <View style={{alignSelf: 'center'}}>
        <FlatList
          data={movies}
          numColumns={2}
          renderItem={Disp}
          keyExtractor={item => item.id}></FlatList>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  flatView: {
    marginHorizontal: 5,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#151C26',
    paddingTop: 20,
    paddingBottom: 50,
  },
  separator: {
    height: 1,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
    marginBottom: 10,
  },
  title: {color: 'white', width: 150, fontSize: 18},
  back: {width: 100, paddingLeft: 10, paddingBottom: 15},
  image: {
    height: 250,
    width: 180,
    resizeMode: 'contain',
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
export default ViewAllScreen;
