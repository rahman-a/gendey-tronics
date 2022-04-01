import Slider from '../models/sliderModal.js'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url)) 

export const createSlider = async (req, res, next) => {
    
    const {target} = req.body
    const sliderTarget = JSON.parse(target)
    const newSlider = new Slider(req.body)
    newSlider.target = sliderTarget

    try {

        switch (sliderTarget.type) {
            case 'product':
                newSlider.onModal = 'Product'
                break;
            case 'course':
                newSlider.onModal = 'Course'
                break;
            case 'blog':
                newSlider.onModal = 'Blog'
                break;
            default:
                break;
        }

        if(req.file) {
            newSlider.image = req.file.filename
        }
        
        const slider = await newSlider.save()
        
        res.status(201).json({
            code:200,
            success:true,
            message:'Slider created successfully',
            slider
        })
    } catch (error) {
        next(error)
    }
}

export const deleteSlider = async (req, res, next) => {
    try {
        const slider = await Slider.findById(req.params.id)
        if(!slider) {
            throw new Error('Slider not found')
        }
        
        fs.unlinkSync(path.resolve(__dirname, `../../uploads/${slider.image}`))
        
        await slider.remove()
        
        res.status(200).json({
            code:200,
            success:true,
            message:'Slider deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const listSliders = async (req, res, next) => {
    try {
        const sliders = await Slider.find().populate({
            path:'target',
            populate:{
                path:'itemId',
                select:'name title'
            }
        })
        
        res.status(200).json({
            code:200,
            success:true,
            sliders
        })
    
    } catch (error) {
        next(error)
    }
}
