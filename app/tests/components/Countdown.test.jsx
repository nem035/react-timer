/* eslint no-undef: "off", import/no-unresolved: "off" */
const expect = require('expect');
const { renderFactory } = require('testUtils');

const Countdown = require('Countdown');
const renderCountdown = renderFactory(Countdown);

const { CLEARED, STARTED } = require('utils').countdownStatuses;

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
      expect(countdown.state.status).toBe(STARTED);

      setInterval(() => {
        start -= 1;
        if (start >= 0) {
          expect(countdown.state.seconds).toBe(start);
        } else {
          expect(countdown.state.seconds).toBe(0);
          expect(countdown.state.status).toBe(CLEARED);
          done();
        }
      }, 1001);
    });
  });
});
