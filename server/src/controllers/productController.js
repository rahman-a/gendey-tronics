import fs from 'fs'
import path from 'path'
import Product from '../models/productModal.js'
import Wishlist from '../models/wishlistModal.js'
import strings from '../localization.js'
import mappingProducts from '../mappingProducts.js'
import crypto from 'crypto'

export const createNewProduct = async (req, res, next) => {
  const { lang } = req.headers
  const { options } = req.body
  const newProduct = new Product({
    ...req.body,
    options: JSON.parse(options),
  })

  if (req.files) {
    newProduct.images = req.files.map((file) => ({ src: file.filename }))
  }
  try {
    const isFound = await Product.findOne({ name: req.body.name })
    if (isFound) {
      res.status(400)
      throw new Error(strings.product[lang].product_exist)
    }
    const product = await newProduct.save()
    res.status(201).json({
      success: true,
      code: 201,
      message: strings.product[lang].create_product,
      product,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const listAllProduct = async (req, res, next) => {
  const { name, type, price, quantity, page, skip, isPublic, isMainPage } =
    req.query
  const { lang } = req.headers
  let searchFilter = {}
  console.log('List All Products....?!!')
  try {
    console.log({ query: req.query })
    if (type) {
      searchFilter = {
        ...searchFilter,
        type: {
          $regex: type.split('-').join(' '),
          $options: 'i',
        },
      }
    }
    if (name) {
      searchFilter = {
        ...searchFilter,
        name: {
          $regex: name,
          $options: 'i',
        },
      }
    }
    if (price) {
      const priceRange = price.split('-')
      if (priceRange.length > 1) {
        const firstRange = parseInt(priceRange[0])
        const secondRange = parseInt(priceRange[1])

        searchFilter = {
          ...searchFilter,
          price: {
            $gte: firstRange,
            $lte: secondRange,
          },
        }
      } else {
        searchFilter = {
          ...searchFilter,
          price: parseInt(priceRange[0]),
        }
      }
    }
    if (quantity) {
      const quantityRange = quantity.split('-')
      if (quantityRange.length > 1) {
        const firstRange = parseInt(quantityRange[0])
        const secondRange = parseInt(quantityRange[1])

        searchFilter = {
          ...searchFilter,
          quantity: {
            $gte: firstRange,
            $lte: secondRange,
          },
        }
      } else {
        searchFilter = {
          ...searchFilter,
          quantity: parseInt(quantityRange[0]),
        }
      }
    }

    if (isPublic) {
      const value = isPublic === 'true'
      searchFilter = {
        ...searchFilter,
        isListed: value,
      }
    }

    const count = await Product.count({ ...searchFilter })

    const products = await Product.find({ ...searchFilter })
      .limit(parseInt(page) || 0)
      .skip(parseInt(skip) || 0)
      .sort({ createdAt: -1 })

    if (!products || products.length < 1) {
      res.status(404)
      throw new Error(strings.product[lang].no_product)
    }
    const mappedProducts = isMainPage ? mappingProducts(products) : products
    res.json({
      success: true,
      code: 200,
      count,
      products: mappedProducts,
    })
  } catch (error) {
    next(error)
  }
}

export const getOneProduct = async (req, res, next) => {
  const { id } = req.params
  const { lang } = req.headers

  try {
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw new Error(strings.product[lang].no_product)
    }
    const isFav = req.user
      ? await Wishlist.findOne({ item: id, user: req.user._id })
      : null
    const targetedProduct = { ...product._doc, isFav: isFav ? true : false }
    res.json({
      success: true,
      code: 200,
      product: targetedProduct,
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  const updatedData = req.body
  const { lang } = req.headers
  const { id } = req.params
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.status(404)
      throw new Error(strings.product[lang].no_product)
    }

    const allowedKeys = [
      'name',
      'description',
      'price',
      'quantity',
      'type',
      'video',
      'short',
      'options',
      'link',
    ]

    if (Object.keys(updatedData).length < 1) {
      res.status(400)
      throw new Error(strings.user[lang].require_data)
    }

    for (let key in updatedData) {
      if (allowedKeys.includes(key)) {
        if (updatedData[key]) {
          if (key === 'link') {
            product.driveFile = product.driveFile.concat(updatedData[key])
          } else {
            product[key] = updatedData[key]
          }
        } else {
          res.status(400)
          throw new Error(`please provide a value for ${key}`)
        }
      } else {
        res.status(400)
        throw new Error(`${key} is Unknown, please choose a verified key`)
      }
    }

    const newProduct = await product.save()

    res.json({
      success: true,
      code: 200,
      message: strings.product[lang].product_update,
      product: newProduct,
    })
  } catch (error) {
    next(error)
  }
}

export const updateProductImage = async (req, res, next) => {
  const { id } = req.params
  const { lang } = req.headers

  try {
    if (!req.fileName) {
      res.status(400)
      throw new Error(strings.product[lang].image_upload_require)
    }
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw new Error(strings.product[lang].no_product)
    }
    if (product.image) {
      product.images = product.images.concat({ src: product.image })
      product.image = undefined
    }
    product.images = product.images.concat({ src: req.fileName })
    const savedProduct = await product.save()
    const savedImage = savedProduct.images.find(
      (image) => image.src === req.fileName
    )
    res.json({
      success: true,
      code: 200,
      id: product._id,
      image: savedImage,
      message: strings.product[lang].image_upload,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProductImage = async (req, res, next) => {
  const { id, imageId } = req.params
  const { lang } = req.headers
  try {
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw new Error(strings.product[lang].no_product)
    }
    if (product.images.length < 2) {
      res.status(400)
      throw new Error(strings.product[lang].product_require_image)
    }
    const image = product.images.find(
      (image) => image._id.toString() === imageId
    )
    if (!image) {
      res.status(404)
      throw new Error(strings.product[lang].no_image)
    }
    fs.unlink(path.resolve(`server/uploads/${image.image}`), async () => {
      product.images = product.images.filter(
        (image) => image._id.toString() !== imageId
      )
      await product.save()
      res.json({
        success: true,
        code: 200,
        message: strings.product[lang].image_delete,
      })
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProductLink = async (req, res, next) => {
  const { id, link } = req.params

  try {
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw new Error(strings.product[lang].no_product)
    }
    product.driveFile = product.driveFile.filter(
      (lk) => lk._id.toString() !== link
    )
    await product.save()
    res.send({
      success: true,
      code: 200,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params
  const { lang } = req.headers

  try {
    const product = await Product.findById(id)
    if (!product) {
      res.status(404)
      throw new Error(strings.product[lang].no_product)
    }
    await product.remove()
    res.json({
      success: true,
      code: 200,
      message: `${product.name} ${strings.product[lang].product_delete}`,
      product: product._id,
    })
  } catch (error) {
    next(error)
  }
}

export const toggleProductListing = async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)
    product.isListed = !product.isListed

    const updatedProduct = await product.save()

    res.send({
      success: true,
      code: 200,
      isListed: updatedProduct.isListed,
    })
  } catch (error) {
    next(error)
  }
}
