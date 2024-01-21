import { configureStore } from "@reduxjs/toolkit";
import loginslice from "./slices/loginslice";
import adminproductManager from "./slices/adminproductManager";
import cartSlice from "./slices/cartSlice";

const store = configureStore ({
    reducer:{Auth:loginslice ,AdminProductsManager:adminproductManager ,cart:cartSlice}
})

export default  store;