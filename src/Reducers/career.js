import ActionTypes from '../Actions/ActionTypes'

let initialState = {
    programList: [],
    streamList: [],
    courseDetail:[]
}

export function CareerReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.PROGRAMLIST_SUCCESS:
            return { ...state, error: '', programList: action.payload.resultData.programTypeListing, type: ActionTypes.PROGRAMLIST_SUCCESS }
        case ActionTypes.PROGRAMLIST_FAIL:
            return { ...state, error: action.message, type: ActionTypes.PROGRAMLIST_FAIL }
        case ActionTypes.PROGRAMSTREAM_SUCCESS:
            return { ...state, error: '', streamList: action.payload.resultData.stream_name == undefined ? [] : action.payload.resultData.stream_name, type: ActionTypes.PROGRAMSTREAM_SUCCESS }
        case ActionTypes.PROGRAMSTREAM_FAIL:
            return { ...state, error: action.message, type: ActionTypes.PROGRAMSTREAM_FAIL }
        case ActionTypes.COURSEDETAIL_SUCCESS:
            return { ...state, error: '', courseDetail: action.payload.resultData.courseDetail, type: ActionTypes.COURSEDETAIL_SUCCESS }
        case ActionTypes.COURSEDETAIL_FAIL:
            return { ...state, error: action.message, type: ActionTypes.COURSEDETAIL_FAIL }
        default: return state
    }
}