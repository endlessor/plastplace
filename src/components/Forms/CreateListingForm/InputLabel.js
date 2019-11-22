import React from "react";
import PropTypes from "prop-types";

const InputLabel = ({ label }) => (
  <div className="mt-4 mb-1">
    <h6
      className="font-weight-bold"
      style={{ color: "#222222", fontSize: "16px" }}
    >
      {label}
    </h6>
  </div>
);

InputLabel.propTypes = {
  label: PropTypes.string.isRequired
};

export default InputLabel;
