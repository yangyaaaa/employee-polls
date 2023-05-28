export const GET_USERS ="GET_ALL_USERS";
export const SET_USER_ANSWER ="GET_USER_ANSWER";
export const UPDATE_USER_QUESTIONS ="UPDATE_USER_QUESTIONS";



export function getUsers(users){
    return{
        type: GET_USERS,
        users
    }
}
export function setUserAnswer(userId, pollId, answer){
    return{
        type: SET_USER_ANSWER,
        userId, pollId, answer
    }
}

export function updateUserQuestions (pollId, userId){
    return{
        type: UPDATE_USER_QUESTIONS,
        pollId, userId
    } 
}