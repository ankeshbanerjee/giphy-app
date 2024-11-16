import axios from 'axios';
import {Constants} from '../utils/constants';
import {GiphyResponse} from '../models/giphyModel';

export const getTrendingGifs = (page: number, limit: number = 10) => {
  const offset = (page - 1) * limit;
  return axios.get<GiphyResponse>(
    `/trending?api_key=${Constants.API_KEY}&limit=${limit}&offset=${offset}`,
  );
};

export const searchGifs = (query: string, page: number, limit: number = 10) => {
  const offset = (page - 1) * limit;
  return axios.get<GiphyResponse>(
    `/search?api_key=${Constants.API_KEY}&q=${query}&limit=${limit}&offset=${offset}`,
  );
};
