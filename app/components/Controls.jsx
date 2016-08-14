/*
eslint
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off",
  no-console: "off"
*/
const React = require('react');
const { clockStatuses, clockStatusesArray } = require('utils');

const { CLEARED, RUNNING, PAUSED, INVALID } = clockStatuses;

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
            className="button-start button success"
            onClick={this.onStatusChangeFactory(RUNNING)}
          >
            Start
          </button>);
      case RUNNING:
        return (
          <button
            className="button-pause button warning"
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
          className="button-stop button alert"
          onClick={this.onStatusChangeFactory(CLEARED)}
        >
          Clear
        </button>
      </div>
    );
  }
}

Controls.propTypes = {
  status: React.PropTypes.oneOf(clockStatusesArray).isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
};

module.exports = Controls;
