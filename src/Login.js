import React from 'react'
import PropTypes from 'prop-types'
import {Input,Button} from 'antd';
import {auth} from './config';
import {withRouter} from 'react-router-dom';
import './Login.css';
import {connect} from 'react-redux';
import createHistory from "history/createBrowserHistory"

const history = createHistory({forceRefresh:true})
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      authenticated:false,
      user:'',

    }
  }
  componentDidMount(){
    auth.onAuthStateChanged(function(user) {
      if(user){
        console.log(user)
        var link = user.email.split('@')['0']
        console.log(link)
        history.push(link)    
      }
      else{
        alert("Valid credentials needed")
      }
  })
  }
 
  onButtonClick(){
    console.log(this.state.email,this.state.password)
    var that = this
  auth.signInWithEmailAndPassword(this.state.email,this.state.password).catch(function(error) {
    // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  that.setState({authenticated:true})
  console.log('unable',error.message)
      
  })
  
  

  }
  onChangeemail(f){
    this.setState({email:f.target.value})
  }
  onChangepassword(e){
    this.setState({password:e.target.value})
  }
  render () {
   
    return(
      <div className='login' style={{backgroundImage:'url('+require('./header.jpg')+')'}}>
      <Input className='email' placeholder="email" onChange={this.onChangeemail.bind(this)}/>
      <Input className='password' placeholder='password' onChange={this.onChangepassword.bind(this)}/>
      <Button className='button' type='primary' onClick={this.onButtonClick.bind(this)}>LogIn</Button>
      </div>
    )

  }
}

export default withRouter(connect()(Login));
