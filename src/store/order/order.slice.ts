import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Iorder } from "./order.type";

type initialStateType = {
  order: Iorder[];
  isLoading: boolean;
  error: string;
}
const initialState:initialStateType = {
  order: [],
  isLoading: false,
  error: '',
}
export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (userId:string, thunkAPI) => {
    try {
      const response = await axios.get<Iorder[]>(
        `https://651689a809e3260018c9e565.mockapi.io/orders?search=${userId}`
      );
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error receiving order')
    }
  }
)
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder 
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  }
})

export default orderSlice.reducer;