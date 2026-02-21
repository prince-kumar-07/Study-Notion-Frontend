import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice"
import profileReducer from "./Slices/Profileslice";
import cartReducer from "./Slices/CartSlice"
import spinnerReducer from './Slices/SpinnerSlice'
import signupReducer from "./Slices/SignUpSlice";
import courseSlice from "./Slices/CourseSlice"
import ContactSlice from "./Slices/ContactSlice";


const rootReducer  = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    spinner: spinnerReducer,
    signup: signupReducer,
    course: courseSlice,
    contact: ContactSlice
})

export default rootReducer