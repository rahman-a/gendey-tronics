import Lesson from "../models/lessonModel.js";
import strings from "../localization.js";

export const createNewLesson = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    const {title} = req.body
    const newLesson = new Lesson({...req.body, chapter:id}) 
    try {
        const isExist = await Lesson.findOne({chapter:id, title})
        if(isExist) {
            res.status(400)
            throw new Error(strings.course[lang].lesson_title_exist)
        } 
        const lesson = await newLesson.save()
        res.status(201).json({
            success:true,
            code:201,
            lesson,
            message:strings.course[lang].lesson_create
        })
    } catch (error) {
        next(error)
    }
}

export const updateLesson = async (req, res, next) => {
    const {lang} = req.headers
    const updatedData = req.body
    const {id} = req.params
    try {
        
        
        const lesson = await Lesson.findById(id) 
        if(!lesson) {
            res.status(404)
            throw new Error(strings.course[lang].no_lesson)
        }
        const allowedKeys = ['title', 'description', 'video', 
        'document', 'isPaid', 'duration']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.course[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(key === 'isPaid') {
                    lesson.isPaid = updatedData.isPaid
                }else {
                    if(updatedData[key] ) {
                        lesson[key] = updatedData[key]
                    }else {
                        res.status(400)
                        throw new Error (`please provide a value for ${key}`)
                    }
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        const updatedLesson = await lesson.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].lesson_update,
            lesson: updatedLesson
        })
    } catch (error) {
        next(error)
    }
}

export const deleteLesson = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const lesson = await Lesson.findById(id) 
        if(!lesson) {
            res.status(404)
            throw new Error(strings.course[lang].no_lesson)
        }
        await lesson.remove()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].lesson_delete,
            lesson:lesson._id
        })
    } catch (error) {
        next(error)
    }
}