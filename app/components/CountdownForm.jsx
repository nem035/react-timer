const React = require('react');

class CountdownForm extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { secondsInput } = this.refs;
    const strSeconds = secondsInput.value;

    if (strSeconds.length > 0) {
      secondsInput.value = '';
      const seconds = parseInt(strSeconds, 10);
      this.props.onSetCountdown(seconds);
    }
  }

  render() {
    return (
      <div>
        <form
          className="countdown-form"
          onSubmit={this.onSubmit}
          ref="form"
        >
          <input
            type="number"
            min="0"
            max="9999999999"
            placeholder="Enter time in seconds"
            ref="secondsInput"
          />
          <button
            type="submit"
            className="button expanded"
          >
            Start
          </button>
        </form>
      </div>
    );
  }
}

CountdownForm.propTypes = {
  onSetCountdown: React.PropTypes.func.isRequired,
};

module.exports = CountdownForm;
