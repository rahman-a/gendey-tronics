import constants from "../constants";
import api from '../api'


const listAllUsers = (query) => async(dispatch) => {
    dispatch({type: constants.users.LIST_USERS_REQUEST}) 

    try {
        const {data} = await api.users.index(query)
        dispatch({
            type:constants.users.LIST_USERS_SUCCESS,
            users:data.users,
            count:data.count
        })
    } catch (error) {
        dispatch({
            type:constants.users.LIST_USERS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const deleteUser = (id) => async(dispatch) => {
    dispatch({type: constants.users.DELETE_USER_REQUEST}) 

    try {
        const {data} = await api.users.delete(id)
        dispatch({
            type:constants.users.DELETE_USER_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.users.DELETE_USER_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}


const actions = {
    listAllUsers,
    deleteUser
}

export default actions