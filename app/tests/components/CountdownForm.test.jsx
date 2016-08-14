/*
eslint
  no-undef: "off",
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off"
*/
const expect = require('expect');
const { renderFactory, simulateSubmit, simulateChange } = require('testUtils');
const CountdownForm = require('CountdownForm');

const renderCountdownForm = renderFactory(CountdownForm);

function generateTestData() {
  const onStartCountdown = expect.createSpy();
  const props = { onStartCountdown };
  return Object.assign({}, props, renderCountdownForm(props, true));
}

describe('CountdownForm', () => {
  it('should exist', () => {
    expect(CountdownForm).toExist();

    describe('onStartCountdown', () => {
      it('should call onStartCountdown if anything is entered', () => {
        const {
          node: $node,
          onStartCountdown,
        } = generateTestData();
        simulateChange($node.find('input').get(0), '109');
        simulateSubmit($node.find('form').get(0));
        expect(onStartCountdown).toHaveBeenCalledWith(109);
      });

      it('should not call onStartCountdown if nothing is entered', () => {
        const {
          node: $node,
          onStartCountdown,
        } = generateTestData();
        simulateChange($node.find('input').get(0), '');
        simulateSubmit($node.find('form').get(0));
        expect(onStartCountdown).toNotHaveBeenCalled();
      });
    });
  });
});
