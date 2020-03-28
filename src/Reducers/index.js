import { AuthReducer } from './auth';
import { SignUpReducer } from './auth';
import { CareerReducer } from './career';
import { FilterReducer } from './filter';
import { combineReducers } from "redux";
import ActionTypes from '../Actions/ActionTypes';

const appReducer = combineReducers({
  AuthReducer: AuthReducer,
  SignUpReducer: SignUpReducer,
  CareerReducer: CareerReducer,
  FilterReducer: FilterReducer
})

const rootReducer = (state, action) => {
  if (action.type == ActionTypes.USER_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;