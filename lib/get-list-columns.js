export default source => {
  switch (source) {
    case 'video':
      return [
        { title: 'Name', dataKey: 'name' },
        { title: 'Category', dataKey: 'category' },
      ];
    case 'playlists':
      return [
        { title: 'Name', dataKey: 'name' },
        { title: 'Created', dataKey: 'created' },
        { title: 'Tracks', dataKey: 'tracks' },
      ];
    default:
      return [
        { title: '#', dataKey: 'track' },
        { title: 'Name', dataKey: 'name' },
        { title: 'Artist', dataKey: 'artist' },
        { title: 'Album', dataKey: 'album' },
      ];
  }
};