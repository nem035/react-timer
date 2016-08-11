const expect = require('expect');
const { renderFactory, jQueryNode } = require('testUtils');

const CountdownForm = require('CountdownForm');
const renderCountdownForm = renderFactory(CountdownForm);

describe('CountdownForm', () => {
  it('should exist', () => {
    expect(CountdownForm).toExist();
  });
});
