import constants from "../constants";

const latestCalls = (state= {calls:[]}, action) => {
    const cases = {
        [constants.calls.LATEST_CALLS_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.calls.LATEST_CALLS_SUCCESS]: 
        {
            loading:false,
            error:null,
            calls:action.calls,
            count:action.count
        },
        [constants.calls.LATEST_CALLS_FAIL]: 
        {
            loading:true,
            error:action.payload
        },
        [constants.calls.LATEST_CALLS_RESET]: 
        {
            loading:false,
            error:null,
            calls:null,
            count:null
        }
    }

    return cases[action.type] || {...state}
}

const listCalls = (state, action) => {
    const cases = {
        [constants.calls.LIST_CALLS_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.calls.LIST_CALLS_SUCCESS]: 
        {
            loading:false,
            error:null,
            calls:action.calls,
            count:action.count
        },
        [constants.calls.LIST_CALLS_FAIL]: 
        {
            loading:false,
            error:action.payload
        },
        [constants.calls.LIST_CALLS_RESET]: 
        {
            loading:false,
            error:null,
            calls:null,
            count:null
        }
    }

    return cases[action.type] || {...state}
}

const toggleCall = (state, action) => {
    const cases = {
        [constants.calls.TOGGLE_CALL_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.calls.TOGGLE_CALL_SUCCESS]: 
        {
            loading:false,
            error:null,
            message:action.payload,
        },
        [constants.calls.TOGGLE_CALL_FAIL]: 
        {
            loading:true,
            error:action.payload
        },
        [constants.calls.TOGGLE_CALL_RESET]: 
        {
            loading:false,
            error:null,
            message:null,
        }
    }

    return cases[action.type] || {...state}
}

const deleteCall = (state, action) => {
    const cases = {
        [constants.calls.DELETE_CALL_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.calls.DELETE_CALL_SUCCESS]: 
        {
            loading:false,
            error:null,
            message:action.payload,
        },
        [constants.calls.DELETE_CALL_FAIL]: 
        {
            loading:true,
            error:action.payload
        },
        [constants.calls.DELETE_CALL_RESET]: 
        {
            loading:false,
            error:null,
            message:null,
        }
    }

    return cases[action.type] || {...state}
}

const reducer = {
    latestCalls,
    listCalls,
    toggleCall,
    deleteCall
}

export default reducer