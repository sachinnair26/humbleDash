import React ,{Component} from 'react';
import {connect } from 'react-redux';
import LoginPresentational from '../Presentational/LoginPresentational';
import {UserLoginAction} from '../../Actions/UserLoginAction';
class LoginContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:localStorage.getItem("email"),
            password:localStorage.getItem("password"),
            spin:false
        }
        
    }
    componentDidMount(){
        var email = localStorage.getItem("email")
        var password = localStorage.getItem("password")
       if(email  && password){
        this.onButtonClick()
      }    
    }
   
   componentDidUpdate(prevProps,prevState){
       if(this.props.logged_in){
        this.props.history.push('/dashboard')
       }else if(this.props.logged_in === prevProps.logged_in && this.props.login_err !==prevProps.login_err ){
           alert(this.props.login_err)
           this.setState({spin:false})
       }
   }
    onChangeInput = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    onButtonClick = () =>{
        this.setState({spin:true})
        this.props.UserLoginAction(this.state.email,this.state.password);
    }
    
    render(){

        return (
            <LoginPresentational
               onChangeInput={this.onChangeInput} 
               onButtonClick={this.onButtonClick}
               spin={this.state.spin}
            />
        )
    }
}
const mapStateToProps = state =>({
logged_in:state.UserLoginReducer.logged_in,
login_err:state.UserLoginReducer.err
})
const mapActionToProps = {
UserLoginAction:UserLoginAction
}
export default connect(mapStateToProps,mapActionToProps)(LoginContainer)