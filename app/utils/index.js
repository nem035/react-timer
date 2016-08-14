const clockStatuses = {
  CLEARED: 'STATUS_CLEARED',
  INVALID: 'STATUS_INVALID',
  PAUSED: 'STATUS_PAUSED',
  RUNNING: 'STATUS_RUNNING',
};

const clockStatusesArray = Object.keys(clockStatuses)
  .map((key) => clockStatuses[key]);

function statusToText(status) {
  switch (status) {
    case clockStatuses.CLEARED: return 'cleared';
    case clockStatuses.INVALID: return 'invalid';
    case clockStatuses.PAUSED: return 'paused';
    case clockStatuses.RUNNING: return 'running';
    default: return null;
  }
}

function statusToCSSClass(status) {
  const text = statusToText(status);
  switch (status) {
    case clockStatuses.CLEARED: return `${text} primary`;
    case clockStatuses.INVALID: return `${text} alert`;
    case clockStatuses.PAUSED: return `${text} warning`;
    case clockStatuses.RUNNING: return `${text} success`;
    default: return null;
  }
}

module.exports = {
  clockStatuses,
  clockStatusesArray,
  statusToText,
  statusToCSSClass,
};
