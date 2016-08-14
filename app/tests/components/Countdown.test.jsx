/*
eslint
  no-undef: "off",
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off"
*/
const expect = require('expect');
const { renderFactory } = require('testUtils');
const { CLEARED, RUNNING, PAUSED } = require('utils').clockStatuses;
const Countdown = require('Countdown');

const renderCountdown = renderFactory(Countdown);

describe('Countdown', () => {
  it('should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleStartTimer', () => {
    it('should set state to running and count down', (done) => {
      const {
        instance: countdown,
      } = renderCountdown();

      let start = 3;
      countdown.handleStartTimer(start);

      expect(countdown.state.seconds).toBe(start);
      expect(countdown.state.status).toBe(RUNNING);

      const interval = setInterval(() => {
        start -= 1;
        if (start === 0) {
          expect(countdown.state.seconds).toBe(0);
          expect(countdown.state.status).toBe(CLEARED);
          clearInterval(interval);
          done();
        } else {
          expect(countdown.state.seconds).toBe(start);
        }
      }, 1001);
    });

    it('should pause countdown on paused status', (done) => {
      const {
        instance: countdown,
      } = renderCountdown();

      const start = 3;
      countdown.handleStartTimer(start);
      countdown.handleStatusChange(PAUSED);

      setTimeout(() => {
        expect(countdown.state.seconds).toBe(start);
        expect(countdown.state.status).toBe(PAUSED);
        done();
      }, 1001);
    });

    it('should stop countdown on cleared status', (done) => {
      const {
        instance: countdown,
      } = renderCountdown();

      const start = 3;
      countdown.handleStartTimer(start);
      countdown.handleStatusChange(CLEARED);

      setTimeout(() => {
        expect(countdown.state.seconds).toBe(0);
        expect(countdown.state.status).toBe(CLEARED);
        done();
      }, 1001);
    });

    it('should do nothing for invalid status', (done) => {
      const {
        instance: countdown,
      } = renderCountdown();

      const start = 3;
      const somethingInvalid = 'something invalid';
      countdown.handleStartTimer(start);
      countdown.handleStatusChange(somethingInvalid);

      setTimeout(() => {
        expect(countdown.state.seconds).toBe(2);
        expect(countdown.state.status).toBe(RUNNING);
        done();
      }, 1001);
    });
  });
});
