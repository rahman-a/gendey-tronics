import Call from '../models/callsModal.js'
import strings from '../localization.js'

export const bookingCall = async (req, res, next) => {
    const {lang} = req.headers
    const {phone} = req.body
    const newCall = new Call({...req.body})
    try {
        const isFound = await Call.findOne({phone, user:req.user._id, isDone:false})
        if(isFound && !(isFound.isDone)) {
            res.status(400)
            throw new Error(strings.contact[lang].already_booked)
        }
        const call = await newCall.save()
        res.json({
            success:true,
            code:201,
            message:strings.contact[lang].booked_call,
            call:call._id
        })
    } catch (error) {
        next(error)
    }
}

export const listAllActiveCalls = async (req, res, next) => {
    const {lang} = req.headers
    const {page, skip} = req.query
    try {
        const calls = await Call.find({...req.body})
        .limit(parseInt(page) || 10).skip(parseInt(skip) || 0)
        .populate('user', 'firstName lastName')

        if(!calls || calls.length < 1) {
            res.status(404)
            throw new Error(strings.contact[lang].no_calls_booked)
        }
        res.json({
            success:true, 
            code:200,
            calls
        })
    } catch (error) {
        next(error)
    }
}

export const toggleCallActiveState = async (req, res, next) => {
    const {id} = req.params
    const {lang} = req.headers

    try {
        const call = await Call.findById(id)
        if(!call) {
            res.status(404)
            throw new Error(strings.contact[lang].no_call)
        }
        call.isDone = !(call.isDone)
        const message = call.isDone ? strings.contact[lang].done_call : strings.contact[lang].active_call
        await call.save()
        res.json({
            success:true,
            code:200,
            message
        })
    } catch (error) {
        next(error)
    }
}

export const deleteCall = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const call = await Call.findById(id)
        if(!call) {
            res.status(404)
            throw new Error(strings.contact[lang].no_call)
        }
        await call.remove()
        res.json({
            success:true,
            code:200,
            message:strings.contact[lang].call_delete
        })
    } catch (error) {
        next(error)
    }
}