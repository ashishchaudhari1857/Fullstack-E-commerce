import { createSlice } from "@reduxjs/toolkit";


const cartSlice =createSlice({
    name:"cart",
    initialState:{ 
      cartProducts:[],
        totalPrice:0,
        totalItems:0,
        loading:false,
        error:null
    },
         reducers :{
            getcartsProducts:(state , action) =>{
               state.cartProducts =action.payload;

               state.totalItems = action.payload.reduce((acc, cur) => {
                return acc + cur.CartProducts.quantity;
              }, 0);
              
              state.totalPrice=action.payload.reduce((acc, cur) => {
                return acc + cur.CartProducts.quantity *cur.price;
              }, 0);

            },  
            setLoading:(state ,action)=>{
              state.loading=action.payload;
          },

          setError:(state ,action)=>{
      
            state.error= action.payload;
          },
         }

})


 export const  { getcartsProducts, setLoading ,setError}=cartSlice.actions;
 export default cartSlice.reducer;