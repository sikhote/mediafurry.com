module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.css$/,
        loader: 'emit-file-loader',
        options: { name: 'dist/[path][name].[ext]' },
      },
      {
        test: /\.css$/,
        loader: 'raw-loader',
      },
    );
    return config;
  },
};
