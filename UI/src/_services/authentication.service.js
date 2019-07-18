import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../_helpers';
const config = {
    apiUrl: 'http://localhost:4000'
};
export const authenticationService = {
    login,
    logout,
    currentUserValue
};

function login(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/api/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    console.log('Log Out');
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // currentUserSubject.next(null);
}

function currentUserValue(){
    return JSON.parse(localStorage.getItem('currentUser'));
}
