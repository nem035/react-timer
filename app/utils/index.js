const countdownStatuses = {
  CLEARED: 'STATUS_CLEARED',
  INVALID: 'STATUS_INVALID',
  PAUSED: 'STATUS_PAUSED',
  RUNNING: 'STATUS_RUNNING',
};

const countdownStatusesArray = Object.keys(countdownStatuses)
  .map((key) => countdownStatuses[key]);

function statusToText(status) {
  switch (status) {
    case countdownStatuses.CLEARED: return 'cleared';
    case countdownStatuses.INVALID: return 'invalid';
    case countdownStatuses.PAUSED: return 'paused';
    case countdownStatuses.RUNNING: return 'running';
    default: return null;
  }
}

function statusToCSSClass(status) {
  const text = statusToText(status);
  switch (status) {
    case countdownStatuses.CLEARED: return `${text} primary`;
    case countdownStatuses.INVALID: return `${text} alert`;
    case countdownStatuses.PAUSED: return `${text} warning`;
    case countdownStatuses.RUNNING: return `${text} success`;
    default: return null;
  }
}

module.exports = {
  countdownStatuses,
  countdownStatusesArray,
  statusToText,
  statusToCSSClass,
};
