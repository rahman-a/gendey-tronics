import constants from "../constants";

const latestContacts = (state, action) => {
        
    const cases = {
        [constants.contacts.LATEST_CONTACTS_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.contacts.LATEST_CONTACTS_SUCCESS]: 
        {
            loading:false,
            error:null,
            contacts:action.contacts,
            count:action.count
        },
        [constants.contacts.LATEST_CONTACTS_FAIL]: 
        {
            loading:true,
            error:action.payload
        },
        [constants.contacts.LATEST_CONTACTS_RESET]: 
        {
            loading:false,
            error:null,
            contacts:null,
            count:null
        }
    }

    return cases[action.type] || {...state}
}

const listContacts = (state, action) => {
    const cases = {
        [constants.contacts.LIST_CONTACTS_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.contacts.LIST_CONTACTS_SUCCESS]: 
        {
            loading:false,
            error:null,
            contacts:action.contacts,
            count:action.count
        },
        [constants.contacts.LIST_CONTACTS_FAIL]: 
        {
            loading:false,
            error:action.payload
        },
        [constants.contacts.LIST_CONTACTS_RESET]: 
        {
            loading:false,
            error:null,
            contacts:null,
            count:null
        }
    }

    return cases[action.type] || {...state}
}

const toggleContact = (state, action) => {
    const cases = {
        [constants.contacts.TOGGLE_CONTACT_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.contacts.TOGGLE_CONTACT_SUCCESS]: 
        {
            loading:false,
            error:null,
            message:action.payload,
        },
        [constants.contacts.TOGGLE_CONTACT_FAIL]: 
        {
            loading:true,
            error:action.payload
        },
        [constants.contacts.TOGGLE_CONTACT_RESET]: 
        {
            loading:false,
            error:null,
            message:null,
        }
    }

    return cases[action.type] || {...state}
}

const deleteContact = (state, action) => {
    const cases = {
        [constants.contacts.DELETE_CONTACT_REQUEST]: 
        {
            loading:true,
            error:null
        },
        [constants.contacts.DELETE_CONTACT_SUCCESS]: 
        {
            loading:false,
            error:null,
            message:action.payload,
        },
        [constants.contacts.DELETE_CONTACT_FAIL]: 
        {
            loading:true,
            error:action.payload
        },
        [constants.contacts.DELETE_CONTACT_RESET]: 
        {
            loading:false,
            error:null,
            message:null,
        }
    }

    return cases[action.type] || {...state}
}

const reducer = {
    latestContacts,
    listContacts,
    toggleContact,
    deleteContact
}

export default reducer