import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GetApi} from './API';
import {IMAGE_URL} from './config';
import {style} from './DiscoverMovies';
const People = ({navigation}: any) => {
  const [popular, setPopular] = useState<any>([]);
  const [txtIn, setTxtIn] = useState<boolean>(false);

  useEffect(() => {
    var popArr: any = [];
    const get = async () => {
      const response = await GetApi('/person/popular');
      response?.data.results.forEach((i: any, j: any) => {
        popArr.push({
          id: i.id,
          name: i.name,
          gender: i.gender == 1 ? 'female' : 'male',
          pimage: `${IMAGE_URL}${i.profile_path}`,
          profession: i.known_for_department,
          known_for: i.known_for,
        });
      });
    };
    setPopular(popArr);
    get();
  }, [main]);
  const Disp = ({item}: any) => {
    return (
      <View style={[style.flatView, {paddingHorizontal: 20}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PeopleDetails', {item});
          }}>
          <Image
            source={{uri: item.pimage}}
            style={design.image}
            resizeMethod="resize"
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={design.name}>{item.name}</Text>
      </View>
    );
  };
  var main;
  if (Platform.OS === 'ios') {
    main = (
      <View style={design.subView}>
        <Pressable
          onPress={() => {
            setTxtIn(true);
          }}>
          <Icon name="search" size={30} color="white" />
        </Pressable>
        {!txtIn ? (
          <Text style={design.header}>People</Text>
        ) : (
          <View style={{paddingLeft: '10%', paddingBottom: 20}}>
            <TextInput
              autoFocus={true}
              placeholder="Search movie"
              style={design.textIn}
              onChangeText={t => {
                let temp1 = t.toLocaleLowerCase();
                var tempArr = popular?.filter(
                  (i: any) =>
                    i.name?.toLocaleLowerCase().startsWith(temp1) &&
                    i.name?.toLocaleLowerCase().includes(temp1),
                );
                if (tempArr.length != 0) {
                  setPopular(tempArr);
                } else if (temp1.length == 0) {
                  setPopular(popular);
                }
              }}
            />
          </View>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#151C26'}}>
      {main}
      <View style={style.separator}></View>
      <View style={design.flatView}>
        <FlatList data={popular} renderItem={Disp} key={'#'} numColumns={2} />
      </View>
    </SafeAreaView>
  );
};
const design = StyleSheet.create({
  image: {height: 150, width: 140, borderRadius: 150},
  name: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
    width: 150,
  },
  subView: {flexDirection: 'row', paddingLeft: 10, paddingTop: 30},
  header: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    paddingLeft: '30%',
    paddingBottom: 20,
  },
  textIn: {
    width: 280,
    height: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
  },
  flatView: {alignSelf: 'center', paddingBottom: 130},
});
export default People;
