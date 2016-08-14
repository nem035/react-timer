/*
eslint
  import/no-unresolved: "off",
  no-console: "off",
  import/no-extraneous-dependencies: "off"
*/
const React = require('react');
const Controls = require('Controls');
const Timer = require('Timer');

const {
  clockStatuses: {
    CLEARED, RUNNING, PAUSED, INVALID,
  },
} = require('utils');

class Countup extends Timer {

  constructor(props) {
    super(props);

    this.runTimerInterval = this.runTimerInterval.bind(this);
  }

  runTimerInterval() {
    let { seconds } = this.state;
    seconds += 1;
    this.setState({
      seconds,
    });
  }

  renderControlArea() {
    const { status } = this.state;
    switch (status) {
      case CLEARED:
        return (
          <button
            type="button"
            className="button-start button success expanded"
            onClick={() => {
              this.handleStartTimer(0);
            }}
          >
            Start
          </button>
        );
      case RUNNING:
      case PAUSED:
        return <Controls status={status} onStatusChange={this.handleStatusChange} />;
      default:
        console.error(`Countup.renderControlArea: ${INVALID} status ${status}`);
        return null;
    }
  }
}

module.exports = Countup;
