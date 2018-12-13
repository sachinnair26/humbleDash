import React, { Component } from 'react';
import {auth } from '../../config';
import {Spin,Input,Button} from 'antd';
import q from './LoginLogo.png';
import {AuthUser } from '../Actions/AuthState';
import './Login.css';
import {connect} from 'react-redux';
import createHistory from "history/createBrowserHistory";
const history = createHistory({ forceRefresh: true });

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:localStorage.getItem("email"),
            password:localStorage.getItem("password"),
            spin:false
        }
    }
    componentDidMount(){
      var email = localStorage.getItem("email")
      var password = localStorage.getItem("password")
      console.log(email,password)
     if(email === null && password ===null){
       this.onButtonClick();
     }
      
     
    }
    onChangeInput = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    onButtonClick=()=>{
        localStorage.setItem("email",this.state.email)
        localStorage.setItem("password",this.state.password)
        this.setState({spin:true})
        var that = this
        auth.signInWithEmailAndPassword(this.state.email,this.state.password).then(function(user){
            if(user){
                that.props.AuthUser() //when user signs in it is directed to /dashboard
                localStorage.setItem("user",user)
                that.props.history.push("/dashboard") 
            }
        }).catch(function(error){
            alert(error)
            that.setState({spin:false})
        })
    }
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
    )
  }
}
const mapActionToProps = {
AuthUser:AuthUser
}
export default connect(null,mapActionToProps)(Login)