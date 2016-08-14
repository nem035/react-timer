/* eslint import/no-unresolved: "off" */
const React = require('react');
const { countdownStatuses, countdownStatusesArray } = require('utils');
const { CLEARED, STARTED, PAUSED, INVALID } = countdownStatuses;

class Controls extends React.Component {

  onStatusChangeFactory(status) {
    return () => {
      this.props.onStatusChange(status);
    };
  }

  getButtonTemplateFromStatus(status) {
    switch (status) {
      case PAUSED:
        return (
          <button
            className="button-start button primary"
            onClick={this.onStatusChangeFactory(STARTED)}
          >
            Start
          </button>);
      case STARTED:
        return (
          <button
            className="button-pause button secondary"
            onClick={this.onStatusChangeFactory(PAUSED)}
          >
            Pause
          </button>);
      default:
        throw new Error(`${INVALID} status ${status}`);
    }
  }

  render() {
    const { status } = this.props;
    return (
      <div className="controls">
        {this.getButtonTemplateFromStatus(status)}
        <button
          className="button-stop button alert hollow"
          onClick={this.onStatusChangeFactory(CLEARED)}
        >
          Clear
        </button>
      </div>
    );
  }
}

Controls.propTypes = {
  status: React.PropTypes.oneOf(countdownStatusesArray).isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
};

module.exports = Controls;
