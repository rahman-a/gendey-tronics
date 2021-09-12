import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import VideoCard from '../../components/VideoCard'

const VideoGallery = () => {
    return (
        <Template>
            <div className={style.videoGallery}>
                    <figure>
                        <img src="images/img-2.png" alt="screen" />
                        <div className={style.videoGallery__switch}>
                            <h2>Video Gallery</h2>
                            <button>Switch to Photo Gallery</button>
                        </div>
                    </figure>
                <div className="container" style={{display:'grid', placeItems:'center'}}>
                    <div className={style.videoGallery__wrapper}>
                        {
                            [...Array(6)].map((_ ,idx)=> <VideoCard key={idx}/>)
                        }
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default VideoGallery
