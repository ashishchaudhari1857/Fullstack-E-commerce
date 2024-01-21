import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    error: null,
    user: null,
    loading: false,
    showLoginForm:false,
    showPassword:false

  },

  reducers:{
    setLoading:(state ,action)=>{
        state.loading=action.payload;
    },
    login:(state ,action)=>{
      const data=action.payload;
      state.user=data.user;
      localStorage.setItem("userId" ,data.user.id)
      localStorage.setItem("cartId" ,data.cartId)
      localStorage.setItem("role" ,data.role)
      localStorage.setItem("token" ,data.token)

    },
    logout :(sate ,action)=>{
      localStorage.clear();

    },
    setError:(state ,action)=>{
      
      state.error= action.payload;
    },
    setShowLoginForm :(state ,action)=>{
      state.showLoginForm=!(state.showLoginForm)
    },
    setShowPassword:(state ,action)=>{
      state.showPassword=!(state.showPassword)
    }

  }
});


export const  { setLoading ,login ,logout ,setError ,setShowLoginForm ,setShowPassword} =loginSlice.actions;

export default loginSlice.reducer;