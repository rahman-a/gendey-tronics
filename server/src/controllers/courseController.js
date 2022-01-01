import fs from 'fs'
import path from 'path'
import Course from '../models/courseModal.js'
import Chapter from '../models/chapterModal.js'
import Lesson from '../models/lessonModel.js'
import Review from '../models/reviewsModal.js'
import Instructor from '../models/instructorModal.js'
import Enrollment from '../models/enrollmentModal.js'
import Wishlist from '../models/wishlistModal.js'
import strings from '../localization.js'

export const createNewCourse = async (req, res, next) => {
    const {lang} = req.headers
    const newCourse = new Course({
        ...req.body,
        image:req.fileName
    }) 

    try {
        const course = await newCourse.save()
        res.status(201).json({
            success:true,
            code:201,
            message:strings.course[lang].course_create,
            course:course._id
        })
    } catch (error) {
        next(error)
    }
}

export const getTheCourseData = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    const {type} = req.query
    try {
        const course = await Course.findById(id)
        if(!course) {
            res.status(404)
            throw new Error(strings.course[lang].no_course)
        }
        if(course.discount){
            course.price = course.price - (course.price * course.discount / 100)
        }
        // Instructor Data
        const instructor = await Instructor.findById(course.instructor)
        .populate('info', 'firstName lastName').populate({
            path:'reviews',
            populate:{
                path:'user',
                select:'firstName lastName'
            }
        })
        const instructorData = await calculateInstructorData(instructor)
        // Get All Chapter and Lessons
        const chapters = await Chapter.find({course:id})
        if(!chapters || chapters.length < 1) {
            res.status(400)
            throw new Error(strings.course[lang].no_course_chapters)
        }
        const allChapters = await getChaptersAndLessons(chapters) 
        let courseDuration = 0
        allChapters.forEach(chapter => courseDuration += chapter.duration)
        // Get Course Review Data
        const reviews = await Review.find({course:id}).populate('user', 'firstName lastName')
        const reviewsData = calculateReviewData(reviews)

        // Get Number of Enrollment 
        const enrollments = await Enrollment.count({course:id})
        const enrollment = req.user 
        ? await Enrollment.findOne({course:id, user:req.user._id})
        : null

        // check if course in wishlist list or not
        const isFav = req.user
        ? await Wishlist.findOne({itemType:'course', item:id})
        : null
        if(type === 'preview') {
            res.json({
                success:true,
                code:200,
                course: {
                    _id:course._id,
                    name:course.name,
                    description:course.description,
                    price: course.price,
                    image:course.image,
                    isFav: isFav ? true : false,
                    discount:course.discount || 0
                }
            })
        }else {
            res.json({
                success:true,
                code:200,
                course:{
                    ...course._doc,
                    updatedAt:course.updatedAt,
                    duration:courseDuration,
                    students:enrollments,
                    instructor:instructorData, 
                    chapters:allChapters,
                    isFav: isFav ? true : false,
                    enrollment:{
                        _id:enrollment ? enrollment._id : null,
                        isEnrolled:enrollment ? true :false,
                        enrollmentDate: enrollment ? enrollment.createdAt : null
                    },
                    reviewsData
                }
            })
        }
    } catch (error) {
        console.log('ERROR', error);
        next(error)
    }
}


export const listAllCourses = async (req, res, next) => {
    const {lang} = req.headers
    const {name, page, skip, sort} = req.query 
    let searchFilter = req.user ? {user:req.user._id} :{}
    try {
        if(name) {
            searchFilter = {
                name : {
                    $regex:name,
                    $option:'i'
                }
            }
        }
        const count = await Course.count({...searchFilter})
        const courses = await Course.find({...searchFilter})
        .limit(parseInt(page) || 10).skip(parseInt(skip) || 0).sort({_id:parseInt(sort)})
        if(!courses || courses.length < 1) {
            res.status(404)
            throw new Error(strings.course[lang].no_course)
        }
        const allCourses = []
        for(const course of courses){
            const isFav = req.user
            ?await Wishlist.findOne({itemType:'course', item:course._id})
            :null
            
            allCourses.push({
                _id:course._id, 
                name:course.name, 
                description:course.description, 
                image:course.image,
                isFav:isFav ? true :false
            })
        }
        res.json({
            success:true,
            code:200,
            courses:allCourses,
            count
        })
    } catch (error) {
        next(error)
    }
}

export const listPurchasedCourses = async (req, res, next) => {
    const {lang} = req.headers

    try {
        const enrollments = await Enrollment.find({user: req.user._id})
        if(!enrollments || !enrollments.length) {
            res.status(400)
            throw new Error(strings.course[lang].not_enrolled)
        }
        const courses = []
        for(const enrollment of enrollments) {
            const course = await Course.findById(enrollment.course)
            courses.push({
                _id:course._id,
                enroll:enrollment._id,
                name:course.name,
                description:course.description,
                image:course.image
            })
        }

        res.json({
            success:true,
            code:200,
            courses
        })
    } catch (error) {
        next(error)
    }
}

export const updateCourseData = async (req, res, next) => {
    const {lang} = req.headers
    const updatedData = req.body
    const {id} = req.params
    try {
        const course = await Course.findById(id) 
        if(!course) {
            res.status(404)
            throw new Error(strings.course[lang].no_course)
        }
        const allowedKeys = ['name', 'description', 'price', 
        'language', 'instructor', 'points', 
        'requirements', 'targets', 'isPaid', 'trailer','discount']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(key === 'isPaid') {
                    course.isPaid = updatedData.isPaid
                }else if(key === 'price') {
                    course.price = updatedData.price
                }else {
                    if(updatedData[key] ) {
                        course[key] = updatedData[key]
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
        await course.save()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].course_update,
            course: course._id
        })
    } catch (error) {
        next(error)
    }
}

export const updateCourseImage = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        if(!(req.fileName)) {
            res.status(400)
            throw new Error(strings.product[lang].image_upload_require)
        }
        const course = await Course.findById(id) 
        if(!course) {
            res.status(404)
            throw new Error(strings.course[lang].no_course)
        }
        fs.unlink(path.resolve(`server/uploads/${course.image}`), async () => {
            course.image = req.fileName 
            await course.save()
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

export const deleteCourse = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params 
    try {
        const course = await Course.findById(id)
        if(!course) {
            res.status(404)
            throw new Error(strings.course[lang].no_course)
        }
        const chapters = await Chapter.find({course:course._id})
        if(chapters.length > 0) {
            for(const chapter of chapters) {
                await Lesson.deleteMany({chapter:chapter._id})
            }
            await Chapter.deleteMany({course:course._id})
        }
        await course.remove()
        res.json({
            success:true,
            code:200,
            message:strings.course[lang].course_delete,
            course: course._id
        })
    } catch (error) {
        next(error)
    }
}

async function calculateInstructorData (instructor) {
    // Count the number of courses and students
    const allCourses = await Course.find({instructor:instructor._id})
    let studentsNumber = 0
    for(const course of allCourses){
        const enrollments = await Enrollment.count({course:course._id})
        studentsNumber += enrollments
    }
    // get the reviews data
    const overAllReviews = instructor.reviews.length 
    let allRating = 0 
    instructor.reviews.forEach(review => allRating += review.rating)
    const averageNumericRating = allRating / overAllReviews
    const allReviews = instructor.reviews.map(review => {
        return {
            _id:review._id,
            name:`${review.user.firstName} ${review.user.lastName}`,
            comment:review.body,
            rating:review.rating,
            createdAt:review.createdAt
        }
    })
    // Gather all information
    return {
        _id:instructor._id,
        name:`${instructor.info.firstName} ${instructor.info.lastName}`,
        role:instructor.role,
        about:instructor.about,
        coursesNumber:allCourses.length,
        studentsNumber,
        reviewsNumber:overAllReviews,
        averageRating:averageNumericRating,
        reviews:allReviews
    }
}

async function getChaptersAndLessons (chapters) {
    const allChapters = []
    for(const chapter of chapters) {
        const lessons = await Lesson.find({chapter})
        let duration = 0
        lessons.forEach(lesson => duration += lesson.duration)
        const allLessons = lessons.map(lesson => {
            return {
                _id:lesson._id,
                title:lesson.title,
                description:lesson.description,
                video:lesson.video,
                isPaid:lesson.isPaid,
                duration:lesson.duration,
                order:lesson.order
            }
        })
        allChapters.push({
            _id:chapter._id,
            title:chapter.title,
            order:chapter.order,
            isPaid:chapter.isPaid,
            lessonCount:lessons.length,
            duration,
            lessons:allLessons
        })
    }

    return allChapters
}

function calculateReviewData(reviews){
    const allReviews = reviews.map(review => {
        return {
            _id:review._id,
            title:review.title,
            rating:review.rating,
            comment:review.comment,
            name:`${review.user.firstName} ${review.user.lastName}`,
            createdAt:review.createdAt
        }
    })
    const numberOfReview = reviews.length
    let overAllRating = 0
    let numberOfRating1 = 0
    let numberOfRating2 = 0
    let numberOfRating3 = 0
    let numberOfRating4 = 0
    let numberOfRating5 = 0
    reviews.forEach(r => {
        overAllRating += r.rating 
        if(r.rating <= 1) numberOfRating1 += 1
        if(r.rating > 1 && r.rating <= 2) numberOfRating2 += 1
        if(r.rating > 2 && r.rating <= 3) numberOfRating3 += 1
        if(r.rating > 3 && r.rating <= 4) numberOfRating4 += 1
        if(r.rating > 4 && r.rating <= 5) numberOfRating5 += 1
    })
    const averageNumericRating = (overAllRating / numberOfReview) || 0
    const rating1Percentage = Math.floor(numberOfRating1 * 100 / numberOfReview) || 0
    const rating2Percentage = Math.floor(numberOfRating2 * 100 / numberOfReview) || 0
    const rating3Percentage = Math.floor(numberOfRating3 * 100 / numberOfReview) || 0
    const rating4Percentage = Math.floor(numberOfRating4 * 100 / numberOfReview) || 0
    const rating5Percentage = Math.floor(numberOfRating5 * 100 / numberOfReview) || 0

    return {
        numberOfReview,
        averageNumericRating,
        ratingValues : [
            rating1Percentage,
            rating2Percentage,
            rating3Percentage,
            rating4Percentage,
            rating5Percentage,],
        reviews:allReviews
    }
}
