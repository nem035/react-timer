/*
eslint
  import/no-unresolved: "off",
  import/no-extraneous-dependencies: "off"
*/
const React = require('react');
const Nav = require('Nav');

function Main({ children }) {
  return (
    <div>
      <Nav />
      <div className="row">
        <div className="column small-centered medium-6 large-4">
          {children}
        </div>
      </div>
    </div>
  );
}

Main.propTypes = {
  children: React.PropTypes.element.isRequired,
};

module.exports = Main;
