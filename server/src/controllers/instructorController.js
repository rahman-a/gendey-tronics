import Instructor from '../models/instructorModal.js'
import strings from '../localization.js'

export const addInstructor = async (req, res, next) => {
    const {lang} = req.headers
    const {info} = req.body
    const newInstructor = new Instructor(req.body) 
    try {
        const isFound = await Instructor.findOne({info})
        if(isFound) {
            res.status(400)
            throw new Error(strings.course[lang].instructor_exist)
        }
        if(req.files) {
            const {heroImage, avatar} = req.files
            newInstructor.heroImage = heroImage[0].filename
            newInstructor.avatar = avatar[0].filename
        }
        const savedInstructor = await newInstructor.save()
        res.status(201).json({
            success:true,
            code:201,
            message:strings.course[lang].instructor_add,
            instructor:savedInstructor._id
        })
    } catch (error) {
        next(error)
    }
}

export const getOneInstructor = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        let instructor = null
        if(req.user.isAdmin) {
            instructor = await Instructor.findById(id).populate('info')
        }else {
            instructor = await Instructor.findOne({info:req.user._id}).populate('info')
        }
        if(!instructor) {
            res.status(404)
            throw new Error(strings.course[lang].no_instructor)
        }
        res.json({
            success:true,
            code:200,
            instructor
        })
    } catch (error) {
        next(error)
    }
}


export const listAllInstructors = async (req, res, next) => {
    const {lang} = req.headers
    const {page, skip} = req.query 
    try {
        const count = await Instructor.count({})
        const instructors = await Instructor.find({}).populate('info', 'firstName lastName')
        .limit(parseInt(page) || 10).skip(parseInt(skip) || 0)
        if(!instructors || instructors.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].no_instructor)
        }
        res.json({
            success:true,
            code:200,
            instructors,
            count
        })
    } catch (error) {
        next(error)
    }
}

export const updateInstructorData = async (req, res, next) => {
    const {lang} = req.headers
    const updatedData = req.body
    const {id} = req.params
    try {
        let instructor = null
        if(req.user.isAdmin) {
            instructor = await Instructor.findById(id) 
        }else {
            instructor = await Instructor.findOne({info:req.user._id})
        }
        if(!instructor) {
            res.status(404)
            throw new Error(strings.course[lang].no_instructor)
        }
        const allowedKeys = ['about', 'role']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(updatedData[key] ) {
                    instructor[key] = updatedData[key]
                }else {
                    res.status(400)
                    throw new Error (`please provide a value for ${key}`)
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        await instructor.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].instructor_update,
            instructor: instructor._id
        })
    } catch (error) {
        next(error)
    }
}

export const deleteInstructor = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const instructor = await Instructor.findById(id)
        if(!instructor) {
            res.status(404)
            throw new Error(strings.course[lang].no_instructor)
        }
        await instructor.remove()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].instructor_delete,
            instructor: instructor._id
        })
    } catch (error) {
        next(error)
    }
}

// Instructor Reviews

export const addInstructorReview = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    const newReview = {
        ...req.body,
        user:req.user._id
    }
    try {
        const instructor  = await Instructor.findById(id)
        if(!instructor) {
            res.status(404)
            throw new Error(strings.course[lang].review_no_instructor)
        }
        const isReviewedBefore = instructor.reviews.find(review => review.user.toString() === req.user._id.toString())
        if(isReviewedBefore) {
            res.status(400)
            throw new Error(strings.course[lang].already_review)
        }
        instructor.reviews = instructor.reviews.concat(newReview)
        await instructor.save()
         res.status(201).json({
             success:true,
             code:201,
             message:strings.course[lang].review_add,
         })
    } catch (error) {
        next(error)
    }
 
 }

 export const listAllReviews = async (req, res, next) => {
     const {lang} = req.headers 
     const {id} = req.params
     const {page, skip} = req.query
     try {
         const instructor = await Instructor.findById(id)
         if(!instructor) {
             res.status(404)
             throw new Error(strings.course[lang].no_instructor)
         }
         if(!(instructor.reviews) || instructor.reviews.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].no_reviews)
         }
         const allReviews = instructor.reviews.slice(parseInt(skip), (parseInt(page) + parseInt(skip))) 
         if(allReviews.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].end_reviews)
         }
         res.json({
             success:true,
             code:200,
             reviews:allReviews
         })
     } catch (error) {
         next(error)
     }
 }

 export const deleteReview = async (req, res, next) => {
    const {lang} = req.headers 
    const {id} = req.params 
     try {
        const instructor = await Instructor.findById(id)
        if(!instructor) {
            res.status(404)
            throw new Error(strings.course[lang].no_instructor)
        }
        const review = instructor.reviews.find(review => review.user.toString() === req.user._id.toString()) 
        if(!review) {
            res.status(404)
            throw new Error(strings.course[lang].no_reviews)
        }
        instructor.reviews = instructor.reviews.filter(review => review.user.toString() !== req.user._id.toString())
        await instructor.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].delete_review,
            review: review._id
        })
     } catch (error) {
         next(error)
     }
 }