const initialState = {
  playlists: [
    {
      created: Date.now(),
      title: 'Gimme More',
      tracks: []
    }
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYLISTS_UPDATE': {
      const newState = { ...state };
      const { playlists } = newState;
      const { playlist } = action.payload;
      const index = playlists.findIndex(({ id }) => id === playlist.id);
      playlists[index] = playlist;
      return newState;
    }
    case 'PLAYLISTS_ADD': {
      const newState = { ...state };
      const { playlists } = newState;
      const { playlist } = action.payload;
      playlists.push(playlist);
      return newState;
    }
    case 'PLAYLISTS_REMOVE': {
      const newState = { ...state };
      const { playlists } = newState;
      const { playlist } = action.payload;
      const index = playlists.findIndex(({ id }) => id === playlist.id);
      playlists.splice(index, 0);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
