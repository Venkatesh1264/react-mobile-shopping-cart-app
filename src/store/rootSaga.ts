import { all, call } from 'redux-saga/effects';
import watchFetchMobiles from './mobilesSaga';

// Export a root saga generator function
export default function* rootSaga(): Generator<any, void, unknown> {
  yield all([
    call(watchFetchMobiles),
  ]);
}