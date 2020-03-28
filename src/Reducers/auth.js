import ActionTypes from '../Actions/ActionTypes';

let initialState = {
    loggedIn: false,
}

export function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOG_IN_SUCCESS:
            return { ...state, loggedIn: true, error: '', user: action.payload.user, type: ActionTypes.LOG_IN_SUCCESS }
        case ActionTypes.LOG_IN_FAIL:
            return { ...state, loggedIn: false, error: action.message, user: {}, type: ActionTypes.LOG_IN_FAIL }
        default: return state;
    }
}

export function SignUpReducer(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SIGN_UP_SUCCESS:
            return { ...state, signedUp: action.payload, error: '', type: ActionTypes.SIGN_UP_SUCCESS }
        case ActionTypes.SIGN_UP_FAIL:
            return { ...state, signedUp: {}, error: action.message, type: ActionTypes.SIGN_UP_FAIL }
        default: return state;
    }
}


