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
    if (!email.includes("@")) {
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
