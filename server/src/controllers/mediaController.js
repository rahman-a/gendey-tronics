import Media from '../models/MediaModel.js'

export const createMedia = async (req, res, next) => {
  const { type, url } = req.body
  const newMedia = new Media({
    path: type === 'image' ? req.fileName : url,
    type,
    title: req.body.title,
    thumbnail: type === 'video' ? req.fileName : null,
  })
  try {
    const savedMedia = await newMedia.save()

    res.status(201).json({
      success: true,
      message: 'Media created successfully',
      media: savedMedia,
    })
  } catch (error) {
    next(error)
  }
}

export const listAllMedia = async (req, res, next) => {
  const { type, skip } = req.query
  try {
    const media = await Media.find({ type })
      .sort({ createdAt: -1 })
      .limit(15)
      .skip(parseInt(skip))
    const count = await Media.countDocuments({ type })

    res.status(200).json({
      code: 200,
      success: true,
      media,
      count,
    })
  } catch (error) {
    next(error)
  }
}

export const updateMedia = async (req, res, next) => {
  const { id } = req.params
  const { type, url, title } = req.body
  try {
    const media = await Media.findById(id)
    if (!media) {
      res.status(404)
      throw new Error('Media not found')
    }
    media.path = url
    media.type = type
    media.title = title
    req.fileName && (media.thumbnail = req.fileName)
    await media.save()
    res.status(200).json({
      message: 'Media updated successfully',
      media,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteMedia = async (req, res, next) => {
  const { id } = req.params
  try {
    const media = await Media.findById(id)
    if (!media) {
      res.status(404)
      throw new Error('Media not found')
    }
    await media.remove()
    res.status(200).json({
      message: 'Media deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
