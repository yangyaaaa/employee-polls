export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const GET_AUTHED_USER = "GET_AUTHED_USER";


export function setAuthedUser(id){
    return{
        type: SET_AUTHED_USER,
        id
    }
}


export function getAuthedUser(user){
    return{
        type: GET_AUTHED_USER,
        user
    }
}

