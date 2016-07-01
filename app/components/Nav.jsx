const React = require('react');
const { Link, IndexLink } = require('react-router');

function Nav() {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">
            React Timer
          </li>
          <li>
            <IndexLink
              to="/"
              activeClassName="active"
            >
              Timer
            </IndexLink>
          </li>
          <li>
            <Link
              to="/"
              activeClassName="active"
            >
              Countdown
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <p className="menu-text">
          Created by <a href="https://github.com/nem035" target="_blank">nem035</a>
        </p>
      </div>
    </div>
  );
}

module.exports = Nav;
