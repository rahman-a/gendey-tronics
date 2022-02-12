import constants from "../constants"


const listAllUsers = (state, action) => {
    switch(action.type){
        case constants.users.LIST_USERS_REQUEST: 
            return {loading:true, error:null} 
        case constants.users.LIST_USERS_SUCCESS: 
            return {loading:false, error:null, users:action.users, count:action.count} 
        case constants.users.LIST_USERS_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.users.LIST_USERS_RESET: 
            return {loading:false, error:null, users:null} 
        default: 
            return {...state}
    }
}


const deleteUser = (state, action) => {
    switch(action.type){
        case constants.users.DELETE_USER_REQUEST: 
            return {loading:true, error:null} 
        case constants.users.DELETE_USER_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.users.DELETE_USER_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.users.DELETE_USER_RESET: 
            return {loading:false, error:null, message:null} 
        default: 
            return {...state}
    }
}


const reducers = {
    listAllUsers,
    deleteUser
}

export default reducers 