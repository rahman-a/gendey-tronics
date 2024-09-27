// @ts-nocheck
import fs from 'fs'
import path from 'path'
import Support from '../models/supportModel.js'
import User from '../models/userModal.js'
import template from '../emails/template.js'
import sendEmail from '../emails/send.js'
import { DIRNAME } from '../constants.js'

export const incomingEmails = async (req, res, next) => {
  if (req.body['X-Mailgun-Incoming'] !== 'Yes') {
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlinkSync(path.resolve(DIRNAME, `src/uploads/${file.filename}`))
      })
    }
    return res.status(400).json('Invalid request')
  }

  const from = req.body.from.split('<')[0].trim()
  const sender = req.body.sender
  const recipient = req.body.recipient
  const subject = req.body.subject
  const html = req.body['stripped-html']

  const incomingEmail = new Support({
    from,
    sender,
    recipient,
    subject,
    html,
  })

  if (req.files) {
    const attachments = req.files.map((file) => {
      return {
        path: file.filename,
        mimetype: file.mimetype,
        originalName: file.originalname,
      }
    })

    incomingEmail.attachments = attachments
  }

  try {
    await incomingEmail.save()
    res.sendStatus(200)
  } catch (error) {
    res.status(500)
    next(new Error('something went wrong'))
  }
}

export const outgoingEmails = async (req, res, next) => {
  const sender = req.body.sender
  const recipient = req.body.recipient
  const subject = req.body.subject
  const html = req.body.html

  try {
    const user = await User.findOne({ email: recipient })

    const outputHTML = template.support({
      name: user ? `${user.firstName} ${user.lastName}` : null,
      html,
    })

    const data = {
      from: `Elgendy Autotronics Center <${sender}>`,
      to: [recipient],
      subject,
      html: outputHTML,
    }

    await sendEmail(data)

    const outGoingEmail = new Support({
      from: `Elgendy Autotronics Center`,
      sender,
      recipient,
      subject,
      isRead: true,
      html: outputHTML,
    })

    const savedEmail = await outGoingEmail.save()
    res.send({
      code: 200,
      success: true,
      email: savedEmail,
      message: 'E-mail sent successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const listAllEmails = async (req, res, next) => {
  const { limit, isStarred, isArchived, isSent, keyword } = req.query
  try {
    let matchFilter = {
      isArchived: false,
      $and: [
        { sender: { $ne: 'support@gendyecu.com' } },
        { sender: { $ne: 'noreplay@gendyecu.com' } },
      ],
    }

    if (isSent) {
      matchFilter = {
        isArchived: false,
        $or: [
          { sender: { $eq: 'support@gendyecu.com' } },
          { sender: { $eq: 'noreplay@gendyecu.com' } },
        ],
      }
    }

    if (isStarred) {
      const value = isStarred === 'true' ? true : false
      matchFilter = {
        isStarred: value,
        isArchived: false,
      }
    }
    if (isArchived) {
      const value = isArchived === 'true' ? true : false
      matchFilter = {
        isArchived: value,
      }
    }

    if (keyword) {
      if (isSent) {
        matchFilter = {
          ...matchFilter,
          $or: [
            {
              subject: {
                $regex: keyword,
                $options: 'i',
              },
              $or: [
                { sender: { $eq: 'support@gendyecu.com' } },
                { sender: { $eq: 'noreplay@gendyecu.com' } },
              ],
            },
            {
              recipient: {
                $regex: keyword,
                $options: 'i',
              },
              $or: [
                { sender: { $eq: 'support@gendyecu.com' } },
                { sender: { $eq: 'noreplay@gendyecu.com' } },
              ],
            },
          ],
        }
      } else {
        matchFilter = {
          ...matchFilter,
          $or: [
            {
              subject: {
                $regex: keyword,
                $options: 'i',
              },
            },
            {
              sender: {
                $regex: keyword,
                $options: 'i',
              },
            },
          ],
        }
      }
    }

    const supportEmails = await Support.find(matchFilter)
      .limit(limit || 15)
      .sort({ createdAt: -1 })
    const countNonRead = await Support.count({
      isRead: false,
      isArchived: false,
      $and: [
        { sender: { $ne: 'support@gendyecu.com' } },
        { sender: { $ne: 'noreplay@gendyecu.com' } },
      ],
    })

    res.send({
      code: 200,
      success: true,
      emails: supportEmails,
      inbox: countNonRead,
    })
  } catch (error) {
    next(error)
  }
}

export const getEmailData = async (req, res, next) => {
  const { id } = req.params

  try {
    const email = await Support.findById(id)
    if (!email) {
      res.status(404)
      throw new Error('Email not found')
    }
    res.send({
      code: 200,
      success: true,
      email,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteEmail = async (req, res, next) => {
  const { id } = req.params

  try {
    const email = await Support.findById(id)
    if (!email) {
      res.status(404)
      throw new Error('Email not found')
    }

    await email.remove()
    res.send({
      code: 200,
      success: true,
      message: 'Email deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const updateEmail = async (req, res, next) => {
  const { id } = req.params
  const { isStarred, isArchived, isRead } = req.body
  try {
    const email = await Support.findById(id)
    if (!email) {
      res.status(404)
      throw new Error('Email not found')
    }

    if (isStarred) {
      const value = isStarred === 'true' ? true : false
      email.isStarred = value
    }
    if (isArchived) {
      const value = isArchived === 'true' ? true : false
      email.isArchived = value
    }

    if (isRead) {
      email.isRead = isRead
    }

    const updatedEmail = await email.save()
    res.send({
      code: 200,
      success: true,
      email: updatedEmail,
    })
  } catch (error) {
    next(error)
  }
}
