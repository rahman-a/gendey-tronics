import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import VideoCard from '../../components/VideoCard'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import strings from '../../localization'

const VideoGallery = () => {
    const history = useHistory()
    const {lang} = useSelector(state => state.language)
    return (
        <Template>
            <div className={style.videoGallery}>
                    <figure>
                        <img src="images/img-2.png" alt="screen" />
                        <div className={style.videoGallery__switch}>
                            <h2>{strings.gallery[lang].video_gallery}</h2>
                            <button onClick={() => history.push('/photo-gallery')}>{strings.gallery[lang].photo_switch}</button>
                        </div>
                    </figure>
                <div className="container" style={{display:'grid', placeItems:'center'}}>
                    <div className={style.videoGallery__wrapper}>
                        {
                            [...Array(6)].map((_ ,idx)=> <VideoCard key={idx} lang={lang} strings={strings}/>)
                        }
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default VideoGallery
