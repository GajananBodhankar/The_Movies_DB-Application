import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {GetApi} from './API';
import {IMAGE_URL} from './config';
import {style} from './DiscoverMovies';
import Icon from 'react-native-vector-icons/Ionicons';
const DiscoverTV = ({navigation}: any) => {
  const [popular, setPopular] = useState<any>([]);
  const [latest, setLatest] = useState<any>([]);
  const [trendD, setTrendingD] = useState<any>([]);
  const [trendW, setTrendingW] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [txtIn, setTxtIn] = useState<boolean>(false);
  const [tempMain, setTempMain] = useState<any>([]);
  const [temp, setTemp] = useState<any>([]);

  useEffect(() => {
    var popArr: any = [],
      latestArr: any = [],
      trendArrD: any = [],
      trendArrW: any = [];
    const get = async () => {
      const res = await GetApi('/discover/tv');
      res?.data.results.forEach((i: any) => {
        popArr.push({
          id: i.id,
          pimage: `${IMAGE_URL}${i.poster_path}`,
          bimage: `${IMAGE_URL}${i.backdrop_path}`,
          title: i.name,
          overview: i.overview,
          popularity: i.popularity,
          vote: i.vote_average,
          media: 'tv',
        });
      });
      const pop = await GetApi('/tv/top_rated');
      pop?.data.results.forEach((i: any) => {
        latestArr.push({
          id: i.id,
          pimage: `${IMAGE_URL}${i.poster_path}`,
          bimage: `${IMAGE_URL}${i.backdrop_path}`,
          title: i.name,
          overview: i.overview,
          popularity: i.popularity,
          vote: i.vote_average,
          media: 'tv',
        });
      });
      const trendDay = await GetApi('/trending/tv/day');
      trendDay?.data.results.forEach((i: any) => {
        trendArrD.push({
          id: i.id,
          pimage: `${IMAGE_URL}${i.poster_path}`,
          bimage: `${IMAGE_URL}${i.backdrop_path}`,
          title: i.name,
          overview: i.overview,
          popularity: i.popularity,
          vote: i.vote_average,
          media: i.media_type,
        });
      });
      const trendWeek = await GetApi('/trending/tv/week');
      trendWeek?.data.results.forEach((i: any) => {
        trendArrW.push({
          id: i.id,
          pimage: `${IMAGE_URL}${i.poster_path}`,
          bimage: `${IMAGE_URL}${i.backdrop_path}`,
          title: i.name,
          overview: i.overview,
          popularity: i.popularity,
          vote: i.vote_average,
          media: i.media_type,
        });
      });
      setTrendingW(trendArrW);
      setPopular(popArr);
      setLatest(latestArr);
      setTrendingD(trendArrD);
    };
    get();
  }, []);
  useEffect(() => {
    let combine = tempMain.concat(latest).concat(trendD).concat(trendW);
    let combineMain: any = [];
    combine.forEach((i: any) => {
      var flag = false;
      combineMain.forEach((j: any) => {
        if (i.id == j.id) {
          flag = true;
        }
      });
      if (!flag) {
        combineMain.push(i);
      }
    });
    setTemp(combineMain);
    setTempMain(temp);
  }, [latest]);

  var main;
  if (Platform.OS === 'ios') {
    main = (
      <View style={style.subView}>
        <Pressable onPress={() => setTxtIn(true)}>
          <Icon name="search" size={30} color="white" />
        </Pressable>
        {!txtIn ? (
          <Text style={style.header}>TV shows</Text>
        ) : (
          <View style={{paddingLeft: '10%', paddingBottom: 20}}>
            <TextInput
              autoFocus={true}
              placeholder="Search tv show"
              style={style.textIn}
              onChangeText={t => {
                let temp1 = t.toLocaleLowerCase();
                var tempArr = temp.filter(
                  (i: any) =>
                    i.title?.toLocaleLowerCase().startsWith(temp1) &&
                    i.title?.toLocaleLowerCase().includes(temp1),
                );
                if (tempArr.length > 0) {
                  setTempMain(tempArr);
                } else {
                  setTempMain(temp);
                }
                setSearch(t);
              }}
            />
          </View>
        )}
      </View>
    );
  } else if (Platform.OS === 'android') {
    main = (
      <View style={style.subView}>
        <Pressable onPress={() => setTxtIn(true)}>
          <Icon name="search" size={30} color="white" />
        </Pressable>
        {!txtIn ? (
          <Text
            style={style.header}>
            TV shows
          </Text>
        ) : (
          <View style={{paddingLeft: '10%', paddingBottom: 20}}>
            <TextInput
              placeholder="Search movie"
              style={style.textIn}
              onChangeText={t => {
                let temp1 = t.toLocaleLowerCase();
                var tempArr = tempMain?.filter((i: any) =>
                  i.title?.toLocaleLowerCase().startsWith(temp1),
                );
                if (tempArr) {
                  setTempMain(tempArr);
                }
                setSearch(t);
              }}
            />
          </View>
        )}
      </View>
    );
  }
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
  let content;
  if (search.length == 0) {
    content = (
      <SafeAreaView>
        <Text style={style.subTitle}>
          Popular TV shows
        </Text>
        <TouchableOpacity
          style={style.touchable}
          onPress={() => navigation.navigate('ViewAllScreen', [popular])}>
          <Text style={style.viewAll}>View All</Text>
        </TouchableOpacity>
        <FlatList
          data={popular}
          initialNumToRender={5}
          keyExtractor={item => item.id}
          renderItem={Disp}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={style.separator}></View>
        <Text style={style.subTitle}>
          Latest TV shows
        </Text>
        <TouchableOpacity
          style={style.touchable}
          onPress={() => navigation.navigate('ViewAllScreen', [latest])}>
          <Text style={style.viewAll}>View All</Text>
        </TouchableOpacity>
        <FlatList
          data={latest}
          initialNumToRender={5}
          keyExtractor={item => item.id}
          renderItem={Disp}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={style.separator}></View>
        <Text style={style.subTitle}>
          Trending today
        </Text>
        <TouchableOpacity
          style={style.touchable}
          onPress={() => navigation.navigate('ViewAllScreen', [latest])}>
          <Text style={style.viewAll}>View All</Text>
        </TouchableOpacity>
        <FlatList
          data={trendD}
          initialNumToRender={5}
          keyExtractor={item => item.id}
          renderItem={Disp}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={style.separator}></View>
        <Text style={style.subTitle}>
          Trending this week
        </Text>
        <TouchableOpacity
          style={style.touchable}
          onPress={() => navigation.navigate('ViewAllScreen', [latest])}>
          <Text style={style.viewAll}>View All</Text>
        </TouchableOpacity>
        <FlatList
          data={trendW}
          initialNumToRender={5}
          keyExtractor={item => item.id}
          renderItem={Disp}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  } else if (search.length > 0) {
    content = (
      <SafeAreaView>
        <FlatList
          data={tempMain}
          initialNumToRender={5}
          keyExtractor={item => item.id}
          renderItem={Disp}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
  return (
    <ScrollView style={{backgroundColor: '#151C26'}}>
      {main}
      <View
        style={style.separator}></View>
      {content}
    </ScrollView>
  );
};
export default DiscoverTV;
