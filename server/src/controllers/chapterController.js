import Chapter from '../models/chapterModal.js'
import Lesson from '../models/lessonModel.js'
import strings from '../localization.js'

export const createNewChapter = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    const {title} = req.body
    const newChapter = new Chapter({...req.body, course:id}) 
    try {
        const isExist = await Chapter.findOne({course:id, title})
        if(isExist) {
            res.status(400)
            throw new Error(strings.course[lang].chapter_title_exist)
        } 
        await newChapter.save()
        res.status(201).json({
            success:true,
            code:201,
            message:strings.course[lang].chapter_create
        })
    } catch (error) {
        next(error)
    }
}

export const getOneChapter = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const getChapter = await Chapter.findById(id)
        if(!getChapter) {
            res.status(404)
            throw new Error(strings.course[lang].no_chapters)
        }
        const lessons = await Lesson.find({chapter:getChapter._id})
        const chapter = {...getChapter._doc, lessons}
        res.json({
            success:true,
            code:200,
            chapter
        })
    } catch (error) {
        next(error)
    }
}

export const listAllChapter = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    try {
        const allChapters = await Chapter.find({course:id})
        if(!allChapters || allChapters.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].no_course_chapters)
        }
        const chapters = await Promise.all(allChapters.map(async chapter => {
            const lessons = await Lesson.find({chapter: chapter._id})
            return {...chapter._doc, lessons}
        }))
        res.json({
            success:true,
            code:200,
            chapters
        })
    } catch (error) {
        next(error)
    }
}

export const updateChapter = async (req, res, next) => {
    const {lang} = req.headers
    const updatedData = req.body
    const {id} = req.params
    try {
        const chapter = await Chapter.findById(id) 
        if(!chapter) {
            res.status(404)
            throw new Error(strings.course[lang].no_chapters)
        }
        const allowedKeys = ['title','isPaid']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(key === 'isPaid') {
                    chapter.isPaid = updatedData.isPaid
                }else {
                    if(updatedData[key] ) {
                        chapter[key] = updatedData[key]
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
        await chapter.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].chapter_update,
            chapter: chapter._id
        })
    } catch (error) {
        next(error)
    }
}

export const deleteOneChapter = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const chapter = await Chapter.findById(id)
        if(!chapter) {
            res.status(404)
            throw new Error(strings.course[lang].no_chapters)
        }
        await Lesson.deleteMany({chapter:id})
        await chapter.remove()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].chapter_delete,
            chapter:chapter._id
        })
    } catch (error) {
        next(error)
    }
}

