import fs from 'fs'
import path from 'path'
import Blog from '../models/blogModel.js'
import strings from '../localization.js'

export const createNewBlog = async (req, res, next) => {
    const {lang}  = req.headers
    const newBlog = new Blog({
        ...req.body,
        author:req.user._id,
        image:req.fileName
    })
    try {
        const isFound = await Blog.findOne({title: req.body.title})
        if(isFound) {
            res.status(400)
            throw new Error(strings.blog[lang].blog_exist)
        }
        const blog = await newBlog.save()
        res.status(201).json({
            success:true,
            code:201,
            message:strings.blog[lang].blog_create,
            blog:blog._id
        })
    } catch (error) {
        next(error)   
    }
}


export const listAllBlogs =  async (req, res, next) => {
    const {lang}  = req.headers
    const {title, page, skip} = req.query
    let searchFilter = {}
    console.log('Language', req.headers.lang);
    try {
        if(title) {
            searchFilter = {
                title: {
                    $regex:title,
                    $option:'i'
                }
            }
        }
        const count = await Blog.count({...searchFilter})
        const blogs = await Blog.find({...searchFilter})
        .limit(parseInt(page) || 10).skip(parseInt(skip) || 0)
        if(!blogs || blogs.length < 1) {
            res.status(404)
            throw new Error(strings.blog[lang].no_blogs)
        }
        res.json({
            success:true,
            code:200,
            blogs,
            count
        })
    } catch (error) {
        next(error)
    }
}

export const getOneBlog = async (req, res, next) => {
    const {lang}  = req.headers
    const {id} = req.params 
    try {
        const blog = await Blog.findById(id).populate({
            path:'author',
            select:'firstName lastName'
        }).populate({
            path:'comments',
            populate:{
                path:'user',
                select:'firstName lastName'
            }
        })
        if(!blog) {
            res.status(404)
            throw new Error(strings.blog[lang].no_blog)
        }
        res.json({
            success:true,
            code:200,
            blog
        })
    } catch (error) {
        next(error)
    }
}

export const updateBlog = async (req, res, next) => {
    const {lang}  = req.headers
    const updatedData = req.body
    const {id} = req.params
    try {
        const blog = await Blog.findById(id) 
        if(!blog) {
            res.status(404)
            throw new Error(strings.blog[lang].no_blog)
        }
        const allowedKeys = ['title', 'body']
        if(Object.keys(updatedData).length < 1) {
            res.status(400)
            throw new Error(strings.user[lang].require_data)
        }
        for(let key in updatedData) {
            if(allowedKeys.includes(key)) {
                if(updatedData[key]) {
                    blog[key] = updatedData[key]
                }else {
                    res.status(400)
                    throw new Error (`please provide a value for ${key}`)
                }
            } else {
                res.status(400)
                throw new Error (`${key} is Unknown, please choose a verified key`) 
            }
        }
        await blog.save()
        res.json({
            success:true,
            code:200,
            message:strings.blog[lang].blog_update,
            blog: blog._id
        })
    } catch (error) {
        next(error)
    }
}

export const controlBlogVisibility = async (req, res, next) => {
    const {lang}  = req.headers
    const {id} = req.params 
    try {
        const blog = await Blog.findById(id) 
        if(!blog) {
            res.status(404)
            throw new Error(strings.blog[lang].no_blog)
        }
        blog.seen = blog.seen + 1 
        await blog.save()
        res.json({
            success:true,
            code:200,
            seen:blog.seen
        })
    } catch (error) {
        next(error)
    }
}

export const updateBlogImage = async (req, res, next) => {
    const {lang}  = req.headers
    const {id} = req.params 
    try {
        if(!(req.fileName)) {
            res.status(400)
            throw new Error(strings.product[lang].image_upload_require)
        }
        const blog = await Blog.findById(id) 
        if(!blog) {
            res.status(404)
            throw new Error(strings.blog[lang].no_blog)
        }
        fs.unlink(path.resolve(`server/uploads/${blog.image}`), async () => {      
            blog.image = req.fileName 
            await blog.save()
            res.json({
                success:true, 
                code:200,
                message:strings.product[lang].image_upload
            })
        })
    } catch (error) {
        next(error)
    }
}

export const deleteBlog = async (req, res, next) => {
    const {lang}  = req.headers
    const {id} = req.params 
    try {
        const blog = await Blog.findById(id) 
        if(!blog) {
            res.status(404)
            throw new Error(strings.blog[lang].no_blog)
        }
        await blog.remove()
        res.json({
            success:true,
            code:200,
            message:strings.blog[lang].blog_delete,
            blog:blog._id
        })
    } catch (error) {
        next(error)
    }
}

// Blog Comments

export const addBlogComment = async (req, res, next) => {
    const {lang}  = req.headers
    const {id} = req.params
    const newComment = {
        ...req.body,
        user:req.user._id
    }
    try {
        const blog  = await Blog.findById(id)
        if(!blog) {
            res.status(404)
            throw new Error(strings.blog[lang].comment_no_blog)
        }
        const isCommentFound = blog.comments.find(comment => comment.user.toString() === req.user._id.toString())
        if(isCommentFound) {
            res.status(400)
            throw new Error(strings.blog[lang].already_comment_blog)
        }
        blog.comments = blog.comments.concat(newComment)
        const savedBlog = await blog.save()
        const targetedBlog = await Blog.findById(savedBlog._id).populate({
            path:'comments',
            populate:{
                path:'user',
                select:'firstName lastName'
            }
        })
        const targetedComment = targetedBlog.comments
        .find(comment => comment.user._id.toString() === req.user._id.toString())
         res.status(201).json({
             success:true,
             code:201,
             comment:targetedComment,
             message:strings.blog[lang].blog_comment_add,
         })
    } catch (error) {
        next(error)
    }
 
 }

 export const listAllComments = async (req, res, next) => {
    const {lang}  = req.headers 
    const {id} = req.params
     const {page, skip} = req.query
     try {
         const blog = await Blog.findById(id)
         if(!blog) {
             res.status(404)
             throw new Error(strings.blog[lang].no_blog)
         }
         if(!(blog.comments) || blog.comments.length < 1) {
            res.status(404)
            throw new Error(strings.blog[lang].blog_no_comments)
         }
         const allComments = blog.comments.slice(parseInt(skip), (parseInt(page) + parseInt(skip))) 
         if(allComments.length < 1) {
            res.status(404)
            throw new Error(strings.blog[lang].blog_end_comments)
         }
         res.json({
             success:true,
             code:200,
             comments:allComments
         })
     } catch (error) {
         next(error)
     }
 }

 export const deleteComment = async (req, res, next) => {
    const {lang}  = req.headers 
    const {id} = req.params 
     try {
        const blog = await Blog.findById(id)
        if(!blog) {
            res.status(404)
            throw new Error(strings.blog[lang].no_blog)
        }
        const comment = blog.comments.find(comment => comment.user.toString() === req.user._id.toString()) 
        if(!comment) {
            res.status(404)
            throw new Error(strings.blog[lang].blog_no_comments)
        }
        blog.comments = blog.comments.filter(comment => comment.user.toString() !== req.user._id.toString())
        await blog.save()
        res.json({
            success:true,
            code:200,
            message:strings.blog[lang].blog_comment_delete,
            comment: comment._id
        })
     } catch (error) {
         next(error)
     }
 }