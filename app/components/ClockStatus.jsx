/*
eslint
  import/no-unresolved: "off",
*/
const React = require('react');
const {
  clockStatusesArray,
  statusToText,
  statusToCSSClass,
} = require('utils');

function ClockStatus({ status }) {
  const text = statusToText(status);
  return (
    <div className="countdown-label">
      <span className={`label label-${statusToCSSClass(status)}`}>
        {typeof text === 'string' ? text.toUpperCase() : text}
      </span>
    </div>
  );
}

ClockStatus.propTypes = {
  status: React.PropTypes.oneOf(clockStatusesArray).isRequired,
};

module.exports = ClockStatus;
