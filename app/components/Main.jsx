const React = require('react');
const Nav = require('Nav');

function Main({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}

Main.propTypes = {
  children: React.PropTypes.element.isRequired,
};

module.exports = Main;
