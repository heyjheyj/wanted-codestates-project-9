import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

export const notiReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNoti: (state) => {
      state.data = [];
    },
    addNoti: (state, actions) => {
      const { type, description, dismissTime } = actions.payload;
      let item = {
        id: Date.now(),
        type: type,
        description: description,
        dismissTime: dismissTime ? dismissTime : 3000,
      };
      state.data = [...state.data, item];
    },
  },
});

export const { clearNoti, addNoti } = notiReducer.actions;

export default notiReducer.reducer;
