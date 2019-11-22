import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoginModal from "../../components/Modals/LoginModal";
import { userLoginRequest, setLoginStatus } from "../../actions/user";

const Login = props => (
  <LoginModal
    isOpen={props.isOpen}
    toggle={props.toggle}
    onClickSignUp={props.onClickSignUp}
    onClickForgotPassword={props.onClickForgotPassword}
    logIn={props.logIn}
    user={props.user}
    setLoginStatus={props.setLoginStatus}
  />
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logIn: userInfo => userLoginRequest(userInfo),
      setLoginStatus: status => setLoginStatus(status)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
