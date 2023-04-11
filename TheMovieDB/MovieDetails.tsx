import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {GetApi} from './API';
import {IMAGE_URL} from './config';
const HandlePress = async (key: any) => {
  const supported = await Linking.canOpenURL(
    `https://www.youtube.com/watch?v=${key}`,
  );
  if (supported) {
    await Linking.openURL(`https://www.youtube.com/watch?v=${key}`);
  } else {
    console.log(`not supported`);
  }
};
const MovieDetails = ({navigation, route}: any) => {
  const {item} = route.params;
  const [recommendM, setRecommendM] = useState<any>([]);
  const [recommendT, setRecommendT] = useState<any>([]);
  const [similarM, setSimilarM] = useState<any>([]);
  const [similarT, setSimilarT] = useState<any>([]);
  const [trailer, setTrailer] = useState<string>('');
  useEffect(() => {
    var recommendMArr: any = [],
      recommendTArr: any = [],
      similarMArr: any = [],
      similarTArr: any = [];
    const get = async () => {
      if (item.media == 'movie') {
        const response = await GetApi(`/movie/${item.id}/videos`);
        setTrailer(response?.data.results[0].key);
        const resM = await GetApi(`/movie/${item.id}/recommendations`);
        resM?.data.results.forEach((i: any) => {
          recommendMArr.push({
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
        const simlM = await GetApi(`/movie/${item.id}/similar`);
        simlM?.data.results.forEach((i: any) => {
          similarMArr.push({
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
      } else if (item.media == 'tv') {
        const response = await GetApi(`/tv/${item.id}/videos`);
        setTrailer(response?.data.results[0].key);
        const resT = await GetApi(`/tv/${item.id}/recommendations`);
        resT?.data.results.forEach((i: any) => {
          recommendTArr.push({
            id: i.id,
            pimage: `${IMAGE_URL}${i.poster_path}`,
            bimage: `${IMAGE_URL}${i.backdrop_path}`,
            title: i.title,
            overview: i.overview,
            language: i.original_language,
            popularity: i.popularity,
            release: i.release_date,
          });
        });
        const simlT = await GetApi(`/tv/${item.id}/similar`);
        simlT?.data.results.forEach((i: any) => {
          similarTArr.push({
            id: i.id,
            pimage: `${IMAGE_URL}${i.poster_path}`,
            bimage: `${IMAGE_URL}${i.backdrop_path}`,
            title: i.title,
            overview: i.overview,
            language: i.original_language,
            popularity: i.popularity,
            release: i.release_date,
          });
        });
      }
      item.media == 'movie' ? setRecommendM(recommendMArr) : null;
      item.media == 'movie' ? setSimilarM(similarMArr) : null;

      if (item.media == 'tv') {
        setRecommendT(recommendTArr);
        setSimilarT(similarTArr);
      }
    };
    get();
  }, [item]);
  const Disp = ({item}: any) => {
    return (
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MovieDetails', {item});
          }}>
          <Image
            source={{uri: item.pimage}}
            style={styleDetails.posterimage}
            resizeMethod="resize"
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  };
  let contentRecommended = (
    <FlatList
      data={item.media == 'movie' ? recommendM : recommendT}
      renderItem={Disp}
      horizontal={true}
    />
  );
  let contentSimilar = (
    <FlatList
      data={item.media == 'movie' ? similarM : similarT}
      renderItem={Disp}
      horizontal={true}
    />
  );
  return (
    <View style={styleDetails.mainView}>
      <Pressable
        onPress={() => {
          navigation.navigate('Tab');
        }}
        style={styleDetails.touchable}>
        <Text style={{color: 'white', fontSize: 18}}>{`< Back`}</Text>
      </Pressable>
      <ScrollView>
        <View style={styleDetails.line}></View>
        <Image source={{uri: item.bimage}} style={styleDetails.image}></Image>
        <Text style={styleDetails.title}>{item.title}</Text>
        <Text style={styleDetails.overview}>{item.overview}</Text>
        <Text style={styleDetails.overview}>
          To be released on {item.release}
        </Text>
        <Text style={styleDetails.overview}>
          Popularity - {item.popularity}
        </Text>
        {item.vote ? (
          <Text style={styleDetails.overview}>
            The vote count is {item.vote}
          </Text>
        ) : null}
        {trailer.length > 0 ? (
          <View style={{paddingLeft: 10}}>
            <Pressable
              onPress={() => HandlePress(trailer)}
              style={styleDetails.pressable}>
              <Text style={styleDetails.trailer}>Click for the trailer</Text>
            </Pressable>
          </View>
        ) : null}
        {item.media == 'movie' && recommendM ? (
          <Text style={styleDetails.overview}>{`Recommended movies`}</Text>
        ) : (
          <Text style={styleDetails.overview}>Recommended TV shows</Text>
        )}
        {contentRecommended}
        {item.media == 'movie' && similarM ? (
          <Text style={styleDetails.overview}>{`Similar movies`}</Text>
        ) : (
          <Text style={styleDetails.overview}>Similar TV shows</Text>
        )}
        {contentSimilar}
      </ScrollView>
    </View>
  );
};
const styleDetails = StyleSheet.create({
  pressable: {backgroundColor: 'red', width: 150, borderRadius: 4},
  mainView: {
    flex: 1,
    backgroundColor: '#151C26',
  },
  image: {height: 250, resizeMode: 'contain'},
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    marginVertical: 20,
  },
  touchable: {
    marginVertical: 10,
    width: 100,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  line: {
    height: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  overview: {
    color: 'white',
    padding: 10,
    fontSize: 18,
  },
  posterimage: {
    height: 250,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 10,
    alignSelf: 'center',
  },
  trailer: {color: 'white', textAlign: 'center'},
});
export default MovieDetails;
