import ActionTypes from './ActionTypes'
import { postAPI } from '../utils/Api'

export const signup = (endpoint, formData) => {
    return (dispatch, getState) => {
        postAPI(endpoint, formData)
            .then((response) => {
                if (response.status == 0) {
                    dispatch({ type: ActionTypes.SIGN_UP_FAIL, message: response.message });
                } else {
                    dispatch({ type: ActionTypes.SIGN_UP_SUCCESS, payload: response });
                }
            })
            .catch((errMsg) => {
                dispatch({ type: ActionTypes.SIGN_UP_FAIL, message: errMsg });
            })
    }
}

export const login = (endpoint, formData) => {
    return (dispatch, getState) => {
        postAPI(endpoint, formData)
            .then((response) => {
                if (response.status == 1 || response.status == 2) {
                    dispatch({ type: ActionTypes.LOG_IN_SUCCESS, payload: response });
                } else {
                    dispatch({ type: ActionTypes.LOG_IN_FAIL, message: response.message });
                }
            })
            .catch((errMsg) => {
                dispatch({ type: ActionTypes.LOG_IN_FAIL, message: errMsg });
            })
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.USER_LOGOUT });
    }
}

