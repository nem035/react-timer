/*
eslint
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off",
  react/jsx-filename-extension: "off"
*/
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

const {
  findDOMNode,
} = ReactDOM;

function findNode(instance, tojQuery) {
  return tojQuery ? $(findDOMNode(instance)) : findDOMNode(instance);
}

function renderFactory(Component) {
  return function render(props = {}, tojQuery = false) {
    const instance = TestUtils.renderIntoDocument(
      <Component {...props} />
    );
    const node = findNode(instance, tojQuery);
    return {
      instance,
      node,
    };
  };
}

function simulateSubmit(input) {
  return TestUtils.Simulate.submit(input);
}

function simulateChange(input, value) {
  TestUtils.Simulate.change(input, { target: { value } });
}

module.exports = {
  renderFactory,
  simulateSubmit,
  simulateChange,
};
