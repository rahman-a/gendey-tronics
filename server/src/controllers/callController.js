import Call from '../models/callsModal.js'
import strings from '../localization.js'

export const bookingCall = async (req, res, next) => {
  const { lang } = req.headers
  const { phone } = req.body
  const newCall = new Call({ ...req.body })
  try {
    const isFound = await Call.findOne({
      phone,
      user: req.user._id,
      isDone: false,
    })
    if (isFound && !isFound.isDone) {
      res.status(400)
      throw new Error(strings.contact[lang].already_booked)
    }
    const call = await newCall.save()
    res.json({
      success: true,
      code: 201,
      message: strings.contact[lang].booked_call,
      call: call._id,
    })
  } catch (error) {
    next(error)
  }
}

export const latestCalls = async (req, res, next) => {
  try {
    const calls = await Call.find({ isDone: false })
      .sort({ createdAt: -1 })
      .limit(5)
    const count = await Call.count({ isDone: false })
    const mappedCalls = calls.map((call) => {
      return {
        id: call._id,
        title: `A new booking from ${call.phone}`,
        content: `${call.phone} ask for call using ${call.method}`,
        phone: call.phone,
      }
    })

    res.send({
      code: 200,
      success: true,
      count,
      calls: mappedCalls,
    })
  } catch (error) {
    next(error)
  }
}

export const listAllCalls = async (req, res, next) => {
  const { lang } = req.headers
  const { page, skip, phone, method, isDone, date } = req.query

  try {
    let searchFilter = {}
    if (phone) {
      searchFilter = {
        ...searchFilter,
        phone,
      }
    }

    if (method) {
      searchFilter = {
        ...searchFilter,
        method,
      }
    }

    if (isDone) {
      const value = isDone === 'true'
      searchFilter = {
        ...searchFilter,
        isDone: value,
      }
    }

    if (date) {
      const offsetDate = new Date(date)
      offsetDate.setDate(offsetDate.getDate() + 1)
      searchFilter = {
        ...searchFilter,
        date: {
          $gte: new Date(date),
          $lte: new Date(offsetDate),
        },
      }
    }

    const calls = await Call.find(searchFilter)
      .sort({ createdAt: -1 })
      .limit(parseInt(page) || 10)
      .skip(parseInt(skip) || 0)
      .populate('user', 'firstName lastName phoneNumber email')
      .populate('product', 'name')

    const count = await Call.count({})

    if (!calls || calls.length < 1) {
      res.status(404)
      throw new Error(strings.contact[lang].no_calls_booked)
    }
    res.json({
      success: true,
      code: 200,
      count,
      calls,
    })
  } catch (error) {
    next(error)
  }
}

export const toggleCallActiveState = async (req, res, next) => {
  const { id } = req.params
  const { lang } = req.headers

  try {
    const call = await Call.findById(id)
    if (!call) {
      res.status(404)
      throw new Error(strings.contact[lang].no_call)
    }
    call.isDone = !call.isDone
    const message = call.isDone
      ? strings.contact[lang].done_call
      : strings.contact[lang].active_call
    await call.save()
    res.json({
      success: true,
      code: 200,
      message,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteCall = async (req, res, next) => {
  const { lang } = req.headers
  const { id } = req.params
  try {
    const call = await Call.findById(id)
    if (!call) {
      res.status(404)
      throw new Error(strings.contact[lang].no_call)
    }
    await call.remove()
    res.json({
      success: true,
      code: 200,
      message: strings.contact[lang].call_delete,
    })
  } catch (error) {
    next(error)
  }
}
