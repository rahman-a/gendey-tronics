import Note from "../models/notesModal.js"
import strings from "../localization.js"

export const createNote = async (req, res, next) => {
    const {id} = req.params
    const {lesson} = req.body
    const {lang} = req.headers
    const newNote = new Note({
        ...req.body,
        course:id,
        user:req.user._id
    })

    try {
        if(!lesson){
            res.status(400)
            throw new Error(strings.course[lang].note_choose_lesson)
        }
       const note = await newNote.save()
       const populatedNote = await Note.findById(note._id)
       .populate('course', 'name').populate('lesson', 'title')
       res.status(201).json({
        success:true,
        code:201,
        message:strings.course[lang].note_create,
        note:populatedNote
    })
    } catch (error) {
        next(error)
    }
}

export const updateNote = async (req, res, next) => {
    const {id} = req.params
    const {note} = req.body 
    const {lang} = req.headers

    try {
        const targetedNote = await Note.findById(id) 
        if(!targetedNote) {
            res.status(404)
            throw new Error(strings.course[lang].no_note)
        }
        targetedNote.note = note 
        await targetedNote.save()
        res.json({
            success:true, 
            code:200,
            message:strings.course[lang].note_update,
            note:targetedNote
        })
    } catch (error) {
        next(error)
    }
}

export const listAllNotes = async (req, res, next) => {
    const {id} = req.params
    const {lesson} = req.query 
    const {lang} = req.headers
    try {
        let searchFilter = {course:id}
        if(lesson) searchFilter = {course:id, lesson}
        const notes = await Note.find({...searchFilter}).sort({createdAt:-1})
        .populate('course', 'name').populate('lesson', 'title')
        
        if(!notes || notes.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].not_notes)
        }

        res.json({
            success:true, 
            code:200,
            notes
        })
    } catch (error) {
        next(error)
    }
}

export const deleteNote = async (req, res, next) => {
    const {id} = req.params
    const {lang} = req.headers

    try {
        const targetedNote = await Note.findById(id) 
        if(!targetedNote) {
            res.status(404)
            throw new Error(strings.course[lang].no_notes)
        }
        await targetedNote.remove()
        res.json({
            success:true, 
            code:200,
            message:strings.course[lang].note_delete,
            note:targetedNote._id
        })
    } catch (error) {
        next(error)
    }
}