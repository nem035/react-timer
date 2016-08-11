const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

const Clock = require('Clock');

const renderClock = (props = {}) => {
  return TestUtils.renderIntoDocument(<Clock {...props} />);
};

const jQueryNode = (clock) => {
  return $(ReactDOM.findDOMNode(clock));
};

const tests = [{
  totalSeconds: 615,
  expected: '10:15',
}, {
  totalSeconds: 61,
  expected: '01:01',
}];

describe('Clock', () => {

  it('should exist', () => {
    expect(Clock).toExist();
  });

  describe('formatSeconds', () => {
    it('should format totalSeconds', () => {
      const clock = renderClock();
      tests.map((t) => {
        t.actual = clock.formatSeconds(t.totalSeconds);
        return t;
      }).forEach(({ actual, expected }) => {
        expect(actual).toBe(expected);
      });
    });

  });

  describe('render', () => {
    it('should render clock', () => {
      const textSelector = '.clock-text';
      tests.forEach(({ totalSeconds, expected }) => {
        const clock = renderClock({ totalSeconds });
        const renderedText = jQueryNode(clock).find(textSelector).text();
        expect(renderedText).toBe(expected);
      });
    });
  });
});
