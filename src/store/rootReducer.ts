// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import mobilesReducer from './mobilesSlice'; 
// import counterReducer from './counterSlice'; 

const rootReducer = combineReducers({
  mobiles: mobilesReducer
});

export default rootReducer;