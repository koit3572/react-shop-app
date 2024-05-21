import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "./products.type";

type initialStateType = {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}
const initialState:initialStateType = {
  products: [],
  isLoading: false,
  error:'',
}
export const fetchProducts = createAsyncThunk(  //비동기 요청
  "products/fetchProducts",
  async (category:string,thunkAPI) => { // return값이 payload가 된다.
    try {
      let response
      if (category) {
        response = await axios.get<IProduct[]>(`https://fakestoreapi.com/products/category/${category}`);
      } else {
        response = await axios.get<IProduct[]>('https://fakestoreapi.com/products');
      }
      return response.data
    } catch (error) {
      // state.error = action.payload === "Error loading products";
      return thunkAPI.rejectWithValue("Error loading products");
    }
  }
);
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  // reducer를 추가하면 프로미스의 진행 상황에 따라서 리듀서를 실행할 수 있다.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        //대기(보류 중)
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        //이행(성취됨)
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        //실패(거부됨)
        state.isLoading = false;
        state.error = action.payload as string;
      })
  }
})
export default productsSlice.reducer;