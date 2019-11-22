import React from "react";
import PropTypes from "prop-types";

const InputGroupTitle = ({ title }) => (
  <div className="mt-5 pt-2">
    <span className="main-color font-weight-bold" style={{ fontSize: "18px" }}>
      {title}
    </span>
  </div>
);

InputGroupTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default InputGroupTitle;
