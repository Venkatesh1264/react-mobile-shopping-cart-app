import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from 'axios';
import { fetchMobilesRequest, fetchMobilesSuccess, fetchMobilesFailure } from './mobilesSlice';
import { MobileData } from '../constants'
import mobilesResponse from '../static/json/mobiles-response.json';

// Worker Saga: performs the API call
function* fetchMobilesSaga(action: PayloadAction<number>): Generator<any, void, AxiosResponse<MobileData[]>> {
  try {
    const userId = action.payload;
    // 'call' effect is used for asynchronous calls (e.g., API requests)
    const response = yield call(axios.get, `https://mpbdbef8e64dc8079896.free.beeceptor.com/images`);
    const userData: MobileData[] = response.data;
    
    // 'put' effect is used to dispatch an action to the store
    //yield put(fetchMobilesSuccess(userData)); 
    yield put(fetchMobilesSuccess(mobilesResponse));

  } catch (error: any) {
    // Dispatch failure action with the error message
    yield put(fetchMobilesSuccess(mobilesResponse));
    //yield put(fetchMobilesFailure(error.message));
  }
}

// Watcher Saga: listens for specific actions and runs the worker saga
export default function* watchFetchMobiles() {
  // 'takeEvery' listens for every 'fetchUserRequest' action and runs 'fetchUserSaga'
  yield takeEvery(fetchMobilesRequest.type, fetchMobilesSaga);
}