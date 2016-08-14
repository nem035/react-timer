/*
eslint
  no-undef: "off",
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off"
*/
const expect = require('expect');
const { renderFactory } = require('testUtils');
const { RUNNING, PAUSED } = require('utils').clockStatuses;
const Controls = require('Controls');

const renderControls = renderFactory(Controls);

function getjQueryNodeUsingStatus(status) {
  return renderControls({ status }, true);
}

describe('Controls', () => {
  it('should exist', () => {
    expect(Controls).toExist();
  });

  describe('render', () => {
    it('should render pause button when started', () => {
      const {
        node: $node,
      } = getjQueryNodeUsingStatus(RUNNING);
      const $pauseButton = $node.find('button.button-pause');
      expect($pauseButton.length).toBe(1);
    });

    it('should render start button when paused', () => {
      const {
        node: $node,
      } = getjQueryNodeUsingStatus(PAUSED);
      const $startButton = $node.find('button.button-start');
      expect($startButton.length).toBe(1);
    });
  });
});
