const React = require('react');
const ReactDOM = require('react-dom');
const {
  Route,
  Router,
  IndexRoute,
  hashHistory,
} = require('react-router');
const Main = require('Main');

// load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
const $ = require('jquery');
$(document).foundation();

// load styles
require('style!css!sass!applicationStyles');

// DOM Rendering
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>,
  document.getElementById('app')
);
