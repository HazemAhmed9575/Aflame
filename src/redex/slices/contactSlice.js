import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  subject: "",
  message: "",
  loding: false,
  errEmail: false,
  errsubject: false,
  errmessage: false,
};

export const sendContact = createAsyncThunk(
  "/sendContact",
  async (x, thunkAPI) => {

// try{
//   const legalEm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (initialState.email == "" || !legalEm.test(initialState.email)) {
//     console.log(initialState.errEmail);
//     initialState.errEmail = true;

//     console.log(initialState.errEmail);
//   } else if (initialState.subject == "") {
//     initialState.errEmail = false;
//     initialState.errsubject = true;
//   } else if (initialState.message == "") {
//     initialState.errEmail = false;
//     initialState.errsubject = false;
//     initialState.errmessage = true;
//   } else {
//     initialState.errEmail = false;
//     initialState.errsubject = false;
//     initialState.errmessage = false;
//     const data = {
//       service_id: "service_0z22nzp",
//       template_id: "template_qkh5fsj",
//       user_id: "HtLpd-4BjARfGKd7a",
//       template_params: {
//         to_name: "aflame",
//         frmo_email: initialState.email,
//         frmo_subject: initialState.subject,
//         message: initialState.message,
//       },
//     };
//     axios({
//       method: "post",
//       url: "https://api.emailjs.com/api/v1.0/email/send",
//       data,
//     }).then((res) => {
//       console.log(res.data);
//       initialState.email = "";
//       initialState.subject = "";
//       initialState.message = "";
//     });
//   }
// }catch(e){
//   thunkAPI.rejectWithValue(e)
// }





    

    try {
      const data = {
        service_id: "service_0z22nzp",
        template_id: "template_qkh5fsj",
        user_id: "HtLpd-4BjARfGKd7a",
        template_params: {
          to_name: "aflame",
          frmo_email: initialState.email,
          frmo_subject: initialState.subject,
          message: initialState.message,
        },
      };
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log(res.data);
      initialState.email = "";
      initialState.subject = "";
      initialState.message = "";
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }


    //  try {
    //   //   const data = {
    //   //     service_id: "service_0z22nzp",
    //   //     template_id: "template_qkh5fsj",
    //   //     user_id: "HtLpd-4BjARfGKd7a",
    //   //     template_params: {
    //   //       to_name: "aflame",
    //   //       frmo_email: initialState.email,
    //   //       frmo_subject: initialState.subject,
    //   //       message: initialState.message,
    //   //     },
    //   //   };
    //   //   const res = await axios.post(
    //   //     "https://api.emailjs.com/api/v1.0/email/send",
    //   //     data
    //   //   );
    //   //   console.log(res.data);
    //   //   initialState.email = "";
    //   //   initialState.subject = "";
    //   //   initialState.message = "";
    //   // } catch (e) {
    //   //   thunkAPI.rejectWithValue(e);
    //   // }


  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setSubject: (state, { payload }) => {
      state.subject = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    sendMessage: (state) => {
      const legalEm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (state.email == "" || !legalEm.test(state.email)) {
        state.errEmail = true;
      } else if (state.subject == "") {
        state.errEmail = false;
        state.errsubject = true;
      } else if (state.message == "") {
        state.errEmail = false;
        state.errsubject = false;
        state.errmessage = true;
      } else {
        state.errEmail = false;
        state.errsubject = false;
        state.errmessage = false;

        sendContact()





        // const data = {
        //   service_id: "service_0z22nzp",
        //   template_id: "template_qkh5fsj",
        //   user_id: "HtLpd-4BjARfGKd7a",
        //   template_params: {
        //     to_name: "aflame",
        //     frmo_email: state.email,
        //     frmo_subject: state.subject,
        //     message: state.message,
        //   },
        // };
        // axios({
        //   method: "post",
        //   url: "https://api.emailjs.com/api/v1.0/email/send",
        //   data,
        // }).then((res) => {
        //   console.log(res.data);
        //   state.email = "";
        //   state.subject = "";
        //   state.message = "";
        // });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendContact.pending, (state) => {
      console.log("pending"), (state.loding = true);
    });
    builder.addCase(sendContact.fulfilled, (state) => {
      console.log("fulfilled"), (state.loding = false);
    });
    builder.addCase(sendContact.rejected, () => {
      console.log("rejected");
    });
  },
});

export const contact = contactSlice.reducer;
export const { setEmail, setSubject, setMessage, sendMessage } =
  contactSlice.actions;
