import fs from 'fs'
import path from 'path'
import Announcement from '../models/announcementModel.js'
import strings from '../localization.js'

export const createNewAnnouncement = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    const {announcement} = req.body
    const newAnnouncement = new Announcement({
        announcement,
        course:id,
        instructor:req.user._id,
        image:req.fileName
    })
    try {
        const announcement = await newAnnouncement.save()
        res.status(201).json({
            success:true,
            code:201,
            message:strings.course[lang].ann_create,
            announcement:announcement._id
        })
    } catch (error) {
        next(error)   
    }
}


export const listAllAnnouncement =  async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    const {page, skip} = req.query
    try {
        const count = await Announcement.count({course:id})
        
        const announcements = await Announcement.find({course:id}).populate({
            path:'instructor',
            select:'firstName lastName avatar'
        }).populate({
            path:'comments',
            populate:{
                path:'user',
                select:'firstName lastName avatar'
            }
        }).limit(parseInt(page) || 5).skip(parseInt(skip) || 0)
        
        if(!announcements || announcements.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann)
        }
        res.json({
            success:true,
            code:200,
            announcements,
            count
        })
    } catch (error) {
        next(error)
    }
}

export const getOneAnnouncement = async (req, res, next) => {
    const {lang} = req.headers
    const {announcement} = req.params 
    try {
        const targetedAnnouncement = await Announcement.findById(announcement).populate({
            path:'instructor',
            select:'firstName lastName avatar'
        }).populate({
            path:'comments',
            populate:{
                path:'user',
                select:'firstName lastName'
            }
        })
        if(!targetedAnnouncement) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann)
        }
        res.json({
            success:true,
            code:200,
            announcement:targetedAnnouncement
        })
    } catch (error) {
        next(error)
    }
}

export const updateAnnouncement = async (req, res, next) => {
    const {lang} = req.headers
    const {announcement} = req.body
    const {id} = req.params
    try {
        const targetedAnnouncement = await Announcement.findById(id) 
        if(!targetedAnnouncement) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann)
        }
        targetedAnnouncement.announcement = announcement
        await targetedAnnouncement.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].ann_update,
            announcement: targetedAnnouncement._id
        })
    } catch (error) {
        next(error)
    }
}

export const updateAnnouncementImage = async (req, res, next) => {
    const {lang} = req.headers
    const {announcement} = req.params 
    try {
        if(!(req.fileName)) {
            res.status(400)
            throw new Error(strings.product[lang].image_upload_require)
        }
        const targetedAnnouncement = await Announcement.findById(announcement) 
        if(!targetedAnnouncement) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann)
        }
        fs.unlink(path.resolve(`server/uploads/${targetedAnnouncement.image}`), async () => {      
            targetedAnnouncement.image = req.fileName 
            await targetedAnnouncement.save()
            res.json({
                success:true, 
                code:200,
                message:strings.product[lang].image_upload
            })
        })
        
    } catch (error) {
        next(error)
    }
}

export const deleteAnnouncement = async (req, res, next) => {
    const {lang} = req.headers
    const {announcement} = req.params 
    try {
        const targetedAnnouncement = await Announcement.findById(announcement) 
        if(!targetedAnnouncement) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann)
        }
        await targetedAnnouncement.remove()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].ann_delete,
            Announcement:targetedAnnouncement._id
        })
    } catch (error) {
        next(error)
    }
}

// Announcement Comments

export const addAnnouncementComment = async (req, res, next) => {
    const {lang} = req.headers
    const {announcement} = req.params
    const {comment} = req.body
    const newComment = { user:req.user._id, comment}
    try {
        const targetedAnnouncement  = await Announcement.findById(announcement)
        if(!targetedAnnouncement) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann_comment)
        }
        const isCommentFound = targetedAnnouncement.comments
        .find(comment => comment.user.toString() === req.user._id.toString())
        if(isCommentFound) {
            res.status(400)
            throw new Error(strings.course[lang].already_ann_comment)
        }
        targetedAnnouncement.comments = targetedAnnouncement.comments.concat(newComment)
        await targetedAnnouncement.save()
         res.status(201).json({
             success:true,
             code:201,
             comment:newComment,
             message:strings.course[lang].add_ann_comment,
         })
    } catch (error) {
        next(error)
    }
 
 }

 export const listAllAnnouncementComments = async (req, res, next) => {
    const {lang} = req.headers 
    const {announcement} = req.params
     const {page, skip} = req.query
     try {
         const targetedAnnouncement = await Announcement.findById(announcement)
         if(!targetedAnnouncement) {
             res.status(404)
             throw new Error(strings.course[lang].no_ann)
         }
         if(!(targetedAnnouncement.comments) || targetedAnnouncement.comments.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann_comments_add)
         }
         const allComments = targetedAnnouncement.comments
         .slice(parseInt(skip), (parseInt(page) + parseInt(skip))) 
         if(allComments.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].end_ann_comments)
         }
         res.json({
             success:true,
             code:200,
             comments:allComments
         })
     } catch (error) {
         next(error)
     }
 }

 export const deleteAnnouncementsComment = async (req, res, next) => {
    const {lang} = req.headers 
    const {announcement} = req.params 
     try {
        const targetedAnnouncement = await Announcement.findById(announcement)
        if(!targetedAnnouncement) {
            res.status(404)
            throw new Error(strings.course[lang].no_ann)
        }
        const comment = targetedAnnouncement.comments
        .find(comment => comment.user.toString() === req.user._id.toString()) 
        if(!comment) {
            res.status(404)
            throw new Error(strings.course[lang].no_comments)
        }
        targetedAnnouncement.comments = targetedAnnouncement.comments
        .filter(comment => comment.user.toString() !== req.user._id.toString())
        await targetedAnnouncement.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].comment_delete,
            comment: comment._id
        })
     } catch (error) {
         next(error)
     }
 }