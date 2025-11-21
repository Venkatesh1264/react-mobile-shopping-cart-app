import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MobileData } from '../constants'


interface CartState {
  cartData: MobileData[] | [];
}

const initialState: CartState = {
  cartData: [],
};

export const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    fetchCartItems: (state, action: PayloadAction<void>) => {
      state.cartData = [...state.cartData]
    },
    updateCartItems: (state, action: PayloadAction<MobileData>) => {
      state.cartData = [...state.cartData, action.payload]
    },
    deleteCartItems: (state, action: PayloadAction<MobileData>) => {
      state.cartData = [...state.cartData.filter(item => item.id != action.payload.id)]
    }
  },
});

export const { fetchCartItems, updateCartItems, deleteCartItems } = cartSlice.actions;

export default cartSlice.reducer;