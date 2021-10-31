import React, {useState} from 'react'
import style from './style.module.scss'
import {PlayCircle, Logo} from '../icons'
import {Modal} from '../Modal'
import {Overlay} from '../Overlay'

const VideoCard = () => {
    const [playVideo, setPlayVideo] = useState(false)
    return (
        <>
        <Overlay toggle={playVideo}/>
        <Modal toggle={playVideo} closeHandler={() => setPlayVideo(false)} color='#fff'>
            {playVideo && <iframe
            className={style.videoCard__frame}
            src="https://www.youtube.com/embed/oe70Uhjc_F4" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; 
            autoplay; 
            clipboard-write; 
            encrypted-media; 
            gyroscope; 
            picture-in-picture" 
            allowFullScreen></iframe>}
        </Modal>
        <div className={style.videoCard}>
            <figure>
                <img src="images/img-1.png" alt="thumbnail" />
               <span onClick={() => setPlayVideo(true)}><PlayCircle/></span> 
            </figure>
            <div className={style.videoCard__content}>
                <h3>car repairing system mini courses</h3>
                <div className={style.videoCard__options}>
                    <div className={style.videoCard__maker}>
                        <Logo/>
                        <h4>gendytronics</h4>
                    </div>
                    <div className={style.videoCard__views}>
                        <span className={style.videoCard__views_tube}></span>
                        <span>3,222 views</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default VideoCard
