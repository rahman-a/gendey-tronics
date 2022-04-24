import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    body: {
      type: String,
      required: [true, "Review can't be empty"],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is Required'],
    },
  },
  { timestamps: true }
)

const instructorSchema = new mongoose.Schema(
  {
    info: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    role: {
      type: String,
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
)

instructorSchema.post('save', (doc, next) => {
  doc
    .populate('info', 'firstName lastName')
    .then((info) =>
      info.populate('reviews.user', 'firstName lastName').then((_) => next())
    )
})

export default mongoose.model('Instructor', instructorSchema)
