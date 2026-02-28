import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice"
import profileReducer from "./Slices/ProfileSlice";
import cartReducer from "./Slices/CartSlice"
import spinnerReducer from './Slices/SpinnerSlice'
import signupReducer from "./Slices/SignUpSlice";
import courseSlice from "./Slices/CourseSlice"
import ContactSlice from "./Slices/ContactSlice";
import categorySlice from "./Slices/Category"


const rootReducer  = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    spinner: spinnerReducer,
    signup: signupReducer,
    course: courseSlice,
    contact: ContactSlice,
    category: categorySlice,
})

export default rootReducer