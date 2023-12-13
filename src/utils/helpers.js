import { createAsyncThunk } from '@reduxjs/toolkit';

/*
  REDUX HELPERS
*/
export const createCommonAsyncThunk = (name, request) =>
  createAsyncThunk(name, async (body, { rejectWithValue }) => {
    const { response, error } = await request(body || null);
    if (error) {
      return rejectWithValue(error);
    }

    return response;
  });
