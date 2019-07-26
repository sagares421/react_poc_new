import { loginConstants } from '../_constants';

export function login(state = {}, action) {
  switch (action.type) {
    case loginConstants.USERS_LOGIN_REQUEST:
      return {
        loading: action.data
      };
    case loginConstants.USERS_LOGIN_SUCCESS:
      return {
        user: action.data
      };
    case loginConstants.USERS_LOGIN_FAILURE:
      return {
        error: action.data
      };
    case loginConstants.USERS_LOGOUT_REQUEST:
      return {
        user: null
      };
    default:
      return state
  }
}