const expect = require('expect');
const { renderFactory } = require('testUtils');

const Countdown = require('Countdown');
const renderCountdown = renderFactory(Countdown);

describe('Countdown', () => {
  it('should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleStartCountdown', () => {
    it('should set state to started and count down', (done) => {
      const countdown = renderCountdown();

      let start = 3;
      countdown.handleStartCountdown(start);

      expect(countdown.state.seconds).toBe(start);
      expect(countdown.state.status).toBe('started');

      setInterval(() => {
        start -= 1;
        if (start >= 0) {
          expect(countdown.state.seconds).toBe(start);
        } else {
          expect(countdown.state.seconds).toBe(0);
          done();
        }
      }, 1001);
    });
  });
});
