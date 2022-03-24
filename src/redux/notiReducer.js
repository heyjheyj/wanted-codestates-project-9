import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

export const notiReducer = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNoti: (state) => {
      state.data.splice(0, 5);
    },
    addNoti: (state, actions) => {
      const { type, description, dismissTime } = actions.payload;
      console.log(type, description);
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
