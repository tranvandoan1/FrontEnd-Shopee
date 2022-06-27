import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderAPI from "../API/Orders";

export const getOrder=createAsyncThunk(
    "order/getOrder",
    async ()=>{
        const {data:orders}=await OrderAPI.getAll()
        return orders
    }
)
const orderSlice=createSlice({
    name:"order",
    initialState:{
        value:[]
    },
    reducers:{
        addProduct(state,action){
            // state.value.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getOrder.fulfilled,(state,action)=>{
            state.value = action.payload
        })
    }
    
})
export default orderSlice.reducer