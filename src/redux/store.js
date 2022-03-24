import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './repoReducer';
import notiReducer from './notiReducer';
import issueRepo from './issueRepo';

export default configureStore({
  reducer: {
    repository: repoReducer,
    notifications: notiReducer,
    issueRepo: issueRepo,
  },
});
