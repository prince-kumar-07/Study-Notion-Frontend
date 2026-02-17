import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

let parsedUser = null;

try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  parsedUser = null;
}

const initialState = {
  user: parsedUser,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value){
            state.user = value.payload
        }
    }
})

export const {setUser} = profileSlice.actions
export default profileSlice.reducer