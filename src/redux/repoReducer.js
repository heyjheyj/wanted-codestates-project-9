import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getData = createAsyncThunk(
  'data/searchData',
  async (searchinfo) => {
    console.log(searchinfo);
    const { keyword, page } = searchinfo;
    let result = await octokit.request(
      `GET /search/repositories?page=${page}`,
      {
        q: keyword,
      },
    );
    let data = result.data.items;
    return data;
  },
);

export const repoReducer = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = '';
    },
    [getData.rejected]: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { clearData } = repoReducer.actions;

export default repoReducer.reducer;
