import constants from "../constants";

const sendContactReducer = (state, action) => {
    switch(action.type){
        case constants.contact.SEND_CONTACT_REQUEST: 
            return {loading:true, error:null}
        case constants.contact.SEND_CONTACT_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case constants.contact.SEND_CONTACT_FAIL: 
            return {loading:false, error:action.payload} 
        case constants.contact.SEND_CONTACT_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

const contactReducer  = {
    newContact:sendContactReducer
}

export default contactReducer