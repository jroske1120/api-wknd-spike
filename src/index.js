import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {takeEvery, put} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import axios from 'axios';

function* rootSaga() {
  yield takeEvery('FETCH_IMAGE', getGiphySaga);
  yield takeEvery('FETCH_FAVORITE', getFavoriteSaga);
  yield takeEvery('ADD_FAVORITE', addFavoriteSaga);
}

// gets search results
function* getGiphySaga(action){
  // console.log('trying to send:', action.payload)
  try {
    // get request that sends search query
    const response = yield axios.get('/api/search', {params: {search: action.payload}})
    // data.data to access the array of objects (reponse.data returns an array of an array of objects)
    yield put({type:"SET_IMAGE", payload: response.data.items})
  } catch (error) {
    console.log('issue with search saga:', error)
  }
}

// gets favorites from database
function* getFavoriteSaga(action){
  try {
    // gets favorite image urls from database
    const response = yield axios.get('/api/favorite')
    // sends response.data to favoriteImageReducer
    // when type was incorrectly set up this caused a loop
    yield put({type: "SET_FAVORITE", payload: response.data})
  } catch (error) {
    console.log('issue with favorite saga:', error)
  }
}
// add favorite image 
function* addFavoriteSaga(action){
  try {
    // console.log('setfav generator:', action.payload)
    const response = yield axios.post('/api/favorite', action.payload)
    // performs the action to request the favorite GIFs
    yield put({type: "FETCH_FAVORITE", payload: response.data})
  } catch (error) {
    console.log('issue with setting favorite:', error)
  }
}

// sets favorite images REDUCER
const favoriteImageReducer = (state = [], action) => {
  if (action.type === "SET_FAVORITE"){
    // console.log('favorite images:', action.payload)
    return action.payload;
  }
  return state;
}

// set search results REDUCER
const searchResultReducer = (state=[], action) => {
  if (action.type === "SET_IMAGE"){
    // console.log('searchResult is:', action.payload)
    return action.payload;
  } 
  return state;
}

const sagaMiddleware = createSagaMiddleware();




const store = createStore(
  combineReducers({
    searchResultReducer,
    favoriteImageReducer,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
