import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSwitchOn: false,
};

export const toggleReducer = createSlice({
  name: 'toggleSwitch',
  initialState,
  reducers: {
    switchOn: (state, actions) => {
      state.isSwitchOn = !state.isSwitchOn;
    },
  },
});

export const { switchOn } = toggleReducer.actions;

export default toggleReducer.reducer;
