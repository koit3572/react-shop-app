import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../products/products.type";
import {PayloadAction} from '@reduxjs/toolkit'
type initialStateType = {
  products: IProduct[];
  totalPrice: number;
  userId: string;
}
const initialState:initialStateType = {
  products: localStorage.getItem('cartProducts') ?
    JSON.parse(localStorage.getItem('cartProducts') as string) : [],
  totalPrice: 0,
  userId: localStorage.getItem('userId') ?
    JSON.parse(localStorage.getItem('userId') as string) : '',
} 
export const postOrder = createAsyncThunk(
  'cart/postOrder',
  async (order,thunkAPI) => {
    try {
      await axios.post(
        "https://651689a809e3260018c9e565.mockapi.io/orders",
        order
      );
      thunkAPI.dispatch(sendOrder())
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending order')
    }
  }
)
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(state.userId));
    },
    removeUserId: (state) => {
      state.userId = "";
      localStorage.setItem("userId", JSON.stringify(state.userId));
    },
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    incrementProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: item.price * (item.quantity + 1),
            }
          : item
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    decrementProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: item.price * (item.quantity - 1),
            }
          : item
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, item) => (acc += item.total),
        0
      );
    },
    sendOrder: (state) => {
      state.products = [];
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
  },
});
export const {
  setUserId,
  removeUserId,
  addToCart,
  deleteFromCart,
  incrementProduct,
  decrementProduct,
  getTotalPrice,
  sendOrder
} = cartSlice.actions
export default cartSlice.reducer