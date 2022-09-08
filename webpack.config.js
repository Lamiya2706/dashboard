const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = (_, argv) => ({
  entry: './src/index',
  // mode: 'development',
  output: {
    publicPath: argv.mode === 'development' ? 'localhost:3000' : 'https://lamiya2706.github.io/dashboard'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // port: 3001,
    historyApiFallback: true,
    hot: 'only',
  },
  output: {
    publicPath: 'auto',
    chunkFilename: '[id].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.mjs', '.jsx', '.css'],
    alias: {
      events: 'events',
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      remotes: {
        // order: 'order@http://localhost:3002/remoteEntry.js',
        // shell: 'shell@http://localhost:3000/remoteEntry.js',
        // dashboard: 'dashboard@http://localhost:3001/remoteEntry.js',
        order: 'order@https://lamiya2706.github.io/orders/remoteEntry.js',
        dashboard: 'dashboard@https://lamiya2706.github.io/dashboard/remoteEntry.js',
        shell: 'shell@https://lamiya2706.github.io/shell/remoteEntry.js',
      },
      exposes: {
        './DashboardService': './src/DashboardService',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        '@material-ui/core': {
          singleton: true,
          requiredVersion: deps['@material-ui/core'],
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: './',
    }),
  ],
});
