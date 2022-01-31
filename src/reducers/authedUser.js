import { SET_AUTHED_USER } from "../actions/authedUser";
import { GET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser (state = {}, action) {
    switch(action.type) {
      case SET_AUTHED_USER :
        return {
          "authed":action.user
        }
      case GET_AUTHED_USER :
        return {
          ...state,
          [action.question.id]:action.question
           
        }
      default :
        return state
    }
  }