import React, {createContext} from 'react';
import Hook from './RN_training/MTproject/context';
import {Provider} from 'react-redux';
import {MovieStore} from './RN_training/TheMovieDB/Redux/MovieStore';
import MovieNavg from './RN_training/TheMovieDB/MovieNavg';

const App = () => {
  return (
    <Provider store={MovieStore}>
      <MovieNavg />
    </Provider>
  );
};
export default App;
