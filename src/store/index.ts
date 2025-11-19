import { configureStore, Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// Create the saga middleware
const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  // Add the sagaMiddleware to the chain of middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware as Middleware),
});

// Then run the root saga
sagaMiddleware.run(rootSaga);

// Define RootState and AppDispatch types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;