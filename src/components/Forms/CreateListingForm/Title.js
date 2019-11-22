import React from "react";
var Translate = require('react-redux-i18n').Translate;

const Title = props => (
  <div className="container text-center">
    <div className="create-listing-title p-5">
      <h3><Translate value="create_listing.title" /></h3>
    </div>
  </div>
);

export default Title;
