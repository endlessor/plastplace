import React from "react";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
var Translate = require('react-redux-i18n').Translate;

class LastPage extends React.Component {
  render() {
    return (
      <div className="landing-main">
        <div className="main-content">
          <div className="last-title">
            <Translate value="landing.last_title" />
          </div>
          <Link to="#" onClick={this.props.signup}>
            <MDBBtn
              className="landing-btn"
            >
              <Translate value="landing.last_signup" />
            </MDBBtn>
          </Link>
        </div>
        <div className="circle-side">
          <div className="green-circle-last" />
        </div>
      </div>
    );
  }
}

export default LastPage;
