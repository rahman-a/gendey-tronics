import fs from 'fs'
import path from 'path'
import Course from '../models/courseModal.js'
import Chapter from '../models/chapterModal.js'
import Lesson from '../models/lessonModel.js'
import Review from '../models/reviewsModal.js'
import Instructor from '../models/instructorModal.js'
import Enrollment from '../models/enrollmentModal.js'
import Wishlist from '../models/wishlistModal.js'
// import Product from '../models/productModal.js'
// import Order from '../models/orderModal.js'
import strings from '../localization.js'

export const createNewCourse = async (req, res, next) => {
  const { lang } = req.headers

  try {
    const course = JSON.parse(req.body.course)
    const chapters = JSON.parse(req.body.chapters)
    const lessons = JSON.parse(req.body.lessons)

    const newCourse = new Course({ ...course, image: req.fileName })

    const savedCourse = await newCourse.save()

    await Chapter.insertMany(chapters)

    await Lesson.insertMany(lessons)

    res.status(201).json({
      success: true,
      code: 201,
      message: strings.course[lang].course_create,
      course: savedCourse._id,
    })
  } catch (error) {
    next(error)
  }
}

export const getTheCourseData = async (req, res, next) => {
  const { lang } = req.headers
  const { id } = req.params
  const { type } = req.query
  try {
    const course = await Course.findById(id)
    if (!course) {
      res.status(404)
      throw new Error(strings.course[lang].no_course)
    }
    course.original_Price = course.price
    if (course.discount) {
      course.price = course.price - (course.price * course.discount) / 100
    }
    // Instructor Data
    const instructor = await Instructor.findById(course.instructor)
      .populate('info', 'firstName lastName')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'firstName lastName',
        },
      })
    const instructorData = await calculateInstructorData(instructor)
    // Get All Chapter and Lessons
    const chapters = await Chapter.find({ course: id })
    if (!chapters || chapters.length < 1) {
      res.status(400)
      throw new Error(strings.course[lang].no_course_chapters)
    }
    const allChapters = await getChaptersAndLessons(chapters)
    let courseDuration = 0
    allChapters.forEach((chapter) => (courseDuration += chapter.duration))
    // Get Course Review Data
    const reviews = await Review.find({ course: id }).populate(
      'user',
      'firstName lastName'
    )
    const reviewsData = calculateReviewData(reviews)

    // Get Number of Enrollment
    const enrollments = await Enrollment.count({ course: id })
    const enrollment = req.user
      ? await Enrollment.findOne({ course: id, user: req.user._id })
      : null

    // check if course in wishlist list or not
    const isFav = req.user
      ? await Wishlist.findOne({ itemType: 'course', item: id })
      : null
    if (type === 'preview') {
      res.json({
        success: true,
        code: 200,
        course: {
          _id: course._id,
          name: course.name,
          description: course.description,
          price: course.price,
          original_Price: course.original_Price,
          image: course.image,
          isFav: isFav ? true : false,
          discount: course.discount || 0,
        },
      })
    } else {
      res.json({
        success: true,
        code: 200,
        course: {
          ...course._doc,
          updatedAt: course.updatedAt,
          duration: courseDuration,
          students: enrollments,
          instructor: instructorData,
          chapters: allChapters,
          original_Price: course.original_Price,
          isFav: isFav ? true : false,
          enrollment: {
            _id: enrollment ? enrollment._id : null,
            isEnrolled: enrollment ? true : false,
            enrollmentDate: enrollment ? enrollment.createdAt : null,
          },
          reviewsData,
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

export const listAllCourses = async (req, res, next) => {
  const { lang } = req.headers
  const {
    name,
    price,
    rating,
    students,
    isPaid,
    page,
    skip,
    isPublished,
    isPublic,
  } = req.query
  let searchFilter = {}
  try {
    if (name) {
      searchFilter = {
        name: {
          $regex: name,
          $options: 'i',
        },
      }
    }

    if (price) {
      const priceRange = price.split(':')
      if (priceRange.length > 1) {
        const firstRange = parseInt(priceRange[0])
        const secondRange = parseInt(priceRange[1])

        searchFilter = {
          ...searchFilter,
          price: {
            $gte: firstRange,
            $lte: secondRange,
          },
        }
      } else {
        searchFilter = {
          ...searchFilter,
          price: parseInt(priceRange[0]),
        }
      }
    }

    if (rating) {
      searchFilter = {
        ...searchFilter,
        rating: {
          $lte: parseFloat(rating),
          $gte: parseFloat(rating) - 0.25,
        },
      }
    }

    if (students) {
      const studentRange = students.split(':')
      if (studentRange.length > 1) {
        const firstRange = parseInt(studentRange[0])
        const secondRange = parseInt(studentRange[1])

        searchFilter = {
          ...searchFilter,
          students: {
            $gte: firstRange,
            $lte: secondRange,
          },
        }
      } else {
        searchFilter = {
          ...searchFilter,
          students: parseInt(studentRange[0]),
        }
      }
    }

    if (isPaid) {
      const condition = isPaid === 'true'
      searchFilter = {
        ...searchFilter,
        isPaid: condition,
      }
    }

    if (isPublished || isPublic) {
      const value = (isPublished || isPublic) === 'true'
      searchFilter = {
        ...searchFilter,
        isPublished: value,
      }
    }

    const aggregationOptions = [
      {
        $lookup: {
          from: 'reviews',
          let: { courseId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$course', '$$courseId'] },
              },
            },
            {
              $project: {
                rating: 1,
                comment: 1,
                user: 1,
              },
            },
          ],
          as: 'reviews',
        },
      },
      {
        $lookup: {
          from: 'enrollments',
          let: { courseId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$course', '$$courseId'] },
              },
            },
            {
              $project: {
                progress: 1,
              },
            },
          ],
          as: 'students',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          image: { $first: '$image' },
          description: { $first: '$description' },
          price: { $first: '$price' },
          discount: { $first: '$discount' },
          students: { $first: '$students' },
          isPaid: { $first: '$isPaid' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          isPublished: { $first: '$isPublished' },
          numReviews: {
            $last: {
              $map: {
                input: '$reviews',
                as: 'r',
                in: '$$r.rating',
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          description: 1,
          price: 1,
          isPaid: 1,
          discount: 1,
          createdAt: 1,
          updatedAt: 1,
          isPublished: 1,
          rating: { $ifNull: [{ $avg: '$numReviews' }, 0] },
          students: { $size: '$students' },
        },
      },
      {
        $match: searchFilter,
      },
    ]

    const courses = await Course.aggregate([
      ...aggregationOptions,
      { $sort: { createdAt: -1 } },
      { $skip: parseInt(skip) || 0 },
      { $limit: parseInt(page) || 10 },
    ])

    if (!courses || courses.length < 1) {
      res.status(404)
      throw new Error(strings.course[lang].no_course)
    }

    const courseCount = await Course.aggregate([
      ...aggregationOptions,
      { $count: 'course_count' },
    ])

    let count = 0

    if (courseCount) {
      count = courseCount[0]['course_count']
    }

    for (const course of courses) {
      let courseDuration = 0
      const chapters = await Chapter.find({ course: course._id })
      const allChapters = await getChaptersAndLessons(chapters)
      allChapters.forEach((chapter) => (courseDuration += chapter.duration))
      course.time = courseDuration

      const isFavourite = await Wishlist.findOne({
        user: req.user?._id,
        item: course._id,
      })
      isFavourite ? (course.isFav = true) : (course.isFav = false)
    }

    res.json({
      success: true,
      code: 200,
      courses,
      count,
    })
  } catch (error) {
    next(error)
  }
}

export const listPurchasedCourses = async (req, res, next) => {
  const { lang } = req.headers

  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
    if (!enrollments || !enrollments.length) {
      res.status(400)
      throw new Error(strings.course[lang].not_enrolled)
    }
    const courses = []
    for (const enrollment of enrollments) {
      const course = await Course.findById(enrollment.course)
      const chapters = await Chapter.find({ course: course._id })
      const allChapters = await getChaptersAndLessons(chapters)
      let courseDuration = 0
      allChapters.forEach((chapter) => (courseDuration += chapter.duration))
      courses.push({
        _id: course._id,
        enroll: enrollment._id,
        name: course.name,
        image: course.image,
        time: courseDuration,
        isPaid: course.isPaid,
      })
    }

    res.json({
      success: true,
      code: 200,
      courses,
    })
  } catch (error) {
    next(error)
  }
}

export const updateCourseData = async (req, res, next) => {
  const { lang } = req.headers
  const updatedData = req.body
  const { id } = req.params
  try {
    const course = await Course.findById(id)
    if (!course) {
      res.status(404)
      throw new Error(strings.course[lang].no_course)
    }
    const allowedKeys = [
      'name',
      'description',
      'price',
      'language',
      'instructor',
      'points',
      'requirements',
      'targets',
      'isPaid',
      'trailer',
      'discount',
      'link',
    ]
    if (Object.keys(updatedData).length < 1) {
      res.status(400)
      throw new Error(strings.user[lang].require_data)
    }
    for (let key in updatedData) {
      if (allowedKeys.includes(key)) {
        if (key === 'isPaid') {
          course.isPaid = updatedData.isPaid
        } else if (key === 'price') {
          course.price = updatedData.price
        } else if (key === 'link') {
          course.driveFile = course.driveFile.concat(updatedData[key])
        } else {
          if (updatedData[key]) {
            course[key] = updatedData[key]
          } else {
            res.status(400)
            throw new Error(`please provide a value for ${key}`)
          }
        }
      } else {
        res.status(400)
        throw new Error(`${key} is Unknown, please choose a verified key`)
      }
    }
    const updatedCourse = await course.save()
    res.json({
      success: true,
      code: 200,
      message: strings.course[lang].course_update,
      course: updatedCourse,
    })
  } catch (error) {
    next(error)
  }
}

export const updateCourseImage = async (req, res, next) => {
  const { lang } = req.headers
  const { id } = req.params
  try {
    if (!req.fileName) {
      res.status(400)
      throw new Error(strings.product[lang].image_upload_require)
    }
    const course = await Course.findById(id)
    if (!course) {
      res.status(404)
      throw new Error(strings.course[lang].no_course)
    }
    fs.unlink(path.resolve(`server/uploads/${course.image}`), async () => {
      course.image = req.fileName
      await course.save()
      res.json({
        success: true,
        code: 200,
        image: req.fileName,
        message: strings.product[lang].image_upload,
      })
    })
  } catch (error) {
    next(error)
  }
}

export const deleteCourse = async (req, res, next) => {
  const { lang } = req.headers
  const { id } = req.params
  try {
    const course = await Course.findById(id)
    if (!course) {
      res.status(404)
      throw new Error(strings.course[lang].no_course)
    }
    const chapters = await Chapter.find({ course: course._id })
    if (chapters.length > 0) {
      for (const chapter of chapters) {
        await Lesson.deleteMany({ chapter: chapter._id })
      }
      await Chapter.deleteMany({ course: course._id })
    }
    await course.remove()
    res.json({
      success: true,
      code: 200,
      message: strings.course[lang].course_delete,
      course: course._id,
    })
  } catch (error) {
    next(error)
  }
}

export const toggleCoursePublish = async (req, res, next) => {
  const { id } = req.params

  try {
    const course = await Course.findById(id)
    course.isPublished = !course.isPublished
    const updatedCourse = await course.save()
    res.send({
      success: true,
      isPublished: updatedCourse.isPublished,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteLink = async (req, res, next) => {
  const { id, link } = req.params

  try {
    const course = await Course.findById(id)
    if (!course) {
      res.status(404)
      throw new Error(strings.course[lang].no_course)
    }
    course.driveFile = course.driveFile.filter(
      (lk) => lk._id.toString() !== link
    )
    await course.save()
    res.send({
      success: true,
      code: 200,
      message: 'Link has Removed',
    })
  } catch (error) {
    next(error)
  }
}

async function calculateInstructorData(instructor) {
  // Count the number of courses and students
  const allCourses = await Course.find({ instructor: instructor._id })
  let studentsNumber = 0
  for (const course of allCourses) {
    const enrollments = await Enrollment.count({ course: course._id })
    studentsNumber += enrollments
  }
  // get the reviews data
  const overAllReviews = instructor.reviews.length
  let allRating = 0
  instructor.reviews.forEach((review) => (allRating += review.rating))
  const averageNumericRating = allRating / overAllReviews
  const allReviews = instructor.reviews.map((review) => {
    return {
      _id: review._id,
      name: `${review.user.firstName} ${review.user.lastName}`,
      comment: review.body,
      rating: review.rating,
      createdAt: review.createdAt,
    }
  })
  // Gather all information
  return {
    _id: instructor._id,
    name: `${instructor.info.firstName} ${instructor.info.lastName}`,
    role: instructor.role,
    about: instructor.about,
    avatar: instructor.avatar,
    coursesNumber: allCourses.length,
    studentsNumber,
    reviewsNumber: overAllReviews,
    averageRating: averageNumericRating,
    reviews: allReviews,
  }
}

async function getChaptersAndLessons(chapters) {
  const allChapters = []
  for (const chapter of chapters) {
    const lessons = await Lesson.find({ chapter })
    let duration = 0
    lessons.forEach((lesson) => (duration += lesson.duration))
    const allLessons = lessons.map((lesson) => {
      return {
        _id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        video: lesson.video,
        isPaid: lesson.isPaid,
        duration: lesson.duration,
        order: lesson.order,
      }
    })
    allChapters.push({
      _id: chapter._id,
      title: chapter.title,
      order: chapter.order,
      isPaid: chapter.isPaid,
      lessonCount: lessons.length,
      duration,
      lessons: allLessons,
    })
  }

  return allChapters
}

function calculateReviewData(reviews) {
  const allReviews = reviews.map((review) => {
    return {
      _id: review._id,
      title: review.title,
      rating: review.rating,
      comment: review.comment,
      name: `${review.user.firstName} ${review.user.lastName}`,
      createdAt: review.createdAt,
    }
  })
  const numberOfReview = reviews.length
  let overAllRating = 0
  let numberOfRating1 = 0
  let numberOfRating2 = 0
  let numberOfRating3 = 0
  let numberOfRating4 = 0
  let numberOfRating5 = 0
  reviews.forEach((r) => {
    overAllRating += r.rating
    if (r.rating <= 1) numberOfRating1 += 1
    if (r.rating > 1 && r.rating <= 2) numberOfRating2 += 1
    if (r.rating > 2 && r.rating <= 3) numberOfRating3 += 1
    if (r.rating > 3 && r.rating <= 4) numberOfRating4 += 1
    if (r.rating > 4 && r.rating <= 5) numberOfRating5 += 1
  })
  const averageNumericRating = isNaN(overAllRating / numberOfReview)
    ? '0.0'
    : (overAllRating / numberOfReview).toFixed(1)
  const rating1Percentage =
    Math.floor((numberOfRating1 * 100) / numberOfReview) || 0
  const rating2Percentage =
    Math.floor((numberOfRating2 * 100) / numberOfReview) || 0
  const rating3Percentage =
    Math.floor((numberOfRating3 * 100) / numberOfReview) || 0
  const rating4Percentage =
    Math.floor((numberOfRating4 * 100) / numberOfReview) || 0
  const rating5Percentage =
    Math.floor((numberOfRating5 * 100) / numberOfReview) || 0

  return {
    numberOfReview,
    averageNumericRating,
    ratingValues: [
      rating5Percentage,
      rating4Percentage,
      rating3Percentage,
      rating2Percentage,
      rating1Percentage,
    ],
    reviews: allReviews.filter((r) => Boolean(r.comment)),
  }
}
