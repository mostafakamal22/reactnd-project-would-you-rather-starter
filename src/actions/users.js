import { _createNewUser } from "../utils/_DATA"
import { hideLoading, showLoading } from "react-redux-loading-bar" 
export const GET_USERS = "GET_USERS"
export const CREATE_NEW_USER = "CREATE_NEW_USER"

export function getUsers(users) {
    return{
        type: GET_USERS,
        users
    }
}



function createNewUser(user) {
    return{
        type: CREATE_NEW_USER,
        user
    }
}

export function handleCreateNewUser(user){
    return (dispatch) => {
        dispatch(showLoading())
        return _createNewUser(user)
        .then((user) => dispatch(createNewUser(user)))
        .then(() => dispatch(hideLoading()))
    }
}

