var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/app.jsx',
  ],
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    root: __dirname,
    alias: {
      // components
      Clock: 'app/components/Clock.jsx',
      ClockStatus: 'app/components/ClockStatus.jsx',
      Controls: 'app/components/Controls.jsx',
      CountDown: 'app/components/CountDown.jsx',
      CountDownForm: 'app/components/CountDownForm.jsx',
      CountUp: 'app/components/CountUp.jsx',
      Main: 'app/components/Main.jsx',
      Nav: 'app/components/Nav.jsx',
      Timer: 'app/components/Timer.jsx',
      // other
      utils: 'app/utils/index.js',
      // styles
      applicationStyles: 'app/styles/app.scss',
      // tests
      testUtils: 'app/tests/test-utils.js',
    },
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
    }],
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  devtool: 'cheap-module-eval-source-map',
};
