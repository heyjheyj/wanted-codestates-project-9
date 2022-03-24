import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// const saveCache = (word, data) => {
//   let cache = JSON.parse(localStorage.getItem('searchResult'));
//   const newData = {
//     result: data,
//     expireTime: Date.now() + 300000,
//   };
//   if (cache === null) {
//     cache = {};
//   }
//   cache[word] = newData;
//   localStorage.setItem(
//     'searchResult',
//     JSON.stringify({
//       ...cache,
//     }),
//   );
// };

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
    // saveCache(keyword, data);
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
    getLocalData: (state, action) => {
      const { keyword } = action.payload;
      const cache = JSON.parse(localStorage.getItem('searchResult'));
      state.data = cache[keyword].result;
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    [getData.rejected]: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { clearData, getLocalData } = repoReducer.actions;

export default repoReducer.reducer;
