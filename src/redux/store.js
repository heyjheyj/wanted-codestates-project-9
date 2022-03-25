import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './repoReducer';
import notiReducer from './notiReducer';
import issueReducer from './issueReducer';
import toggleReducer from './toggleReducer';
import theme from './theme';

export default configureStore({
  reducer: {
    repository: repoReducer,
    notifications: notiReducer,
    issueReducer: issueReducer,
    toggleReducer: toggleReducer,
    theme: theme,
  },
});
