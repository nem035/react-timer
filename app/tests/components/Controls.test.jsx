/* eslint no-undef: "off", import/no-unresolved: "off" */
const expect = require('expect');
const { renderFactory, jQueryNode } = require('testUtils');

const Controls = require('Controls');
const renderControls = renderFactory(Controls);

const { CLEARED, STARTED, PAUSED } = require('utils').countdownStatuses;

function jQueryNodeFromStatus(status) {
  const controls = renderControls({ status });
  return jQueryNode(controls);
}

describe('Controls', () => {
  it('should exist', () => {
    expect(Controls).toExist();
  });

  describe('render', () => {
    it('should render pause button when started', () => {
      const $el = jQueryNodeFromStatus(STARTED);
      const $pauseButton = $el.find('button.button-pause');
      expect($pauseButton.length).toBe(1);
    });

    it('should render start button when paused', () => {
      const $el = jQueryNodeFromStatus(PAUSED);
      const $startButton = $el.find('button.button-start');
      expect($startButton.length).toBe(1);
    });
  });
});
