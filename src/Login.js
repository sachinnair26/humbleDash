import React from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { auth } from "./config";
import { withRouter } from "react-router-dom";
import "./Login.css";
import { connect } from "react-redux";
import createHistory from "history/createBrowserHistory";

const history = createHistory({ forceRefresh: true });
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onButtonClick() {
    this.props.history.push("/dashboard");
  }
  render() {
    return (
      <div className="loginBack">
        <div className="login" onClick={this.onButtonClick.bind(this)}>
          Click to View the data
        </div>
        ;
      </div>
    );
  }
}

export default Login;
