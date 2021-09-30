import React, {useState} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import ImageCard from '../../components/ImageCard'
import {Overlay} from '../../components/Overlay'
import {Modal} from '../../components/Modal'
import {gallery} from '../../data'
import {useHistory} from 'react-router-dom'

const PhotoGallery = () => {
    const [showImage, setShowImage] = useState(false)
    const [imageSrc, setImageSrc] = useState(null)
    const [imageIndex, setImageIndex] = useState(0)
    const [isRightArrow, setIsRightArrow] = useState(true)
    const [isLeftArrow, setIsLeftArrow] = useState(true)
    const history = useHistory()
    
    const showImageHandler = (img, idx) => {
        setShowImage(true)
        setImageSrc(img)
        setImageIndex(idx)
        if(idx === 0) {
            setIsLeftArrow(false)
        }
        if(idx === gallery.length - 1){
            setIsRightArrow(false)
        }
    }
    
    const nextImageHandler = _ => {
        if(imageIndex >= gallery.length - 1){
            return 
        }
        if(imageIndex >= 0){
            setIsLeftArrow(true)
        }
        const image = gallery[imageIndex + 1].src
        setImageSrc(image)
        setImageIndex(imageIndex + 1)
        if(imageIndex  === gallery.length - 2){
            setIsRightArrow(false)
        }
    }
    
    const prevImageHandler = _ => {
        if(imageIndex <= 0){
            return 
        }
        if(imageIndex <= gallery.length - 1){
            setIsRightArrow(true)
        }
        const image = gallery[imageIndex - 1].src
        setImageSrc(image)
        setImageIndex(imageIndex - 1)
        if(imageIndex === 1){
            setIsLeftArrow(false)
        }
    }

    const closeModalHandler = _ => {
        setShowImage(false)
        setIsRightArrow(true)
        setIsLeftArrow(true)
    }
    return (
        <>
        <Overlay toggle={showImage} arrow 
        rightArrowHandler={nextImageHandler}
        leftArrowHandler={prevImageHandler}
        isRightArrow = {isRightArrow}
        isLeftArrow = {isLeftArrow}/>
        <Modal toggle={showImage} closeHandler={closeModalHandler} >
            <figure style={{minWidth:'40rem', maxHeight:'100vh'}}>
                <img src={`images/gallery/${imageSrc}`} alt="" 
                style={{width:'100%', height:'100%', objectFit:'cover'}}/>
            </figure>
        </Modal>
        <Template>
            <div className={style.photoGallery}>
                    <figure>
                        <img src="images/screen.jpg" alt="screen" />
                        <div className={style.photoGallery__switch}>
                            <h2>Photo Gallery</h2>
                            <button onClick={() => history.push('/videos-gallery')}>Switch to Video Gallery</button>
                        </div>
                    </figure>

                    <div className="container">
                        <div className={style.photoGallery__wrapper}>
                            {
                                gallery.map((gal, idx) => {
                                    return <ImageCard 
                                    key={gal.id} 
                                    src={gal.src} 
                                    name={gal.name} 
                                    num={gal.id}
                                    idx={idx}
                                    showImage={showImageHandler}/>
                                })
                            }
                        </div>
                    </div>
                </div>
        </Template>
        </>
    )
}
export default PhotoGallery
