import {AUTH_USER} from '../ActionCreators/ActionCreators';
import {auth} from '../../config';
var user = null
export  function AuthUser(){
    return dispatch => {
      auth.onAuthStateChanged(function(userdec) {
        if (userdec) {
          user = userdec
          dispatch({
            type: AUTH_USER,
            user
          });
          
        }
        else{    
          dispatch({
            type: AUTH_USER,
            user
          });
        }
      });
    };
}

export function signOut(){
  return dispatch =>{
    auth.signOut().then(function() {
    user = null
    }).catch(function(error) {
      console.log(error,"error")
    }).then(dispatch({
      type: AUTH_USER,
      user
    }))

  }
  
}