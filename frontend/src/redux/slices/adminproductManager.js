import { createSlice } from "@reduxjs/toolkit";

const adminProductSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});


 export default adminProductSlice.reducer;
 export const {setError ,setLoading ,getProducts}=adminProductSlice.actions;