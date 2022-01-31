import { getUsers } from "./users";
import { getQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { _getUsers } from "../utils/_DATA";
import { _getQuestions } from "../utils/_DATA";
import { hideLoading, showLoading} from "react-redux-loading-bar";

function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function handleInitialData() {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        .then(({users, questions}) => {
          dispatch(getUsers(users))
          dispatch(setAuthedUser(null))
          dispatch(getQuestions(questions))
          dispatch(hideLoading())
        })
    }
}

