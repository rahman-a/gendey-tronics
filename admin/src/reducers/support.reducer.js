import constants from "../constants";


const sendEmail = (state, action) => {
    const cases = {
        [constants.support.SEND_EMAIL_REQUEST]: 
        {
            isLoading: true,
            error:null
        },
        [constants.support.SEND_EMAIL_SUCCESS]: 
        {
            isLoading: false,
            error:null,
            message:action.payload
        },
        [constants.support.SEND_EMAIL_FAIL]: 
        {
            isLoading: false,
            error:action.payload,
        },
        [constants.support.SEND_EMAIL_RESET]: 
        {
            isLoading: false,
            error:null,
            message:null
        }
    }
    return cases[action.type] || {...state};
}


const listEmails = (state, action) => {
    const cases = {
        [constants.support.LIST_EMAILS_REQUEST]: 
        {
            isLoading: true,
            error:null,
            emails:null
        },
        [constants.support.LIST_EMAILS_SUCCESS]: 
        {
            isLoading: false,
            error:null,
            emails:action.emails,
            inbox:action.inbox
        },
        [constants.support.LIST_EMAILS_FAIL]: 
        {
            isLoading: false,
            error:action.payload,
            emails:null
        },
        [constants.support.LIST_EMAILS_RESET]: 
        {
            isLoading: false,
            error:null,
            emails:null,
            inbox:null
        }
    }
    return cases[action.type] || {...state};
}

const getEmail = (state, action) => {
    const cases = {
        [constants.support.GET_EMAIL_REQUEST]: 
        {
            isLoading: true,
            error:null
        },
        [constants.support.GET_EMAIL_SUCCESS]: 
        {
            isLoading: false,
            error:null,
            email:action.payload
        },
        [constants.support.GET_EMAIL_FAIL]: 
        {
            isLoading: false,
            error:action.payload,
        },
        [constants.support.GET_EMAIL_RESET]: 
        {
            isLoading: false,
            error:null,
            email:null
        }
    }
    return cases[action.type] || {...state};
}

const updateEmail = (state, action) => {
    const cases = {
        [constants.support.UPDATE_EMAIL_REQUEST]: 
        {
            isLoading: true,
            error:null
        },
        [constants.support.UPDATE_EMAIL_SUCCESS]: 
        {
            isLoading: false,
            error:null,
            isUpdated:true
        },
        [constants.support.UPDATE_EMAIL_FAIL]: 
        {
            isLoading: false,
            error:action.payload,
        },
        [constants.support.UPDATE_EMAIL_RESET]: 
        {
            isLoading: false,
            error:null,
            isUpdated:false
        }
    }
    return cases[action.type] || {...state};
}

const deleteEmail = (state, action) => {
    const cases = {
        [constants.support.DELETE_EMAIL_REQUEST]: 
        {
            isLoading: true,
            error:null
        },
        [constants.support.DELETE_EMAIL_SUCCESS]: 
        {
            isLoading: false,
            error:null,
            message:action.payload
        },
        [constants.support.DELETE_EMAIL_FAIL]: 
        {
            isLoading: false,
            error:action.payload,
        },
        [constants.support.DELETE_EMAIL_RESET]: 
        {
            isLoading: false,
            error:null,
            message:null
        }
    }
    return cases[action.type] || {...state};
}


const reducer = {
    sendEmail,
    listEmails,
    getEmail,
    updateEmail,
    deleteEmail
}

export default reducer;