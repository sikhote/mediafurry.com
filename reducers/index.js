import { combineReducers } from 'redux';
import settings from './settings';
import files from './files';
import playlists from './playlists';

const appReducer = combineReducers({
  settings,
  files,
  playlists,
});

const rootReducer = (state, action) => {
  if (action.type === 'APP_CHANGE') {
    state = action.payload;
  }

  return appReducer(state, action);
};

export default rootReducer;
