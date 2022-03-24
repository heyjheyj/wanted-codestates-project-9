import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './repoReducer';
import notiReducer from './notiReducer';
import issueReducer from './issueReducer';

export default configureStore({
  reducer: {
    repository: repoReducer,
    notifications: notiReducer,
    issueReducer: issueReducer,
  },
});
