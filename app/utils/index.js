const countdownStatuses = {
  CLEARED: 'COUNTDOWN CLEARED',
  STARTED: 'COUNTDOWN STARTED',
  PAUSED: 'COUNTDOWN PAUSED',
  INVALID: 'INVALID',
};

const countdownStatusesArray = Object.keys(countdownStatuses)
  .map((key) => countdownStatuses[key]);

module.exports = {
  countdownStatuses,
  countdownStatusesArray,
};
