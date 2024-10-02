import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeries = createAsyncThunk("/getSeries", async (x, thunkAPI) => {})


const initialState = {

  }



  const contactSlice = createSlice({
    name: "contact",
    initialState,

  })