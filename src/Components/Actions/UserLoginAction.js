import {USER_LOGIN, USER_LOGOUT} from '../ActionCreator';
import {auth,db} from '../../config';

export  function UserLoginAction(username,password){
    return (dispatch,getState) =>{
        auth.signInWithEmailAndPassword(username,password).then(user =>{
            if(user){
                localStorage.setItem('email',username);
                localStorage.setItem('password',password);
                var uid = user.user.uid
                db.ref("deviceDetail").child(user.user.uid).on("value",function(org){
                    var organisation = ""

                    org.forEach(getit =>{
                       organisation = getit.key
                    })
                    dispatch({
                        type:USER_LOGIN,
                        login_data:{
                            organisation:organisation,
                            logged_in:true,
                            uid:uid,
                            err:"",
                        }
                    })
                })
                
            }
        }).catch(function(err){
            dispatch({
                type:USER_LOGIN,
                        login_data:{
                            organisation:"",
                            uid:"",
                            logged_in:false,
                            err:err
                        }
            })
        })
    }
}


export function UserLogoutFunction(){
    return dispatch =>{
        auth.signOut().then(function(){
            localStorage.removeItem('password');
            localStorage.removeItem('email');
            dispatch({
                type:USER_LOGOUT,
            })
        })
    }
}