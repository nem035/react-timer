/*
eslint
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off",
  import/newline-after-import: "off"
  */
const React = require('react');
const ReactDOM = require('react-dom');
const {
  Route,
  Router,
  IndexRoute,
  hashHistory,
} = require('react-router');

const Main = require('Main');
const Countdown = require('Countdown');
const Countup = require('Countup');

// load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
const $ = require('jquery');
$(document).foundation(); // eslint-disable-line no-undef

// load styles
require('style!css!sass!applicationStyles');

// DOM Rendering
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="countdown" component={Countdown} />
      <Route path="timer" component={Countup} />
      <IndexRoute component={Countup} />
    </Route>
  </Router>,
  document.getElementById('app') // eslint-disable-line no-undef
);
