import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: String,
    thumbnail: String,
  },
  { timestamps: true }
)

export default mongoose.model('Media', mediaSchema)
