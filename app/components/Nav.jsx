const React = require('react');
const { Link, IndexLink } = require('react-router');

function Nav() {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text app-name">
            React Timer
          </li>
          <li>
            <IndexLink
              to="/countup"
              activeClassName="active-link"
            >
              CountUp
            </IndexLink>
          </li>
          <li>
            <Link
              to="/countdown"
              activeClassName="active-link"
            >
              CountDown
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <span className="menu-text">
          Created by&nbsp;
          <a
            href="https://github.com/nem035"
            target="_blank"
            rel="noopener noreferrer"
          >
            nem035
          </a>
        </span>
      </div>
    </div>
  );
}

module.exports = Nav;
