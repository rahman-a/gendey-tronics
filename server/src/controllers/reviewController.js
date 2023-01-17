import Review from '../models/reviewsModal.js'
import strings from '../localization.js'

export const addCourseReview = async (req, res, next) => {
    const {lang} = req.headers
    const {course} = req.body
    const newReview = new Review({
        ...req.body,
        user:req.user._id
    })
    try {
        const isReviewedBefore = await Review.findOne({course, user:req.user._id})
        if(isReviewedBefore) {
            res.status(400)
            throw new Error(strings.course[lang].already_reviewed)
        }
        const review  = await newReview.save()
         res.status(201).json({
             success:true,
             code:201,
             message:strings.course[lang].review_add,
             review:review._id
         })
    } catch (error) {
        next(error)
    }
 
 }

 export const listAllReviews = async (req, res, next) => {
    const {lang} = req.headers
    //  req.query contains {course, user}
     try {
         const reviews = await Review.find({...req.query})
         if(!reviews || reviews.length < 1) {
             res.status(404)
             throw new Error(strings.course[lang].no_reviews)
         }
         res.json({
             success:true,
             code:200,
             reviews
         })
     } catch (error) {
         next(error)
     }
 }

 export const getOneReview = async (req, res, next) => {
    const {lang} = req.headers 
    const {id} = req.params 
     try {
         const review = await Review.findOne({course:id, user:req.user._id})
         if(!review) {
             res.status(404)
             throw new Error(strings.course[lang].no_reviews)
         }
         res.json({
            success:true,
            code:200,
            review
        })
     } catch (error) {
         next(error)
     }
 }

 export const updateCourseReview = async (req, res, next) => {
    const {lang} = req.headers
    const updatedData = req.body
    const {id} = req.params
    try {
        const review = await Review.findById(id)
        if(!review) {
            res.status(404)
            throw new Error(strings.course[lang].no_reviews)
        }
        const allowedKeys = ['comment', 'rating']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(updatedData[key]) {
                    review[key] = updatedData[key]
                }else {
                    res.status(400)
                    throw new Error (`please provide a value for ${key}`)
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        const updatedReview = await review.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].review_update,
            review: updatedReview,
        })
    } catch (error) {
        next(error)
    }
} 

export const deleteOneReview = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const review = await Review.findById(id) 
        if(!review) {
            res.status(404)
            throw new Error(strings.course[lang].no_reviews)
        }
        await review.remove()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].review_delete,
            review: review._id,
        })
    } catch (error) {
        next(error)
    }
}