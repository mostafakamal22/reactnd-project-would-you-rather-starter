import { GET_USERS } from "../actions/users"
import { SAVE_QUESTION, SAVE_QUESTION_ANSWER } from "../actions/questions"
import { CREATE_NEW_USER } from "../actions/users"


export default function users (state = {}, action) {
  switch(action.type) {
    case GET_USERS :
      return {
        ...state,
        ...action.users
      }
    
    case SAVE_QUESTION :
      return{
        ...state,
        [action.question.author]:{
          ...state[action.question.author],
          questions:state[action.question.author].questions.concat([action.question.id])
        }
      }

    case SAVE_QUESTION_ANSWER:
      return{
        ...state,
        [action.answer.authed]: {
          ...state[action.answer.authed],
          answers: {
            ...state[action.answer.authed].answers,
            [action.answer.question_id]: action.answer.selectedOption
          }
        }
      }

      case CREATE_NEW_USER:
        return{
          ...state,
          ...action.user
        }

    default :
      return state
  }
}