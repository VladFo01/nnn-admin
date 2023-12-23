import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_TIMEZONE_OFFSET, ONE_HOUR_MILLI } from '../constants/common';

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

export const getLocaleDateWithoutTime = (date = new Date()) => {
  const dateTimeWithOffset = new Date(date).getTime() + DEFAULT_TIMEZONE_OFFSET * ONE_HOUR_MILLI;
  const localeDate = new Date(dateTimeWithOffset).toISOString().substring(0, 10);
  return localeDate;
};
