/* eslint import/no-unresolved: "off" */
const React = require('react');
const Clock = require('Clock');
const CountdownForm = require('CountdownForm');
const Controls = require('Controls');

const { CLEARED, STARTED, PAUSED, INVALID } = require('utils').countdownStatuses;

class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.handleStartCountdown = this.handleStartCountdown.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);

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
        case STARTED:
          this.startTimer();
          break;
        case CLEARED:
          this.clearTimer();
          break;
        case PAUSED:
          this.pauseTimer();
          break;
        default:
          throw new Error(`${INVALID} status ${status}`);
      }
    }
  }

  startTimer() {
    let { status, seconds } = this.state;
    this.timer = setInterval(() => {
      seconds = seconds - 1;
      if (seconds === 0) {
        status = CLEARED;
        this.setState({
          seconds,
          status,
        });
      } else {
        this.setState({
          seconds,
        });
      }
    }, 1000);
  }

  clearTimer() {
    this.pauseTimer();
    const seconds = 0;
    this.setState({
      seconds,
    });
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  handleStartCountdown(seconds) {
    const status = STARTED;
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
        return <CountdownForm onStartCountdown={this.handleStartCountdown} />;
      case STARTED:
      case PAUSED:
        return <Controls status={status} onStatusChange={this.handleStatusChange} />;
      default:
        throw new Error(`${INVALID} status ${status}`);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <Clock seconds={seconds} />
        {this.renderControlArea()}
      </div>
    );
  }
}

module.exports = Countdown;
