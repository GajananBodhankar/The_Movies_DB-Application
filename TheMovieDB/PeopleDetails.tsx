import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {GetApi} from './API';
import {IMAGE_URL} from './config';
import {style} from './DiscoverMovies';
const PeopleDetails = ({navigation, route}: any) => {
  const [data, setData] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const {item} = route.params;
  useEffect(() => {
    var tempArr: any = [];
    item.known_for.forEach((i: any) => {
      tempArr.push({
        id: i.id,
        pimage: `${IMAGE_URL}${i.poster_path}`,
        bimage: `${IMAGE_URL}${i.backdrop_path}`,
        title: i.title,
        overview: i.overview,
        language: i.original_language,
        popularity: i.popularity,
        release: i.release_date,
        media: i.media_type,
      });
    });
    setData(tempArr);
  }, [item]);
  useEffect(() => {
    var imageArr: any = [];
    const get = async () => {
      const response = await GetApi(`/person/${item.id}/images`);
      response?.data.profiles.forEach((i: any) => {
        imageArr.push({image: `${IMAGE_URL}${i.file_path}`});
      });
    };
    get();
    setImages(imageArr);
  }, [item,data]);
  const Disp = ({item}: any) => {
    return (
      <View style={style.flatView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MovieDetails', {item});
          }}>
          <Image
            source={{uri: item.pimage}}
            style={style.image}
            resizeMethod="resize"
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const Disp1 = ({item}: any) => {
    return (
      <View style={style.flatView}>
        <Image
          source={{uri: item.image}}
          style={style.image}
          resizeMethod="resize"
          resizeMode="stretch"
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#151C26'}}>
      <Pressable
        onPress={() => {
          navigation.navigate('Tab');
        }}
        style={peopleStyle.pressable}>
        <Text style={peopleStyle.back}>{`< Back`}</Text>
      </Pressable>
      <View style={style.separator}></View>
      <ScrollView>
        <View style={{paddingHorizontal: '20%'}}>
          <Image
            source={{uri: item.pimage}}
            style={peopleStyle.image}
            resizeMethod="resize"
            resizeMode="stretch"
          />
        </View>
        <Text style={peopleStyle.name}>{item.name}</Text>
        <Text style={peopleStyle.txt}>Images</Text>
        <FlatList data={images} renderItem={Disp1} horizontal={true} />
        <Text style={peopleStyle.txt}>Worked movies</Text>
        <FlatList data={data} renderItem={Disp} horizontal={true} />
      </ScrollView>
    </SafeAreaView>
  );
};
const peopleStyle = StyleSheet.create({
  txt: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 18,
    paddingLeft: 10,
  },
  name: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 22,
  },
  back: {color: 'white', fontSize: 18},
  pressable: {
    marginVertical: 10,
    width: 100,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  image: {
    height: 350,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
export default PeopleDetails;
