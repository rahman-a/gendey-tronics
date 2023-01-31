import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course Name is Required'],
    },
    description: {
      type: String,
      required: [true, 'Course Description is Required'],
    },
    language: {
      type: String,
      default: 'arabic',
    },
    price: {
      type: Number,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    points: [
      {
        point: {
          type: String,
        },
        order: {
          type: Number,
        },
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
    },
    targets: [
      {
        type: String,
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    driveFile: [
      {
        link: String,
        part: Number,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    trailer: String,
  },
  { timestamps: true }
)

export default mongoose.model('Course', courseSchema)
