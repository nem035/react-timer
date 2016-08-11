const expect = require('expect');
const { renderFactory, jQueryNode, simulateSubmit } = require('testUtils');

const CountdownForm = require('CountdownForm');
const renderCountdownForm = renderFactory(CountdownForm);

function generateTestData() {
  const onSetCountdown = expect.createSpy();
  const countdownForm = renderCountdownForm({ onSetCountdown });
  const $el = jQueryNode(countdownForm);

  return {
    onSetCountdown,
    countdownForm,
    $el,
  };
}

describe('CountdownForm', () => {

  it('should exist', () => {
    expect(CountdownForm).toExist();

    it('should call onSetCountdown if anything is entered', () => {
      const {
        onSetCountdown,
        countdownForm,
        $el,
      } = generateTestData();

      countdownForm.refs.secondsInput.value = '109';
      simulateSubmit($el.find('form').get(0));
      expect(onSetCountdown).toHaveBeenCalledWith(109);
    });

    it('should not call onSetCountdown if nothing is entered', () => {
      const {
        onSetCountdown,
        countdownForm,
        $el,
      } = generateTestData();

      countdownForm.refs.secondsInput.value = '';
      simulateSubmit($el.find('form').get(0));
      expect(onSetCountdown).toNotHaveBeenCalled();
    });
  });
});
