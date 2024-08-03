import axios from 'axios';
import {API_KEY, BASE_URL} from './config';

export const GetApi = async (url: any) => {
  const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (e) {
    console.log(e);
  }
};
