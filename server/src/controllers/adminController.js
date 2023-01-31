import User from '../models/userModal.js'
import Instructor from '../models/instructorModal.js'

export const getAdminInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    const instructor = await Instructor.findOne({ info: req.user._id })

    const info = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      about: instructor.about,
      image: instructor.avatar,
      role: instructor.role,
      reviews: instructor.reviews,
    }
    res.send({
      info,
      code: 200,
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const updateAdminInfo = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, role, about } = req.body
  try {
    if (about) {
      const instructor = await Instructor.findOne({ info: req.user._id })
      instructor.about = about
      await instructor.save()
      res.send({
        info: { about },
        message: 'About has Successfully Updated',
        code: 200,
        success: true,
      })
      return
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, email, phoneNumber },
      { new: true }
    )
    const instructor = await Instructor.findOneAndUpdate(
      { info: req.user._id },
      { role },
      { new: true }
    )

    const info = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: instructor.role,
    }

    res.send({
      info,
      message: 'Info has Successfully Updated',
      code: 200,
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const updateAdminImage = async (req, res, next) => {
  try {
    await Instructor.findOneAndUpdate(
      { info: req.user._id },
      { avatar: req.file.filename }
    )
    res.send({
      image: req.file.filename,
      code: 200,
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const getAdminProfilePhoto = async (req, res, next) => {
  try {
    const admin = await User.findById(req.user._id)
    const instructor = await Instructor.findOne({ info: admin._id })

    res.send({
      code: 200,
      success: true,
      avatar: instructor.avatar,
    })
  } catch (error) {}
}
