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

  constructor(props) {
    super(props);
  }

  formatSeconds(totalSeconds) {
    const seconds = zeroPadIfNeeded(totalSeconds % 60);
    const minutes = zeroPadIfNeeded(floor(totalSeconds / 60));

    return `${minutes}:${seconds}`;
  }

  render() {
    const { totalSeconds } = this.props;
    return (
      <div className="clock">
        <span className="clock-text">
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    );
  }
}

Clock.defaultProps = {
  totalSeconds: 0
};

Clock.propTypes = {
  children: React.PropTypes.number.isRequired,
};

module.exports = Clock;
