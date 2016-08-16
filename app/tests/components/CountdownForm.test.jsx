/*
eslint
  no-undef: "off",
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off"
*/
const expect = require('expect');
const { renderFactory, simulateSubmit, simulateChange } = require('testUtils');
const CountDownForm = require('CountDownForm');

const renderCountDownForm = renderFactory(CountDownForm);

function generateTestData() {
  const onStartCountDown = expect.createSpy();
  const props = { onStartCountDown };
  return Object.assign({}, props, renderCountDownForm(props, true));
}

describe('CountDownForm', () => {
  it('should exist', () => {
    expect(CountDownForm).toExist();

    describe('onStartCountDown', () => {
      it('should call onStartCountDown if anything is entered', () => {
        const {
          node: $node,
          onStartCountDown,
        } = generateTestData();
        simulateChange($node.find('input').get(0), '109');
        simulateSubmit($node.find('form').get(0));
        expect(onStartCountDown).toHaveBeenCalledWith(109);
      });

      it('should not call onStartCountDown if nothing is entered', () => {
        const {
          node: $node,
          onStartCountDown,
        } = generateTestData();
        simulateChange($node.find('input').get(0), '');
        simulateSubmit($node.find('form').get(0));
        expect(onStartCountDown).toNotHaveBeenCalled();
      });
    });
  });
});
