import Enrollment from "../models/enrollmentModal.js";
import Course from "../models/courseModal.js"
import Chapter from "../models/chapterModal.js"
import Lesson from "../models/lessonModel.js"
import strings from "../localization.js";

export const createEnrollment = async (req, res, next) => {
    const {lang} = req.headers
    const {id} = req.params
    const {user, payment} = req.body
 
    const targetUser = user ? user :req.user._id

    console.log({id, user, payment});
    
    const newEnrollment = new Enrollment({user:targetUser, course:id, payment})
    try {
        const isEnrolled = await Enrollment.findOne({course:id, user:targetUser})
        if(isEnrolled) {
            res.status(400)
            throw new Error(strings.course[lang].already_enrolled)
        }
        const targetedCourse = await Course.findById(id)
        console.log('targetedCourse: ', targetedCourse._id);

        // find the first chapter
        const firstChapter = await Chapter.findOne({course:id, order:0})
        // find the first lesson in first chapter
        const firstLesson = firstChapter ? await Lesson.findOne({chapter:firstChapter._id, order:0}) : undefined
        
        // assign lesson id if to currentLesson property
        newEnrollment.currentLesson = firstLesson ?  firstLesson._id : undefined
        newEnrollment.completedLesson = firstLesson ? newEnrollment.completedLesson.concat(firstLesson._id) : []
        const enroll = await newEnrollment.save()
        
        if(targetedCourse.isPaid) {
            
            res.status(201).json({
                success:true,
                code:201,
                asset:targetedCourse.driveFile,
                message:strings.course[lang].new_enroll,
            })

            return
        }
        res.status(201).json({
            success:true,
            code:201,
            message:strings.course[lang].new_enroll,
            enroll:enroll._id
        })
    } catch (error) {
        next(error)
    }
}

export const getEnrollmentData = async (req, res, next) => {
    const {lang} = req.headers
    const {enroll} = req.params 
    try {
        const enrollment = await Enrollment.findById(enroll).populate('currentLesson')
        if(!enrollment) {
            res.status(400)
            throw new Error(strings.course[lang].no_enroll)
        }
        res.json({
            success:true,
            code:200,
            enrollment
        })
    } catch (error) {
        next(error)
    }
}

export const increaseEnrollmentProgress = async (req, res, next) => {
    const {lang} = req.headers
    const {id, enroll, chapter, lesson} = req.params 
    try {
        const targetedEnroll = await Enrollment.findById(enroll)
        if(!targetedEnroll) {
            res.status(400)
            throw new Error(strings.course[lang].no_course_enroll)
        }
        // check if lesson exist in completed lessons array
        if(!targetedEnroll.completedLesson.includes(lesson)){
             // add lesson id to completed lessons array
             targetedEnroll.completedLesson =  targetedEnroll.completedLesson.concat(lesson)
        }

        // Update Current Lesson 
        targetedEnroll.currentLesson = lesson
        
        // check if all chapter lessons ids in completedLesson array 
        // and if they are then add chapter id to completedChapter
        const lessons = await Lesson.find({chapter})
        const isAllLessonsCompleted = lessons.every(lesson => targetedEnroll.completedLesson.includes(lesson._id))
        if(isAllLessonsCompleted 
        && !targetedEnroll.completedChapters.includes(chapter)) {
            targetedEnroll.completedChapters = targetedEnroll.completedChapters.concat(chapter)
        }

        // check if all course chapters ids in completedChapters array
        // and fi they are then mark isCourseCompleted as true
        const chapters = await Chapter.find({course:id})
        const isAllChaptersCompleted = chapters.every(chapter => targetedEnroll.completedChapters.includes(chapter._id))
        if(isAllChaptersCompleted) {
            targetedEnroll.isCourseCompleted = true
        }
        

        // calculate the progress of the student
        let numberOfLessons = 0
        for(const chapter of chapters) {
            const lessonsCount = await Lesson.count({chapter})
            numberOfLessons += lessonsCount
        }
        const numberOfCompletedLesson = targetedEnroll.completedLesson.length
        let progress = Math.ceil(numberOfCompletedLesson * 100 / numberOfLessons)
        if(progress > 100) progress = 100
        targetedEnroll.progress = progress
        
        await targetedEnroll.save()
    
        res.json({
            success:true,
            code:200,
            progress: targetedEnroll.progress,
            lesson:targetedEnroll.currentLesson
        })
    } catch (error) {
        next(error)
    }
}

export const decreaseEnrollmentProgress = async (req, res, next) => {
    const {lang} = req.headers
    const {id, enroll, chapter, lesson} = req.params 
    try {
        const targetedEnroll = await Enrollment.findById(enroll)
        if(!targetedEnroll) {
            res.status(400)
            throw new Error(strings.course[lang].no_course_enroll)
        }
        
        // from lesson id from completed lessons array
        if(targetedEnroll.completedLesson.includes(lesson)) {
            targetedEnroll.completedLesson =  targetedEnroll.completedLesson.filter(ls => ls.toString() !== lesson.toString())
        }
        
        // check if chapter in completedChapters array
        // then remove it
        if(targetedEnroll.completedChapters.includes(chapter)) {
            targetedEnroll.completedChapters = targetedEnroll.completedChapters.filter(ch => ch.toString() !== chapter.toString())
        }

        // check if course marked as completed
        // then mark it as non completed
        if(targetedEnroll.isCourseCompleted) {
            targetedEnroll.isCourseCompleted = false
        }
        
        // calculate the progress of the student
        let numberOfLessons = 0
        const chapters = await Chapter.find({course:id})
        for(const chapter of chapters) {
            const lessonsCount = await Lesson.count({chapter})
            numberOfLessons += lessonsCount
        }
        let progress = Math.ceil(targetedEnroll.progress - 1 * 100 / numberOfLessons)
        targetedEnroll.progress = progress
        
        await targetedEnroll.save()
    
        res.json({
            success:true,
            code:200,
            progress: targetedEnroll.progress
        })
    } catch (error) {
        next(error)
    }
}

export const listCourseEnrollments = async (req, res, next) => {
    const {id} = req.params 

    try {
        const enrollments = await Enrollment.find({course:id})
        .populate('user', 'firstName lastName email phoneNumber')
        .select('user createdAt')

        res.send({
            success:true,
            code:200,
            enrollments
        })

    } catch (error) {
        next(error)
    }
}