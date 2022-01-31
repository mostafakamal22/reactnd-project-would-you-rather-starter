import { GET_QUESTIONS,
         SAVE_QUESTION ,
         SAVE_QUESTION_ANSWER}  from "../actions/questions"

export default function questions (state = {}, action) {
  switch(action.type) {
    case GET_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case SAVE_QUESTION :
      return {
        ...state,
        [action.question.id]:action.question
      }
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.answer.question_id]: {
          ...state[action.answer.question_id],
          [action.answer.selectedOption]: {
            ...state[action.answer.question_id][action.answer.selectedOption],
            votes: state[action.answer.question_id][action.answer.selectedOption].votes.concat([action.answer.authed])
          }
        }
      }
    default :
      return state
  }
}