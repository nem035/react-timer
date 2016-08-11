const React = require('react');
const Clock = require('Clock');
const CountdownForm = require('CountdownForm');

class Countdown extends React.Component {

  constructor(props) {
    super(props);

    this.handleSetCountdown = this.handleSetCountdown.bind(this);

    this.state = {
      seconds: 0,
    };
  }

  handleSetCountdown(seconds) {
    this.setState({
      seconds,
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
