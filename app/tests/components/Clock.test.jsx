/*
eslint
  no-undef: "off",
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off"
*/
const expect = require('expect');
const { renderFactory } = require('testUtils');
const Clock = require('Clock');

const renderClock = renderFactory(Clock);

const tests = [{
  seconds: 615,
  expected: '10:15',
}, {
  seconds: 61,
  expected: '01:01',
}];

describe('Clock', () => {
  it('should exist', () => {
    expect(Clock).toExist();
  });

  describe('formatSeconds', () => {
    it('should format seconds', () => {
      const {
        instance: clock,
      } = renderClock();
      tests.map((t) => {
        // eslint-disable-next-line no-param-reassign
        t.actual = clock.formatSeconds(t.seconds);
        return t;
      }).forEach(({ actual, expected }) => {
        expect(actual).toBe(expected);
      });
    });
  });

  describe('render', () => {
    it('should render clock', () => {
      const textSelector = '.clock-text';
      tests.forEach(({ seconds, expected }) => {
        const {
          node: $node,
        } = renderClock({ seconds }, true);
        const renderedText = $node.find(textSelector).text();
        expect(renderedText).toBe(expected);
      });
    });
  });
});
