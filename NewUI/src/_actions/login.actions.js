import axios from 'axios';
import { loginConstants } from '../_constants/login.constants';
const apiUrl = 'http://localhost:4000';


function userLoginRequest(data) {
    return { type: loginConstants.USERS_LOGIN_REQUEST, data };
}

function userLoginSuccess(data) {
    return { type: loginConstants.USERS_LOGIN_SUCCESS, data };
}

function userLoginFailure(data) {
    return { type: loginConstants.USERS_LOGIN_FAILURE, data };
}

function userLogoutRequest(data) {
    return { type: loginConstants.USERS_LOGOUT_REQUEST, data };
}


function login(body) {
    
    return (dispatch) => {
        dispatch(userLoginRequest(true));
        return axios.post(`${apiUrl}/api/user/login`, body)
            .then(function (response) {
                if(response.data.success){
                    dispatch(userLoginSuccess(response.data));
                } else {
                    dispatch(userLoginFailure(response.data.message));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

function logOut() {
    // dispatch(userLogoutRequest());
}

export const loginActions = {
    login,
    logOut
}