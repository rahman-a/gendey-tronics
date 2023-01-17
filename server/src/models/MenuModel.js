import mongoose from 'mongoose'

const subItemsSchema = new mongoose.Schema(
  {
    title: {
      en: String,
      ar: String,
    },
    image: String,
    order: Number,
  },
  { timestamps: true }
)

const menuSchema = new mongoose.Schema(
  {
    title: {
      en: String,
      ar: String,
    },
    order: Number,
    image: String,
    subItems: [subItemsSchema],
  },
  { timestamps: true }
)

export default mongoose.model('Menu', menuSchema)
