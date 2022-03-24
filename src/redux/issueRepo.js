import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: `${process.env.REACT_APP_GITHUB_TOKEN}` });

const initialState = { selectedRepo: [], userInfo: [] };

export const getIssues = createAsyncThunk('userInfo', async (searchinfo) => {
  const { user, repo, page } = searchinfo;
  let res = await octokit.request(
    `GET /repos/${user}/${repo}/issues?page=${page}&per_page=100`,
  );
  let data = res.data;
  return data;
});

export const issueReducer = createSlice({
  name: 'issueRepo',
  initialState,
  reducers: {
    saveRepo: (state, actions) => {
      const repo = actions.payload;
      state.selectedRepo.push(repo);
      window.localStorage.setItem(
        'repos',
        JSON.stringify([...state.selectedRepo, repo]),
      );
    },
    getRepo: (state, actions) => {
      let result = JSON.parse(window.localStorage.getItem('repos'));
      console.log(result);
      state.selectedRepo = [...result];
    },
    clearRepo: (state) => (state.selectedRepo = []),
    deleteRepo: (state, actions) => {
      const repo = actions.payload;
      let result = state.selectedRepo.filter(
        (selected) => selected.id !== repo.id,
      );
      window.localStorage.setItem('repos', JSON.stringify(result));
      state.selectedRepo = [...result];
    },
    saveUserInfo: (state, actions) => {
      const repo = actions.payload;
      let [userName, repoName] = repo.full_name.split('/');
      console.log(userName, repoName);
      let data = {
        id: repo.id,
        user: userName,
        repo: repoName,
      };
      state.userInfo = [...state.userInfo, data];
    },
    extraReducers: {
      [getIssues.pending]: (state) => {
        state.loading = true;
      },
      [getIssues.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      },
      [getIssues.rejected]: (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload;
      },
    },
  },
});

export const { saveRepo, getRepo, clearRepo, deleteRepo, saveUserInfo } =
  issueReducer.actions;

export default issueReducer.reducer;
