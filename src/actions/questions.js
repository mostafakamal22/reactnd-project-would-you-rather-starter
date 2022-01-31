import { _saveQuestion } from "../utils/_DATA";
import { _saveQuestionAnswer } from "../utils/_DATA";
import { hideLoading, showLoading } from "react-redux-loading-bar";
export const GET_QUESTIONS ="GET_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_QUESTION_ANSWER= "SAVE_QUESTION_ANSWER"


export function getQuestions (questions) {
    return {
      type: GET_QUESTIONS,
      questions,
    }
}


function saveQuestion (question) {
  return {
    type: SAVE_QUESTION,
    question
  }
}

export function handleSaveQuestion (info) {
  return (dispatch) => {
    dispatch(showLoading())
    return _saveQuestion(info)
      .then((question) => dispatch(saveQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

function saveQuestionAnswer (answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    answer
  }
}

export function handleSaveQuestionAnswer (answer) {
  return (dispatch) => {
    
    dispatch(showLoading())
    return _saveQuestionAnswer(answer)
      .then(dispatch(saveQuestionAnswer(answer)))
      .then(() => dispatch(hideLoading()))
  }
}

