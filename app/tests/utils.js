const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

function renderFactory(Component) {
  return function render(props = {}) {
    return TestUtils.renderIntoDocument(<Component {...props} />);
  };
}

function jQueryNode(instance) {
  return $(ReactDOM.findDOMNode(instance));
}

module.exports = {
  renderFactory,
  jQueryNode,
};
