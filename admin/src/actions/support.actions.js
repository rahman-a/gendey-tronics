import constants from "../constants";
import api from "../api";


const sendEmail = (email, isSentEmailsOpen) => async (dispatch, getState) => {
    dispatch({
        type: constants.support.SEND_EMAIL_REQUEST
    });
    try {
        const {data} = await api.support.send(email);
        if(isSentEmailsOpen) {
            const {emails} = getState().listEmails 
            if(emails) {
                let copiedEmails = JSON.parse(JSON.stringify(emails))
                copiedEmails = [data.email, ...copiedEmails]
                dispatch({
                    type:constants.support.LIST_EMAILS_SUCCESS,
                    payload: copiedEmails
                });
            }
        }
        dispatch({
            type: constants.support.SEND_EMAIL_SUCCESS,
            payload:data.message
        });
    } catch (error) {
        dispatch({
            type: constants.support.SEND_EMAIL_FAIL,
            payload: error.response && error.response.data.message
        });
    }
}

const listEmails = query => async dispatch => {
    dispatch({
        type: constants.support.LIST_EMAILS_REQUEST
    });
    try {
        const {data} = await api.support.index(query);
        dispatch({
            type: constants.support.LIST_EMAILS_SUCCESS,
            emails:data.emails,
            inbox:data.inbox
        });
    } catch (error) {
        dispatch({
            type: constants.support.LIST_EMAILS_FAIL,
            payload: error.response && error.response.data.message
        });
    }
}

const getEmail = id => async dispatch => {
    dispatch({
        type: constants.support.GET_EMAIL_REQUEST
    });
    try {
        const {data} = await api.support.getOne(id);
        dispatch({
            type: constants.support.GET_EMAIL_SUCCESS,
            payload:data.email
        });
    } catch (error) {
        dispatch({
            type: constants.support.GET_EMAIL_FAIL,
            payload: error.response && error.response.data.message
        });
    }
}

const updateEmail = (id, email) => async (dispatch, getState) => {
    dispatch({
        type: constants.support.UPDATE_EMAIL_REQUEST
    });
    try {
        const {data} = await api.support.update(id, email);
        
        if(email.isRead) {
            const {emails, inbox} = getState().listEmails 
            if(emails) {
                const copiedEmails = JSON.parse(JSON.stringify(emails))
                const index = copiedEmails.findIndex(e => e._id === id)
                if(index > -1) {
                    copiedEmails[index].isRead = true
                }
                dispatch({
                    type:constants.support.LIST_EMAILS_SUCCESS,
                    emails: copiedEmails,
                    inbox: inbox > 0 && inbox - 1
                });
            }
        }
        dispatch({
            type: constants.support.GET_EMAIL_SUCCESS,
            payload:data.email
        });
        dispatch({
            type: constants.support.UPDATE_EMAIL_SUCCESS,
            payload:data.message
        });
    } catch (error) {
        dispatch({
            type: constants.support.UPDATE_EMAIL_FAIL,
            payload: error.response && error.response.data.message
        });
    }
}

const deleteEmail = id => async (dispatch, getState) => {
    dispatch({
        type: constants.support.DELETE_EMAIL_REQUEST
    });
    try {
        const {data} = await api.support.delete(id);
        const {emails, inbox} = getState().listEmails
        if(emails) {
            const copiedEmails = JSON.parse(JSON.stringify(emails))
            const index = copiedEmails.findIndex(e => e._id === id)
            if(index !== -1) {
                copiedEmails.splice(index, 1)
            }
            dispatch({
                type:constants.support.LIST_EMAILS_SUCCESS,
                emails: copiedEmails,
                inbox
            });
            dispatch({
                type: constants.support.GET_EMAIL_RESET,
            });
        }
        dispatch({
            type: constants.support.DELETE_EMAIL_SUCCESS,
            payload:data.message
        });
    } catch (error) {
        dispatch({
            type: constants.support.DELETE_EMAIL_FAIL,
            payload: error.response && error.response.data.message
        });
    }
}

const actions = {
    sendEmail,
    listEmails,
    getEmail,
    updateEmail,
    deleteEmail
}

export default actions;