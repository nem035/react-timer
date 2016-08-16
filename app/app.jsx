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
const CountDown = require('CountDown');
const CountUp = require('CountUp');

// load foundation
$(document).foundation(); // eslint-disable-line no-undef

// load styles
require('style!css!sass!applicationStyles');

// DOM Rendering
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="countdown" component={CountDown} title={'Count Down'} />
      <Route path="countup" component={CountUp} title={'Count Up'} />
      <IndexRoute component={CountUp} />
    </Route>
  </Router>,
  document.getElementById('app') // eslint-disable-line no-undef
);
