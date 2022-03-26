import constants from '../constants'
import api from '../api'


const latestCalls = _ => async dispatch => {
    dispatch({type: constants.calls.LATEST_CALLS_REQUEST})

    try {
        const {data} = await api.calls.latest()
     
        dispatch({
            type:constants.calls.LATEST_CALLS_SUCCESS,
            calls:data.calls,
            count:data.count
        })
    } catch (error) {
        dispatch({
            type:constants.calls.LATEST_CALLS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const listCalls = query => async dispatch => {
    dispatch({type: constants.calls.LIST_CALLS_REQUEST})

    try {
        const {data} = await api.calls.index(query)
        dispatch({
            type:constants.calls.LIST_CALLS_SUCCESS,
            calls:data.calls,
            count:data.count
        })
    } catch (error) {
        dispatch({
            type:constants.calls.LIST_CALLS_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const toggleCall = id => async (dispatch, getState) => {
    dispatch({type: constants.calls.TOGGLE_CALL_REQUEST})

    try {
        const {data} = await api.calls.toggle(id)
        
        const {calls, count} = getState().listCalls 
        if(calls) {
            const updatedCalls = JSON.parse(JSON.stringify(calls))
            updatedCalls.forEach(call => {
                if(call._id === id) {
                    call.isDone  = !call.isDone
                }
            })
            dispatch({
                type:constants.calls.LIST_CALLS_SUCCESS,
                calls:updatedCalls,
                count
            })
        }
        
        dispatch({
            type:constants.calls.TOGGLE_CALL_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.calls.TOGGLE_CALL_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const deleteCall = id => async (dispatch, getState) => {
    dispatch({type: constants.calls.DELETE_CALL_REQUEST})

    try {
        const {data} = await api.calls.delete(id)
        
        const {calls, count} = getState().listCalls 
        if(calls) {
            let updatedCalls = JSON.parse(JSON.stringify(calls))
            updatedCalls = updatedCalls.filter(call => call._id !== id) 
            dispatch({
                type:constants.calls.LIST_CALLS_SUCCESS,
                calls:updatedCalls,
                count: count - 1
            })
        }
        
        dispatch({
            type:constants.calls.DELETE_CALL_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:constants.calls.DELETE_CALL_FAIL,
            payload:error.response && error.response.data.message
        })
    }
}

const action = {
    latestCalls,
    listCalls,
    toggleCall,
    deleteCall
}

export default action