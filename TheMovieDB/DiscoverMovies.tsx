import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GetApi} from './API';
import {IMAGE_URL} from './config';
import {useAppDispatch, useAppSelector} from './Redux/MovieRedux';
import {MovieFetch} from './Redux/MovieSlice';

const DiscoverMovies = ({navigation}: any) => {
  const {data, status} = useAppSelector(state => state.MovieReducer);
  const dispatch = useAppDispatch();
  const [trendingMoviesD, setTrendingMoviesD] = useState<any>([]);
  const [trendingMoviesW, setTrendingMoviesW] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [txtIn, setTxtIn] = useState<boolean>(false);
  const [tempMain, setTempMain] = useState<any>([]);
  const [temp, setTemp] = useState<any>([]);
  const [flag, setflag] = useState<Boolean>(false);
  useEffect(() => {
    dispatch(MovieFetch());
  }, []);
  var tempDay: any = [],
    tempWeek: any = [];
  useEffect(() => {
    const get = async () => {
      const res = await GetApi('/trending/movie/day');
      res?.data.results.forEach((i: any) => {
        tempDay.push({
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
      setTrendingMoviesD(tempDay);
      const resp = await GetApi('/trending/movie/week');
      resp?.data.results.forEach((i: any) => {
        tempWeek.push({
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
      setTrendingMoviesW(tempWeek);
      let combine = tempMain.concat(data).concat(tempDay).concat(tempWeek);
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
    };
    get();
  }, [data]);
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

  var main;
  if (Platform.OS === 'ios') {
    main = (
      <View style={style.subView}>
        <Pressable
          onPress={() => {
            setTxtIn(true);
          }}>
          <Icon name="search" size={30} color="white" />
        </Pressable>
        {!txtIn ? (
          <Text style={style.header}>Movies</Text>
        ) : (
          <View style={{paddingLeft: '10%', paddingBottom: 20}}>
            <TextInput
              autoFocus={true}
              placeholder="Search movie"
              style={style.textIn}
              onChangeText={t => {
                temp.forEach((i: any) => console.log(i.title));
                let temp1 = t.toLocaleLowerCase();
                var tempArr = temp?.filter(
                  (i: any) =>
                    i.title?.toLocaleLowerCase().startsWith(temp1) &&
                    i.title?.toLocaleLowerCase().includes(temp1),
                );
                if (tempArr.length != 0) {
                  setTempMain(tempArr);
                } else if (temp1.length == 0) {
                  setTempMain(temp);
                }
                setSearch(t);
              }}
            />
          </View>
        )}
      </View>
    );
  }
  var content;
  if (status == 'Successful') {
    if (search?.length == 0) {
      content = (
        <SafeAreaView style={{backgroundColor: '#151C26', paddingTop: 10}}>
          <TouchableOpacity
            style={style.touchable}
            onPress={() => navigation.navigate('ViewAllScreen', [data])}>
            <Text style={style.viewAll}>View All</Text>
          </TouchableOpacity>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            horizontal={true}
            initialNumToRender={5}
            renderItem={Disp}
            showsHorizontalScrollIndicator={false}
          />
          <View style={style.separator}></View>
          <Text style={style.subTitle}>Trending today</Text>
          <TouchableOpacity
            style={style.touchable}
            onPress={() =>
              navigation.navigate('ViewAllScreen', [trendingMoviesD])
            }>
            <Text style={style.viewAll}>View All</Text>
          </TouchableOpacity>
          <FlatList
            data={trendingMoviesD}
            keyExtractor={(item, index) => item.id}
            initialNumToRender={5}
            renderItem={Disp}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <View style={style.separator}></View>
          <Text style={style.subTitle}>Trending this week</Text>
          <TouchableOpacity
            style={style.touchable}
            onPress={() =>
              navigation.navigate('ViewAllScreen', [trendingMoviesW])
            }>
            <Text style={style.viewAll}>View All</Text>
          </TouchableOpacity>
          <FlatList
            data={trendingMoviesW}
            keyExtractor={item => item.id}
            initialNumToRender={5}
            renderItem={Disp}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      );
    } else if (search?.length > 0) {
      content = (
        <SafeAreaView style={{backgroundColor: '#151C26', paddingTop: 20}}>
          <TouchableOpacity
            style={style.touchable}
            onPress={() => navigation.navigate('ViewAllScreen', [tempMain])}>
            <Text style={style.viewAll}>View All</Text>
          </TouchableOpacity>
          <FlatList
            data={tempMain}
            keyExtractor={item => item.id}
            horizontal={true}
            initialNumToRender={5}
            renderItem={Disp}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      );
    }
  } else {
    content = <ActivityIndicator />;
  }

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#151C26'}}>
        {main}
        <View style={style.separator}></View>
        {content}
      </ScrollView>
    </>
  );
};
export const style = StyleSheet.create({
  flatView: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  movieTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    paddingTop: 30,
    paddingBottom: 20,
    width: 250,
  },
  image: {
    height: 250,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 10,
    alignSelf: 'center',
  },
  viewAll: {color: 'white', textAlign: 'right', paddingRight: 10, fontSize: 16},
  touchable: {width: 80, alignSelf: 'flex-end'},
  separator: {
    height: 1,
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
    marginBottom: 10,
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
  subTitle: {color: 'white', fontSize: 18, paddingLeft: 10},
});
export default DiscoverMovies;
