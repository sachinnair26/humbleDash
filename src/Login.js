import React from "react";
import PropTypes from "prop-types";
import { Input, Button, Spin } from "antd";
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
      password: "",
      spin: false
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
    //Login with email and password (firebase login)
    this.setState({ spin: true });
    var that = this;
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(user) {
        auth.onAuthStateChanged(function(user) {
          if (user !== null) {
            that.props.history.push("/dashboard");
          } else {
            console.log("fialed");
          }
        });
      })
      .catch(function(error) {
        that.setState({ spin: false });
        alert(error.code);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        {this.state.spin ? (
          <Spin style={{ alignSelf: "center" }} />
        ) : (
          <div className="login-main">
            <div className="user-initials">
              {" "}
              {/*To get Rid of user credentials delete this div*/}
              <h3>Email:aimskochi@gmail.com</h3>
              <h3>Password:aimskochi</h3>
            </div>
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
        )}
      </div>
    );
  }
}

export default withRouter(Login);
