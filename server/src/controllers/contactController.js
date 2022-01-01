import Contact from '../models/contactModal.js'
import strings from '../localization.js'

export const createNewContact = async (req, res, next) => {
    const {lang} = req.headers
    const newContact = new Contact(req.body)
    try {
        const contact = await newContact.save()
        res.status(201).json({
            success:true,
            code:201,
            message:strings.contact[lang].contact_sent,
            contact:contact._id
        })
    } catch (error) {
        next(error)
    }
}

export const listAllContacts = async (req, res, next) => {
    const {lang} = req.headers
    const {page, skip} = req.query
    try {
        const contacts = await Contact.find({...req.body})
        .limit(parseInt(page) || 10).skip(parseInt(skip) || 0)
        .populate('user', 'firstName lastName')

        if(!contacts || contacts.length < 1) {
            res.status(404)
            throw new Error(strings.contact[lang].no_contacts)
        }
        res.json({
            success:true, 
            code:200,
            contacts
        })
    } catch (error) {
        next(error)
    }
}

export const toggleContactReadState = async (req, res, next) => {
    const {id} = req.params
    const {lang} = req.headers
    try {
        const contact = await Contact.findById(id)
        if(!contact) {
            res.status(404)
            throw new Error(strings.contact[lang].no_contact)
        }
        contact.isRead = !(contact.isRead)
        const message = contact.isRead ? strings.contact[lang].read_contact : strings.contact[lang].not_read_contact
        await contact.save()
        res.json({
            success:true,
            code:200,
            message
        })
    } catch (error) {
        next(error)
    }
}

export const deleteContact = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const contact = await Contact.findById(id)
        if(!contact) {
            res.status(404)
            throw new Error(strings.contact[lang].no_contact)
        }
        await contact.remove()
        res.json({
            success:true,
            code:200,
            message:strings.contact[lang].contact_delete
        })
    } catch (error) {
        next(error)
    }
}