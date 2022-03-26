import constants from "../constants";
import api from "../api";

const getDashboardInfo = _ => async dispatch => {
    dispatch({type:constants.dashboard.DASHBOARD_INFO_REQUEST})

    try {
        const {data} = await api.dashboard.info()
        dispatch({
            type:constants.dashboard.DASHBOARD_INFO_SUCCESS,
            payload:data.info
        })
    } catch (error) {
        dispatch({
            type:constants.dashboard.DASHBOARD_INFO_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getLatestUsers = _ => async dispatch => {
    dispatch({type:constants.dashboard.LATEST_USERS_REQUEST})

    try {
        const {data} = await api.dashboard.users()
        dispatch({
            type:constants.dashboard.LATEST_USERS_SUCCESS,
            payload:data.users
        })
    } catch (error) {
        dispatch({
            type:constants.dashboard.LATEST_USERS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getLatestOrders = _ => async dispatch => {
    dispatch({type:constants.dashboard.LATEST_ORDERS_REQUEST})

    try {
        const {data} = await api.dashboard.orders()
        dispatch({
            type:constants.dashboard.LATEST_ORDERS_SUCCESS,
            payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:constants.dashboard.LATEST_ORDERS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getLatestEnrollments = _ => async dispatch => {
    dispatch({type:constants.dashboard.LATEST_ENROLLMENTS_REQUEST})

    try {
        const {data} = await api.dashboard.enrollments()
        dispatch({
            type:constants.dashboard.LATEST_ENROLLMENTS_SUCCESS,
            payload:data.enrollments
        })
    } catch (error) {
        dispatch({
            type:constants.dashboard.LATEST_ENROLLMENTS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const getLatestContacts = _ => async dispatch => {
    dispatch({type:constants.dashboard.LATEST_CONTACTS_INFO_REQUEST})

    try {
        const {data} = await api.dashboard.contacts()
        dispatch({
            type:constants.dashboard.LATEST_CONTACTS_INFO_SUCCESS,
            payload:data.info
        })
    } catch (error) {
        dispatch({
            type:constants.dashboard.LATEST_CONTACTS_INFO_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const actions = {
    getLatestContacts,
    getLatestEnrollments,
    getLatestOrders,
    getLatestUsers,
    getDashboardInfo
}

export default actions