import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  subject: "",
  message: "",
  loading: false, // Fixed typo
  errEmail: false,
  errsubject: false,
  errmessage: false,
};

export const sendContact = createAsyncThunk(
  "/sendContact",

  async (_, { getState, dispatch, rejectWithValue }) => {
    const { email, subject, message } = getState().contact; // Get current state values
    // Validation
    const legalEm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!legalEm.test(email)) {
      dispatch(setErrEmail(true));
      return rejectWithValue("Invalid email address");
    } else {
      dispatch(setErrEmail(false));
    }
    if (subject.trim() === "") {
      dispatch(setErrsubject(true));
      return rejectWithValue("Subject cannot be empty");
    } else {
      dispatch(setErrsubject(false));
    }

    if (message.trim() === "") {
      dispatch(setErrmessage(true));
      return rejectWithValue("Message cannot be empty");
    } else {
      dispatch(setErrmessage(false));
    }
    try {
      const data = {
        service_id: "service_19kvycs",
        template_id: "template_p5snoux",
        user_id: "tR8MG5xt9Jm2tcqrS",
        template_params: {
          to_name: "aflame",
          from_Email: email, // Get the email from the form input
          from_subject: subject, // Get the subject from the form input
          message, // Get the message from the form input
        },
      };

      // Send the request to the API
      const response = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log(response.data);

      // Clear form fields on success
      dispatch(setEmail(""));
      dispatch(setSubject(""));
      dispatch(setMessage(""));
    } catch (error) {
      return rejectWithValue(error.message);
    }
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

    setErrEmail: (state, { payload }) => {
      state.errEmail = payload;
    },
    setErrsubject: (state, { payload }) => {
      state.errsubject = payload;
    },
    setErrmessage: (state, { payload }) => {
      state.errmessage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContact.pending, (state) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(sendContact.fulfilled, (state) => {
        console.log("fulfilled");
        state.loading = false;
      })
      .addCase(sendContact.rejected, (state, action) => {
        console.log("rejected:", action.payload);
        state.loading = false;
      });
  },
});

export const contact = contactSlice.reducer;
export const {
  setEmail,
  setSubject,
  setMessage,
  setErrEmail,
  setErrsubject,
  setErrmessage,
} = contactSlice.actions;
