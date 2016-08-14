/*
eslint
  import/no-unresolved: "off",
  no-console: "off",
  import/no-extraneous-dependencies: "off"
*/
const React = require('react');
const Clock = require('Clock');
const ClockStatus = require('ClockStatus');
const Controls = require('Controls');

const {
  clockStatuses: {
    CLEARED, RUNNING, PAUSED, INVALID,
  },
} = require('utils');

class Timer extends React.Component {

  constructor(props) {
    super(props);

    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.runTimerInterval = this.runTimerInterval.bind(this);

    this.state = {
      seconds: 0,
      status: CLEARED,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const newStatus = this.state.status;
    const oldStatus = prevState.status;

    if (newStatus !== oldStatus) {
      switch (newStatus) {
        case RUNNING:
          this.startTimer();
          break;
        case CLEARED:
          this.clearTimer();
          this.resetTimer();
          break;
        case PAUSED:
          this.clearTimer();
          break;
        default:
          console.error(`Countdown.componentDidUpdate: ${INVALID} status ${newStatus}`);
      }
    }
  }

  runTimerInterval() {
    let { seconds } = this.state;
    seconds += 1;
    this.setState({
      seconds,
    });
  }

  startTimer() {
    this.timer = setInterval(this.runTimerInterval, 1000);
  }

  clearTimer() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  resetTimer() {
    const seconds = 0;
    this.setState({
      seconds,
    });
  }

  handleStartTimer() {
    const status = RUNNING;
    const seconds = 0;
    this.setState({
      seconds,
      status,
    });
  }

  handleStatusChange(status) {
    this.setState({
      status,
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
            onClick={this.handleStartTimer}
          >
            Start
          </button>
        );
      case RUNNING:
      case PAUSED:
        return <Controls status={status} onStatusChange={this.handleStatusChange} />;
      default:
        console.error(`Timer.renderControlArea: ${INVALID} status ${status}`);
        return null;
    }
  }

  render() {
    const { seconds, status } = this.state;
    return (
      <div>
        <h1 className="page-title">
          Timer
        </h1>
        <ClockStatus status={status} />
        <Clock seconds={seconds} status={status} />
        {this.renderControlArea()}
      </div>
    );
  }
}

module.exports = Timer;
