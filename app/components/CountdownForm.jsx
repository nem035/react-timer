const React = require('react');

class CountDownForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      secondsString: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const { secondsString } = this.state;

    if (secondsString.length > 0) {
      this.setState({
        secondsString: '',
      });
      const seconds = parseInt(secondsString, 10);
      this.props.onStartCountDown(seconds);
    }
  }

  handleChange({ target }) {
    const secondsString = target.value;
    this.setState({
      secondsString,
    });
  }

  render() {
    const { secondsString } = this.state;
    return (
      <div>
        <form
          className="countdown-form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="number"
            min="0"
            max="9999999999"
            placeholder="Enter time in seconds"
            value={secondsString}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="button-start button success expanded"
            disabled={secondsString.length === 0 ? 'disabled' : ''}
          >
            Start
          </button>
        </form>
      </div>
    );
  }
}

CountDownForm.propTypes = {
  onStartCountDown: React.PropTypes.func.isRequired,
};

module.exports = CountDownForm;
