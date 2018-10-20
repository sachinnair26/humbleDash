import React from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { auth } from "./config";
import { withRouter } from "react-router-dom";
import "./Login.css";
import { connect } from "react-redux";
import q from "../src/LoginLogo.png";
import createHistory from "history/createBrowserHistory";

const history = createHistory({ forceRefresh: true });

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    auth.signOut();
  }
  onButtonClick = () => {
    console.log(this.state);
    var that = this;
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user) {
        auth.onAuthStateChanged(function(user) {
          if (user !== null) {
            console.log("sucess");
            that.props.history.push("/dashboard");
          } else {
            console.log("fialed");
          }
        });
      })
      .catch(function(error) {
        alert(error.code);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
  render() {
    return (
      <div className="login-main">
        <h1>HumbleInnovations</h1>
        <div className="logo-login">
          <img src={q} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="login-second">
          <Input
            placeholder="E-mail"
            name="email"
            onChange={this.onChangeInput}
          />
          <Input
            placeholder="Password"
            name="password"
            onChange={this.onChangeInput}
          />
          <Button type="primary" onClick={this.onButtonClick}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
