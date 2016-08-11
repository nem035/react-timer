const React = require('react');

const {
  floor,
} = Math;

const zeroPadIfNeeded = (x) => {
  if (x < 10) {
    return `0${x}`;
  }
  return `${x}`;
};

class Clock extends React.Component {

  formatSeconds(seconds) {
    const sec = zeroPadIfNeeded(seconds % 60);
    const min = zeroPadIfNeeded(floor(seconds / 60));

    return `${min}:${sec}`;
  }

  render() {
    const { seconds } = this.props;
    return (
      <div className="clock">
        <span className="clock-text">
          {this.formatSeconds(seconds)}
        </span>
      </div>
    );
  }
}

Clock.defaultProps = {
  seconds: 0,
};

Clock.propTypes = {
  seconds: React.PropTypes.number.isRequired,
};

module.exports = Clock;
