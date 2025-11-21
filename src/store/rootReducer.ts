// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import mobilesReducer from './mobilesSlice'; 
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
  mobiles: mobilesReducer,
  carts: cartReducer
});

export default rootReducer;