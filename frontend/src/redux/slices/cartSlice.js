import { createSlice } from "@reduxjs/toolkit";


const cartSlice =createSlice({
    name:"cart",
    initialState:{ 
        cart:[],
        totalPrice:0,
        totalItems:0,
    },
         reducers :{
            getcartsProducts:(state , action) =>{
               state.item =action.payload

               state.totalItems = action.payload.reduce((acc, cur) => {
                return acc + cur.quantity;
              }, 0);
              
              state.totalPrice=action.payload.reduce((acc, cur) => {
                return acc + cur.quantity *cur.price;
              }, 0);

            }

         }

})