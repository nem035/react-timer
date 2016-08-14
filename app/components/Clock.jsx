/*
eslint
  import/no-unresolved: "off"
*/
const React = require('react');
const { statusToCSSClass } = require('utils');

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
    const { seconds, status } = this.props;
    return (
      <div className={`clock clock-${statusToCSSClass(status)}`}>
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
  status: React.PropTypes.string.isRequired,
};

module.exports = Clock;
