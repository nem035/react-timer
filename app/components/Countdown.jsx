const React = require('react');
const Clock = require('Clock');
const CountdownForm = require('CountdownForm');

const STOPPED = 'stopped';
const STARTED = 'started';

class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.handleSetCountdown = this.handleSetCountdown.bind(this);

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
      const { state } = this;
      const seconds = state.seconds > 0 ? state.seconds - 1 : 0;
      this.setState({
        seconds,
      });
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  handleSetCountdown(seconds) {
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
        <CountdownForm onSetCountdown={this.handleSetCountdown} />
      </div>
    );
  }
}

module.exports = Countdown;
