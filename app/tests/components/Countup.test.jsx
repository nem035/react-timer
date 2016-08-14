/*
eslint
  no-undef: "off",
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off"
*/
const expect = require('expect');
const { renderFactory } = require('testUtils');
const { CLEARED, RUNNING, PAUSED } = require('utils').clockStatuses;
const Countup = require('Countup');

const renderCountup = renderFactory(Countup);

describe('Countup', () => {
  it('should exist', () => {
    expect(Countup).toExist();
  });

  describe('handleStartTimer', () => {
    it('should set state to running and count up from 0', (done) => {
      const {
        instance: countup,
      } = renderCountup();

      countup.handleStartTimer(0);
      expect(countup.state.seconds).toBe(0);
      expect(countup.state.status).toBe(RUNNING);

      let start = 0;
      const end = 3;
      const interval = setInterval(() => {
        start += 1;
        expect(countup.state.status).toBe(RUNNING);
        if (start === end) {
          expect(countup.state.seconds).toBe(end);
          clearInterval(interval);
          done();
        } else {
          expect(countup.state.seconds).toBe(start);
        }
      }, 1001);
    });

    it('should pause countup on paused status', (done) => {
      const {
        instance: countup,
      } = renderCountup();

      countup.handleStartTimer(0);
      countup.handleStatusChange(PAUSED);

      setTimeout(() => {
        expect(countup.state.seconds).toBe(0);
        expect(countup.state.status).toBe(PAUSED);
        done();
      }, 1001);
    });

    it('should stop countup on cleared status', (done) => {
      const {
        instance: countup,
      } = renderCountup();

      countup.handleStartTimer(0);
      expect(countup.state.seconds).toBe(0);
      countup.handleStatusChange(CLEARED);

      setTimeout(() => {
        expect(countup.state.seconds).toBe(0);
        expect(countup.state.status).toBe(CLEARED);
        done();
      }, 1001);
    });

    it('should do nothing for invalid status', (done) => {
      const {
        instance: countup,
      } = renderCountup();

      countup.handleStartTimer(0);
      expect(countup.state.seconds).toBe(0);
      countup.handleStatusChange('something invalid');

      setTimeout(() => {
        expect(countup.state.seconds).toBe(1);
        expect(countup.state.status).toBe(RUNNING);
        done();
      }, 1001);
    });
  });
});
