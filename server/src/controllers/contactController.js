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
    const {page, skip, name, phone,email, isRead} = req.query
    try {
        let searchFilter = {}
        if(name) {
            searchFilter = {
                ...searchFilter,
                name:{
                    $regex:name,
                    $options:'i'
                }
            }
        }

        if(phone) {
            searchFilter = {
                ...searchFilter,
                phone
            }
        }

        if(email) {
            console.log({email});
            searchFilter = {
                ...searchFilter,
                email
            }
        }

        if(isRead) {
            const value = isRead === 'true'
            searchFilter = {
                ...searchFilter,
                isRead:value
            }
        }
        
        const contacts = await Contact.find(searchFilter)
        .sort({createdAt:-1})
        .limit(parseInt(page) || 10).skip(parseInt(skip) || 0)
        .populate('user', 'firstName lastName')

        const count = await Contact.count()
        
        if(!contacts || contacts.length < 1) {
            res.status(404)
            throw new Error(strings.contact[lang].no_contacts)
        }
        res.json({
            success:true, 
            code:200,
            contacts,
            count
        })
    } catch (error) {
        next(error)
    }
}

export const latestContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({isRead:false})
        .sort({createdAt:-1}).limit(5)
        const count = await Contact.count({isRead:false})
        const mappedCalls = contacts.map(contact => {
            return {
                id:contact._id,
                title:`A new message from ${contact.email}`,
                content:contact.message.substring(0,45) + '....',
                email:contact.email
            }
        })
        
        res.send({
            code:200,
            success:true,
            count,
            contacts:mappedCalls
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
        const message = contact.isRead ? strings.contact[lang].read_contact : strings.contact[lang].no_read_contact        
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