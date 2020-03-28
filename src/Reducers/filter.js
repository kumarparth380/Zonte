import ActionTypes from '../Actions/ActionTypes'

let initialState = {
    stateFilterList: [],
    serviceFilterList: []
}

export function FilterReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.STATELIST_SUCCESS:
            return { ...state, error: '', stateFilterList: action.payload.resultData.state, type: ActionTypes.STATELIST_SUCCESS }
        case ActionTypes.STATELIST_FAIL:
            return { ...state, error: action.message, type: ActionTypes.STATELIST_FAIL }
        case ActionTypes.SERVICELIST_SUCCESS:
            return { ...state, error: '', serviceFilterList: action.payload.resultData.service, type: ActionTypes.SERVICELIST_SUCCESS }
        case ActionTypes.SERVICELIST_FAIL:
            return { ...state, error: action.message, type: ActionTypes.SERVICELIST_FAIL }
        default: return state
    }
}