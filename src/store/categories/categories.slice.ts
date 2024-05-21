import { createSlice } from "@reduxjs/toolkit";
import { CategoriesName } from "./categories.type";
import {PayloadAction} from '@reduxjs/toolkit'
const initialState = CategoriesName.All;
export const categoriesSlice = createSlice({
  name: "categoriy",
  initialState,
  reducers: {
    setActiveCategory: (_, action: PayloadAction<CategoriesName>) =>
      action.payload,
  },
});
export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;