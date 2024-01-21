import { configureStore } from "@reduxjs/toolkit";
import loginslice from "./slices/loginslice";
import adminproductManager from "./slices/adminproductManager";

const store = configureStore ({
    reducer:{Auth:loginslice ,AdminProductsManager:adminproductManager}
})

export default  store;