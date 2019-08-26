import React from 'react';
import '../index.css';
import q from './LoginLogo.png';
import {Spin,Input,Button} from 'antd';

const LoginPresentational = ({
    onChangeInput,
    onButtonClick,
    spin,
    }) =>{
    return(
        <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        {spin ? (
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
             onChange={onChangeInput}
              />
              <Input type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeInput}
              />
              <Button type="primary" 
             onClick={onButtonClick}
            >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    )
}
export default LoginPresentational