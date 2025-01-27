import PropTypes from "prop-types";
import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>Cancel</button>
        <br />
        {props.children}
        <br />
      </div>
      <br />
    </>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default Togglable;
