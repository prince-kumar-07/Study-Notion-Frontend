import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {

    totalItem: localStorage.getItem("totalItem") ? JOSN.parse(localStorage.getItem("totalItem")) : 0
    
}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
        setTotalItem(state, value){
            state.user = value.payload
        }
        //add to cart
        //remove from cart
        //reset cart
    }
})

export const {setTotalItem} = cartSlice.actions
export default cartSlice.reducer