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
      window.localStorage.setItem(
        'switch',
        JSON.stringify({ isSwitchOn: state.isSwitchOn }),
      );
    },
    getSwitchState: (state, actions) => {
      let result = JSON.parse(window.localStorage.getItem('switch'));
      if (result) {
        state.isSwitchOn = result.isSwitchOn;
      } else {
        state.isSwitchOn = false;
      }
    },
  },
});

export const { switchOn, getSwitchState } = toggleReducer.actions;

export default toggleReducer.reducer;
