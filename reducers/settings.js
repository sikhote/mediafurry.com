import { lensPath, set } from 'ramda';

const initialState = {
  cloud: {
    key: '',
    path: '',
    date: null,
    status: null,
  },
  audio: {
    position: 0,
    sortBy: 'artist',
    sortDirection: true,
  },
  video: {
    position: 0,
    sortBy: 'name',
    sortDirection: true,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETTINGS_REPLACE': {
      const { settings } = action.payload;
      return settings || state;
    }
    case 'SETTINGS_CLOUD_DELETE': {
      return set(lensPath(['cloud']), initialState.cloud, state);
    }
    default:
      return state;
  }
};

export default reducer;