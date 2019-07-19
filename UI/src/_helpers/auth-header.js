export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    if (user && user.token) {
        return { 'Authorization': user.token,'Content-Type': 'application/json' };
    } else {
        return {};
    }
}