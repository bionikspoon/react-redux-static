const webpack = require('webpack');
const NPMInstallPlugin = require('npm-install-webpack-plugin');
// const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const unipath = require('./lib/unipath');

const PATHS = { // :off
  src: unipath('src'),
  dist: unipath('dist'),
  node: unipath('node_modules'),
  base: unipath(),
}; // :on

const DEBUG = true;
const VERBOSE = false;
const WATCH = global.WATCH;

const locals = {
  paths: [
    '/', '/about', '/projects',
  ],
};

module.exports = {
  context: PATHS.base(),

  entry: { // :off
    bundle: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      PATHS.src('index.tsx'),
    ],
  }, // :on

  output: {
    filename: '[name].js',
    path: PATHS.dist(),
    libraryTarget: 'umd',
    publicPath: '/',
    sourceMapFilename: '[file].map',
    sourcePrefix: '  ',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  module: {
    loaders: [
      { // :off
        test: /\.jsx?$/,
        include: [PATHS.src()],
        loaders: ['react-hot', 'babel'],
      }, // :on

      { // :off
        test: /\.tsx?$/,
        include: [PATHS.src()],
        loaders: ['react-hot', 'babel', 'ts'],
      }, // :on

      // { // :off
      //   test: /\.scss$/,
      //   include: [PATHS.src()],
      //   loader: ExtractTextPlugin.extract(),
      // }, // :on
      { // :off
        test: /\.scss$/,
        include: [PATHS.src()],
        loader: 'style'
        + '!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]'
        + '!postcss?parser=postcss-scss',
      }, // :on
      {
        test: /\.json$/,
        include: [PATHS.src()],
        loader: 'json',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        include: [PATHS.src()],
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        include: [PATHS.src()],
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        include: [PATHS.src()],
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        include: [PATHS.src()],
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: [PATHS.src()],
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url?limit=10000',
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file',
      },

    ],
  },

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new NPMInstallPlugin({ save: true }),

    // new StaticSiteGeneratorPlugin('render', locals.paths, locals),

    new HtmlPlugin({ // :off
      inject: false,
      template: PATHS.node('html-webpack-template', 'index.ejs'),
      appMountId: 'app',
    }), // :on

    // new ExtractTextPlugin('main.css'),

    new webpack.DefinePlugin({ // :off
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: DEBUG,
      __DEVTOOLS__: DEBUG,
    }), // :on

    new webpack.optimize.OccurenceOrderPlugin(),

    //
    // new webpack.NoErrorsPlugin(),
  ],

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  ts: {
    transpileOnly: true,
  },

  postcss: function plugins(bundler) {
    return [
      require('postcss-import')({ addDependencyTo: bundler }),
      require('precss')(),
      require('autoprefixer')({ browsers: ['last 2 versions'] }),
    ];
  },

  watch: WATCH,

  devtool: 'source-map',

  cache: DEBUG,

  debug: DEBUG,

  progress: true,

  colors: true,

};
