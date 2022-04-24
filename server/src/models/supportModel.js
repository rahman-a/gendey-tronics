import mongoose from 'mongoose'

const supportSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    attachments: [
      {
        path: String,
        mimetype: String,
        originalName: String,
      },
    ],
    isStarred: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Support', supportSchema)
