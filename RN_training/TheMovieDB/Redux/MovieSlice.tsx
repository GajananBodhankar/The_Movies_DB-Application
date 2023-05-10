import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {State} from 'react-native-gesture-handler';
import {API_KEY, BASE_URL, IMAGE_URL} from '../config';
interface Idata {
  id: number;
  image: string;
  title: string;
  overview: string;
  language: string;
  popularity: number | string;
  release: string;
  media: string;
}
interface Imaindata {
  data: Idata[];
  status: 'Idle' | 'Loading' | 'Successful' | 'Rejected';
  error: string | undefined;
}
const MovieObj: Imaindata = {
  data: [],
  status: 'Idle',
  error: undefined,
};
export const MovieFetch = createAsyncThunk('Fetch', async () => {
  const API = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
  const response = await axios.get(API);
  return response.data.results;
});
export const MovieSlice = createSlice({
  name: 'MovieSlice',
  initialState: MovieObj,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(MovieFetch.fulfilled, (state, action) => {
        var temp: any = [];
        action.payload.forEach((i: any, j: any) => {
          temp.push({
            id: i.id,
            pimage: `${IMAGE_URL}${i.poster_path}`,
            bimage: `${IMAGE_URL}${i.backdrop_path}`,
            title: i.title,
            media: 'movie',
            overview: i.overview,
            language: i.original_language,
            popularity: i.popularity,
            release: i.release_date,
          });
          state.data = temp;
          state.status = 'Successful';
        });
      })
      .addCase(MovieFetch.rejected, state => {
        state.status = 'Rejected';
      })
      .addCase(MovieFetch.pending, state => {
        state.status = 'Loading';
      });
  },
});
export const MovieReducer = MovieSlice.reducer;
