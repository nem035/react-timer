/*
eslint
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off",
  no-console: "off"
*/
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
        console.error(`getButtonTemplateFromStatus: ${INVALID} status ${status}`);
        return null;
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
