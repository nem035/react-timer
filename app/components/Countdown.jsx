/*
eslint
  import/no-unresolved: "off",
  no-console: "off",
  import/no-extraneous-dependencies: "off"
*/
const React = require('react');
const Clock = require('Clock');
const CountdownForm = require('CountdownForm');
const Controls = require('Controls');

const {
  countdownStatuses: {
    CLEARED, RUNNING, PAUSED, INVALID,
  },
  statusToCSSClass,
  statusToText,
} = require('utils');

const {
  stringify,
} = JSON;

class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.handleStartCountdown = this.handleStartCountdown.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.timerInterval = this.timerInterval.bind(this);

    this.state = {
      seconds: 0,
      status: CLEARED,
    };
  }

  componentWillMount() {
    console.info('componentWillMount');
  }

  componentDidMount() {
    console.info('componentDidMount');
  }

  componentWillReceiveProps(props) {
    console.info(`componentWillReceiveProps: ${stringify(props)}`);
  }

  componentWillUpdate(nextProps, nextState) {
    console.info(`componentWillUpdate: ${stringify(nextProps)}, ${stringify(nextState)}`);
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
          console.error(`componentDidUpdate: ${INVALID} status ${newStatus}`);
      }
    }
  }

  componentWillUnmount() {
    console.info('componentWillUnmount');
  }

  timerInterval() {
    let { status, seconds } = this.state;
    seconds -= 1;
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
  }

  startTimer() {
    this.timer = setInterval(this.timerInterval, 1000);
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

  handleStartCountdown(seconds) {
    const status = RUNNING;
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
      case RUNNING:
      case PAUSED:
        return <Controls status={status} onStatusChange={this.handleStatusChange} />;
      default:
        console.error(`renderControlArea: ${INVALID} status ${status}`);
        return null;
    }
  }

  render() {
    const { seconds, status } = this.state;
    const text = statusToText(status);
    return (
      <div>
        <h1 className="page-title">
          Countdown
        </h1>
        <div className="countdown-label">
          <span className={`label label-${statusToCSSClass(status)}`}>
            {typeof text === 'string' ? text.toUpperCase() : text}
          </span>
        </div>
        <Clock seconds={seconds} status={status} />
        {this.renderControlArea()}
      </div>
    );
  }
}

module.exports = Countdown;
