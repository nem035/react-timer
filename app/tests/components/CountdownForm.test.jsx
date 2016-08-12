const expect = require('expect');
const { renderFactory, jQueryNode, simulateSubmit } = require('testUtils');

const CountdownForm = require('CountdownForm');
const renderCountdownForm = renderFactory(CountdownForm);

function generateTestData() {
  const onStartCountdown = expect.createSpy();
  const countdownForm = renderCountdownForm({ onStartCountdown });
  const $el = jQueryNode(countdownForm);

  return {
    onStartCountdown,
    countdownForm,
    $el,
  };
}

describe('CountdownForm', () => {

  it('should exist', () => {
    expect(CountdownForm).toExist();

    describe('onStartCountdown', () => {
      it('should call onStartCountdown if anything is entered', () => {
        const {
          onStartCountdown,
          countdownForm,
          $el,
        } = generateTestData();

        countdownForm.refs.secondsInput.value = '109';
        simulateSubmit($el.find('form').get(0));
        expect(onStartCountdown).toHaveBeenCalledWith(109);
      });

      it('should not call onStartCountdown if nothing is entered', () => {
        const {
          onStartCountdown,
          countdownForm,
          $el,
        } = generateTestData();

        countdownForm.refs.secondsInput.value = '';
        simulateSubmit($el.find('form').get(0));
        expect(onStartCountdown).toNotHaveBeenCalled();
      });
    });
  });
});
