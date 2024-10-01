import { configureStore } from "@reduxjs/toolkit";
import { contact } from "./slices/contactSlice";



const store =configureStore({
reducer:{contact},

})


export default store