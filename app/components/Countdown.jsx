const React = require('react');
const Clock = require('Clock');
const CountdownForm = require('CountdownForm');

const STOPPED = 'stopped';
const STARTED = 'started';

class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.handleStartCountdown = this.handleStartCountdown.bind(this);

    this.state = {
      seconds: 0,
      status: STOPPED,
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
        case STOPPED:
          this.stopTimer();
          break;
        default:
          break;
      }
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      const seconds = this.state.seconds - 1;
      this.setState({
        seconds,
      });
      if (seconds === 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  handleStartCountdown(seconds) {
    const status = STARTED;
    this.setState({
      seconds,
      status,
    });
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <Clock seconds={seconds} />
        <CountdownForm onStartCountdown={this.handleStartCountdown} />
      </div>
    );
  }
}

module.exports = Countdown;
