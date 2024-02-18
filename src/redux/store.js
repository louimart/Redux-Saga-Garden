import createSagaMiddleware from '@redux-saga/core';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [...state, action.payload];
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

// SAGA
const sagaMiddleware = createSagaMiddleware();

// SAGA Generator Functions
function* getPlantsSaga(action) {
  console.log('running FIRST Saga', action);
  // try catch block
  try {
    // code to try running HERE
    // wait for async event
    const plantsResponse = yield axios({
      method: 'GET',
      url: '/api/plants',
    });
    // dispatch to SET_ELEMENTS with elementsResponse.data
    // async event to dispatch as `put`
    yield put({ type: 'SET_PLANTS', payload: plantsResponse.data });
  } catch (error) {
    console.log('ERROR:', error);
    yield put({
      type: 'ERROR_PLANTS',
      payload: 'Something went wrong, please try again later.',
    });
  }
}

// SAGA POST Plants
function* postPlantsSaga(action) {
  console.log('running SECOND Saga', action);
  try {
    yield axios({
      method: 'POST',
      url: '/api/plants',
      data: {
        name: action.payload.name,
        kingdom: action.payload.kingdom,
        clade: action.payload.clade,
        family: action.payload.family,
        subfamily: action.payload.subfamily,
        genus: action.payload.genus,
      },
    });
    yield put({ type: 'GET_PLANTS' });
  } catch (error) {
    console.log('ERROR: ', error);
    yield put({
      type: 'ERROR_PLANTS',
      payload: 'could not add plant at this time.',
    });
  }
}

// SAGA DELETE plant
function* deletePlantSaga(action) {
  console.log('running #3 SAGA - DELETE plant', action);
  try {
    yield axios({
      method: 'DELETE',
      url: `/api/plants/${action.payload}`,
      data: action.payload,
    });
    yield put({ type: 'DELETE_PLANT' });
  } catch (error) {
    console.log('ERROR: ', error);
  }
}

// SAGA function [generator function]
function* watcherSaga() {
  // yield
  yield takeEvery('GET_PLANTS', getPlantsSaga);
  yield takeEvery('POST_PLANTS', postPlantsSaga);
  yield takeEvery('DELETE_PLANT', deletePlantSaga);
}

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

export default store;
