const React = require('react');
const Clock = require('Clock');

function Countdown() {
  return <div><Clock totalSeconds={65}/></div>;
}

module.exports = Countdown;
