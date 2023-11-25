import { createSlice } from '@reduxjs/toolkit';

import {
  thunkPortionAddDrinking,
  thunkPortionDeleteWater,
  thunkPortionOfDrinking,
} from './thunkPortionOfDrinking';

const initialState = {
  access_token: '',
  isLoading: false,
  error: '',
  profile: null,
  portion: [],
};
const handleFulfilledAdd = (state, action) => {
  console.log('action', action.payload);
  console.log('state', state);
  state.isLoading = false;
  state.portion = [...state.portion, action.payload];
};
const handleFulfilledDelete = (state, action) => {
  console.log('action', action.payload);
  console.log('state', state);
  state.isLoading = false;
};

const handlePending = state => {
  state.isLoading = true;
  state.error = '';
};
const handleRejected = (state, { error, payload }) => {
  state.isLoading = false;
  state.error = payload ?? error.message;
};
const portionOfDrinkingSlice = createSlice({
  name: 'portion',
  initialState,
  // initialState: [],
  // reducers: {
  //   add: (state, action) => [...state, action.payload],

  //   del: (state, action) => state.filter((el, idx) => idx !== action.payload),
  //   remove: (state, action) => {
  //     state.map((el, i) => {
  //       if (i === action.payload) {
  //         console.log('aaaa', el.time);
  //       }
  //     });
  //   },

  extraReducers: builder => {
    builder
      .addCase(thunkPortionAddDrinking.fulfilled, handleFulfilledAdd)
      .addCase(thunkPortionDeleteWater.fulfilled, handleFulfilledDelete)
      //   .addCase(getProfileThunk.fulfilled, handleFulfilledProfile)
      .addMatcher(({ type }) => type.endsWith('/pending'), handlePending)
      .addMatcher(({ type }) => type.endsWith('/rejected'), handleRejected);
  },
});
export const portionDrink = portionOfDrinkingSlice.reducer;
// export const { add, del, drink, remove } = portionOfDrinkingSlice.actions;
