/*
eslint
  import/no-unresolved: "off",
  no-console: "off",
  import/no-extraneous-dependencies: "off"
*/
const React = require('react');
const Clock = require('Clock');
const ClockStatus = require('ClockStatus');
const {
  clockStatuses: {
    CLEARED, RUNNING, PAUSED, INVALID,
  },
  clockStatusesArray,
} = require('utils');

const {
  stringify,
} = JSON;

function warnInvalidStatus(method, status) {
  console.warn(`${method}: ${INVALID} status ${status}`);
}

class Timer extends React.Component {

  constructor(props) {
    super(props);

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleStartTimer = this.handleStartTimer.bind(this);

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
    console.info(`componentDidUpdate: ${stringify(prevProps)}, ${stringify(prevState)}`);
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
          warnInvalidStatus('Timer.componentDidUpdate', newStatus);
      }
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  handleStartTimer(seconds) {
    if (typeof seconds === 'number' && seconds > -1) {
      const status = RUNNING;
      this.setState({
        seconds,
        status,
      });
    } else {
      console.warn(`Timer.handleStartTimer: invalid seconds value "${seconds}"`);
    }
  }

  handleStatusChange(status) {
    if (clockStatusesArray.includes(status)) {
      this.setState({
        status,
      });
    } else {
      warnInvalidStatus('Timer.handleStatusChange', status);
    }
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

  render() {
    const { seconds, status } = this.state;
    return (
      <div>
        <h1 className="page-title">
          {this.props.title}
        </h1>
        <ClockStatus status={status} />
        <Clock seconds={seconds} status={status} />
        {this.renderControlArea()}
      </div>
    );
  }
}

Timer.defaultProps = {
  title: 'Timer',
};

Timer.propTypes = {
  title: React.PropTypes.string,
};

module.exports = Timer;
