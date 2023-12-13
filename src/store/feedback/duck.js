import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES,
} from '../../constants';

import { createCommonAsyncThunk } from '../../utils/helpers';
import api from './api';

const { FEEDBACK } = STORE_NAMES;

const initialState = {
  ...INITIAL_STATE,
};

const getAllFeedbackThunkName = `${FEEDBACK}/getAll`;
const deleteFeedbackThunkName = `${FEEDBACK}/delete`;

export const getAllFeedback = createCommonAsyncThunk(getAllFeedbackThunkName, api.getAllFeedback);

export const deleteFeedbackById = createCommonAsyncThunk(
  deleteFeedbackThunkName,
  api.deleteFeedbackById,
);

const feedbackSlice = createSlice({
  name: FEEDBACK,
  initialState,
  reducers: {
    resetState: () => initialState,
    resetError: state => ({
      ...state,
      error: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(getAllFeedback.pending, deleteFeedbackById.pending), state => {
        if (!state.isPending) {
          return {
            ...state,
            ...PENDING_STATE,
          };
        }
      })
      .addMatcher(
        isAnyOf(getAllFeedback.rejected, deleteFeedbackById.rejected),
        (state, action) => {
          const {
            data: { message, errors },
            status,
          } = action.payload;

          if (state.isPending) {
            const newState = {
              ...state,
              ...REJECTED_STATE,
              error: { message, status, errors },
            };

            return newState;
          }
        },
      )
      .addMatcher(
        isAnyOf(getAllFeedback.fulfilled, deleteFeedbackById.fulfilled),
        (state) => ({
          ...state,
          ...FULFILLED_STATE,
        }),
      );
  },
});

const { actions: feedbackActions, reducer: feedbackReducer } = feedbackSlice;

export { feedbackActions, feedbackReducer };
