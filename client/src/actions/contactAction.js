import constants from "../constants";
import api from '../api'

const createNewContact = (contact) => async (dispatch) => {
    dispatch({type:constants.contact.SEND_CONTACT_REQUEST}) 
    try {
        const {data} = await api.contact.send(contact)
        dispatch({type:constants.contact.SEND_CONTACT_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:constants.contact.SEND_CONTACT_FAIL, 
            payload:error.response && error.response.data.message
        })
    }
}

const contactAction = {
    newContact:createNewContact 
}

export default contactAction