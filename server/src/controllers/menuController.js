import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Menu from '../models/MenuModel.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const createItem = async (req, res, next) => {
  const { title, order, parent } = req.body

  try {
    if (parent) {
      const parentItem = await Menu.findById(parent)

      const isItemFound = parentItem.subItems.find(
        (item) => item.title['en'] === title['en']
      )
      if (isItemFound) {
        res.status(400)
        throw new Error('Menu item already exists')
      }

      const sameOrderItem = parentItem.subItems.find(
        (item) => item.order === parseInt(order)
      )
      if (sameOrderItem) {
        const sameOrderItems = parentItem.subItems.filter(
          (item) => item.order >= parseInt(order)
        )

        sameOrderItems.forEach((item) => {
          item.order += 1
        })
      }

      const parsedTitle = JSON.parse(title)

      const data = { title: parsedTitle, order }

      if (req.fileName) {
        data.image = req.fileName
      }

      parentItem.subItems.push(data)
      const savedItem = await parentItem.save()
      const targetItem = savedItem.subItems.find(
        (item) =>
          item.title['en'] === parsedTitle['en'] &&
          item.order === parseInt(order)
      )

      res.status(201).send({
        item: targetItem,
        message: 'Item added successfully',
        success: true,
      })
      return
    }

    const isFound = await Menu.findOne({ 'title.en': title['en'] })
    if (isFound) {
      res.status(400)
      throw new Error('Menu item already exists')
    }

    const items = await Menu.find()

    const sameOrderItem = items.find((item) => item.order === parseInt(order))
    if (sameOrderItem) {
      const sameOrderItems = items.filter(
        (item) => item.order >= parseInt(order)
      )

      for (const item of sameOrderItems) {
        item.order += 1
        await item.save()
      }
    }

    const data = { title: JSON.parse(title), order }
    if (req.fileName) data.image = req.fileName
    const item = await Menu.create(data)

    res.status(201).send({
      item,
      message: 'Item added successfully',
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const updateItem = async (req, res, next) => {
  const { title, order } = req.body
  const { id, parent } = req.params

  try {
    if (parent) {
      const parentItem = await Menu.findById(parent)

      const sameOrderItem = parentItem.subItems.find(
        (item) => item.order === parseInt(order)
      )
      const item = parentItem.subItems.find(
        (item) => item._id.toString() === id
      )
      if (sameOrderItem) {
        sameOrderItem.order = item.order
      }
      item.title = JSON.parse(title)
      item.order = order

      if (req.fileName) {
        item.image &&
          fs.unlinkSync(path.join(__dirname, '../../uploads/', item.image))
        item.image = req.fileName
      }

      await parentItem.save()

      res.status(201).send({
        item,
        message: 'Item updated successfully',
        success: true,
      })
      return
    }

    const items = await Menu.find()
    const item = await Menu.findById(id)

    const sameOrderItem = items.find((item) => item.order === parseInt(order))
    if (sameOrderItem) {
      sameOrderItem.order = item.order
      await sameOrderItem.save()
    }

    item.title = JSON.parse(title)
    item.order = order

    if (req.fileName) {
      item.image &&
        fs.unlinkSync(path.join(__dirname, '../../uploads/', item.image))
      item.image = req.fileName
    }

    await item.save()

    res.send({
      item,
      message: 'Item updated successfully',
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteItem = async (req, res, next) => {
  const { order } = req.query
  const { id, parent } = req.params

  try {
    if (parent) {
      const parentItem = await Menu.findById(parent)

      const items = parentItem.subItems.filter(
        (item) => item._id.toString() !== id
      )

      items.forEach((item) => {
        if (item.order > parseInt(order)) {
          item.order -= 1
        }
      })

      parentItem.subItems = items
      await parentItem.save()
      res.send({
        message: 'Item deleted successfully',
        success: true,
      })
      return
    }

    const items = await Menu.find()

    for (const item of items) {
      if (item.order > parseInt(order)) {
        item.order -= 1
        await item.save()
      }
    }
    const item = await Menu.findById(id)
    await item.remove()
    res.send({
      message: 'Item deleted successfully',
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const listAllItems = async (req, res, next) => {
  try {
    const items = await Menu.find().sort({ order: 1 })
    res.send({
      items,
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const listAllPages = async (req, res, next) => {
  try {
    const items = await Menu.find()
    const pages = []

    for (const item of items) {
      if (item.subItems.length) {
        item.subItems.forEach((subItem) => pages.push(subItem.title['en']))
      } else {
        pages.push(item.title['en'])
      }
    }

    res.send({
      code: 200,
      success: true,
      pages,
    })
  } catch (error) {
    next(error)
  }
}
