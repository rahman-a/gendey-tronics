import fs from 'fs'
import path from 'path'
import Product from '../models/productModal.js'
import Wishlist from '../models/wishlistModal.js'
import strings from '../localization.js'

export const createNewProduct = async (req, res, next) => {
    const {lang} = req.headers
    const {options} = req.body 
    const newProduct = new Product({
        ...req.body,
        options:JSON.parse(options),
        image:req.fileName
    })
    try {
        const isFound = await Product.findOne({name: req.body.name})
        if(isFound) {
            res.status(400)
            throw new Error(strings.product[lang].product_exist)
        }
        const product = await newProduct.save()
        res.status(201).json({
            success:true,
            code:201,
            message:strings.product[lang].create_product,
            product
        })
    } catch (error) {
        console.log(error);
        next(error)   
    }
}

export const listAllProduct =  async (req, res, next) => {
    const {name, type, price, quantity, page, skip} = req.query
    const {lang} = req.headers
    let searchFilter = {}
    try {
        console.log({query:req.query});
        if(type) {
            searchFilter = {
                ...searchFilter,
                type: {
                    $regex:type.split('-').join(' '),
                    $options:'i'
                }
            }
        }
        if(name) {
            searchFilter = {
                ...searchFilter,
                name: {
                    $regex:name,
                    $options:'i'
                }
            }
        }
        if(price) {
            const priceRange = price.split('-')
            if(priceRange.length > 1) {
                const firstRange = parseInt(priceRange[0])
                const secondRange = parseInt(priceRange[1])
                
                searchFilter = {
                    ...searchFilter,
                    price: {
                        $gte:firstRange,
                        $lte:secondRange
                    }
                }
            } else {
                searchFilter = {
                    ...searchFilter,
                    price:parseInt(priceRange[0])
                } 
            }
        }
        if(quantity) {
            const quantityRange = quantity.split('-')
            if(quantityRange.length > 1) {
                const firstRange = parseInt(quantityRange[0])
                const secondRange = parseInt(quantityRange[1])
                
                searchFilter = {
                    ...searchFilter,
                    quantity: {
                        $gte:firstRange,
                        $lte:secondRange
                    }
                }
            } else {
                searchFilter = {
                    ...searchFilter,
                    quantity:parseInt(quantityRange[0])
                } 
            }
        }

        const count = await Product.count({...searchFilter})
        
        const products = await Product.find({...searchFilter})
        .limit(parseInt(page) || 0).skip(parseInt(skip) || 0).sort({createdAt:-1})
        
        if(!products || products.length < 1) {
            res.status(404)
            throw new Error(strings.product[lang].no_product)
        }
        
        res.json({
            success:true,
            code:200,
            products,
            count
        })
    } catch (error) {
        next(error)
    }
}

export const getOneProduct = async (req, res, next) => {
    const {id} = req.params
    const {lang} = req.headers
 
    try {
        const product = await Product.findById(id) 
        if(!product) {
            res.status(404)
            throw new Error(strings.product[lang].no_product)
        }
        const isFav = req.user ? await Wishlist.findOne({item:id, user:req.user._id}) :null
        const targetedProduct = {...product._doc, isFav: isFav ? true: false}
        res.json({
            success:true,
            code:200,
            product:targetedProduct
        })
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    const updatedData = req.body
    const {lang} = req.headers
    const {id} = req.params
    try {
        const product = await Product.findById(id) 
        
        if(!product) {
            res.status(404)
            throw new Error(strings.product[lang].no_product)
        }
        
        const allowedKeys = ['name', 'description', 'price', 
        'quantity', 'type', 'video', 'short', 'options']
        
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(updatedData[key]) {
                    product[key] = updatedData[key]
                }else {
                    res.status(400)
                    throw new Error (`please provide a value for ${key}`)
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        
       const newProduct  = await product.save()
        
        res.json({
            success:true,
            code:200,
            message:strings.product[lang].product_update,
            product: newProduct
        })
    } catch (error) {
        next(error)
    }
}

export const updateProductImage = async (req, res, next) => {
    const {id} = req.params 
    const {lang} = req.headers

    try {
        if(!(req.fileName)) {
            res.status(400)
            throw new Error(strings.product[lang].image_upload_require)
        }
        const product = await Product.findById(id) 
        if(!product) {
            res.status(404)
            throw new Error(strings.product[lang].no_product)
        }
        fs.unlink(path.resolve(`server/uploads/${product.image}`), async () => {
            product.image = req.fileName 
            await product.save()
            res.json({
                success:true, 
                code:200,
                id:product._id,
                image:req.fileName,
                message:strings.product[lang].image_upload
            })
        })
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    const {id} = req.params
    const {lang} = req.headers

    try {
        const product = await Product.findById(id) 
        if(!product) {
            res.status(404)
            throw new Error(strings.product[lang].no_product)
        }
        await product.remove()
        res.json({
            success:true,
            code:200,
            message:`${product.name} ${strings.product[lang].product_delete}`,
            product:product._id
        })
    } catch (error) {
        next(error)
    }
}