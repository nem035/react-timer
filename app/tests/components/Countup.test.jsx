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

  describe('handleStartCountup', () => {
    it('should set state to running and count up from 0', (done) => {
      const {
        instance: timer,
      } = renderCountup();

      timer.handleStartCountup();
      expect(timer.state.seconds).toBe(0);
      expect(timer.state.status).toBe(RUNNING);

      let start = 0;
      setTimeout(() => {
        start += 1;
        expect(timer.state.seconds).toBe(start);
        done();
      }, 1001);
    });

    it('should pause timer on paused status', (done) => {
      const {
        instance: timer,
      } = renderCountup();

      timer.handleStartCountup();
      timer.handleStatusChange(PAUSED);

      setTimeout(() => {
        expect(timer.state.seconds).toBe(0);
        expect(timer.state.status).toBe(PAUSED);
        done();
      }, 1001);
    });

    it('should stop timer on cleared status', (done) => {
      const {
        instance: timer,
      } = renderCountup();

      timer.handleStartCountup();
      timer.handleStatusChange(CLEARED);

      setTimeout(() => {
        expect(timer.state.seconds).toBe(0);
        expect(timer.state.status).toBe(CLEARED);
        done();
      }, 1001);
    });

    it('should do nothing for invalid status', (done) => {
      const {
        instance: timer,
      } = renderCountup();

      timer.handleStartCountup();
      timer.handleStatusChange('something invalid');

      setTimeout(() => {
        expect(timer.state.seconds).toBe(1);
        expect(timer.state.status).toBe(RUNNING);
        done();
      }, 1001);
    });
  });
});
