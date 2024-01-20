import { configureStore } from "@reduxjs/toolkit";
import loginslice from "./slices/loginslice";

const store = configureStore ({
    reducer:{Auth:loginslice}
})

export default  store;