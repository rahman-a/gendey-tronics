import constants from '../constants'
import api from '../api'

const latestContacts = (_) => async (dispatch) => {
  dispatch({ type: constants.contacts.LATEST_CONTACTS_REQUEST })

  try {
    const { data } = await api.contacts.latest()
    dispatch({
      type: constants.contacts.LATEST_CONTACTS_SUCCESS,
      contacts: data.contacts,
      count: data.count,
    })
  } catch (error) {
    dispatch({
      type: constants.contacts.LATEST_CONTACTS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const listContacts = (query) => async (dispatch) => {
  dispatch({ type: constants.contacts.LIST_CONTACTS_REQUEST })

  try {
    const { data } = await api.contacts.index(query)
    dispatch({
      type: constants.contacts.LIST_CONTACTS_SUCCESS,
      contacts: data.contacts,
      count: data.count,
    })
  } catch (error) {
    dispatch({
      type: constants.contacts.LIST_CONTACTS_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const toggleContact = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.contacts.TOGGLE_CONTACT_REQUEST })

  try {
    const { data } = await api.contacts.toggle(id)

    const { contacts, count } = getState().listContacts
    if (contacts) {
      const updatedContacts = JSON.parse(JSON.stringify(contacts))
      updatedContacts.forEach((contact) => {
        if (contact._id === id) {
          contact.isRead = !contact.isRead
        }
      })
      dispatch({
        type: constants.contacts.LIST_CONTACTS_SUCCESS,
        contacts: updatedContacts,
        count,
      })
    }

    dispatch({
      type: constants.contacts.TOGGLE_CONTACT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.contacts.TOGGLE_CONTACT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const deleteContact = (id) => async (dispatch, getState) => {
  dispatch({ type: constants.contacts.DELETE_CONTACT_REQUEST })

  try {
    const { data } = await api.contacts.delete(id)

    const { contacts, count } = getState().listContacts
    if (contacts) {
      let updatedContacts = JSON.parse(JSON.stringify(contacts))
      updatedContacts = updatedContacts.filter((contact) => contact._id !== id)
      dispatch({
        type: constants.contacts.LIST_CONTACTS_SUCCESS,
        contacts: updatedContacts,
        count: count - 1,
      })
    }
    dispatch({
      type: constants.contacts.DELETE_CONTACT_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: constants.contacts.DELETE_CONTACT_FAIL,
      payload: error.response && error.response.data.message,
    })
  }
}

const action = {
  latestContacts,
  listContacts,
  toggleContact,
  deleteContact,
}

export default action
