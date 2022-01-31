export const GET_AUTHED_USER = "GET_AUTHED_USER"
export const SET_AUTHED_USER = "SET_AUTHED_USER"



export function setAuthedUser (user) {
    return {
      type: SET_AUTHED_USER,
      user,
    }
}

export function getAuthedUser () {
    return {
      type: GET_AUTHED_USER
    }
}

