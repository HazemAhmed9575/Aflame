import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    email: "",
    subject: "",
    message: "",
};

export const sendContact = createAsyncThunk("/sendContact", async () => {
  
  const data = {
    service_id: "service_0z22nzp",
    template_id: "template_qkh5fsj",
    user_id: "HtLpd-4BjARfGKd7a",
    template_params: {
      to_name: "aflame",
      frmo_email:initialState.email,
      frmo_subject: initialState.subject,
      message: initialState.message,
    },
  };
  try {
    const res = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      data
    );
    console.log(res.data);
    initialState.email = "";
    initialState.subject = "";
    initialState.message = "";
  } catch (error) {
    console.log(error);
  }
});
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers:{
    setEmail:(state,{payload})=>{state.email= payload },
    setSubject :(state,{payload})=>{state.subject=payload },
    setMessage : (state,{payload})=>{state.message=payload}
  },
  extraReducers: (builder) => {
    builder.addCase(sendContact.pending, () => {console.log("pending");});
    builder.addCase(sendContact.fulfilled, () => {console.log("fulfilled")});
    builder.addCase(sendContact.rejected, () => {console.log("rejected")});
  },
});

export const contact = contactSlice.reducer;
export const {setEmail,setSubject,setMessage} = contactSlice.actions