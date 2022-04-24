import React from 'react'
import style from './style.module.scss'
import { Overlay, CardModal } from '../../components'

const PlayVideo = ({ url, isPlayVideo, setIsPlayVideo }) => {
  return (
    <>
      <Overlay toggle={isPlayVideo} />
      <CardModal
        toggle={isPlayVideo}
        closeHandler={() => setIsPlayVideo(false)}
        color='#fff'
      >
        {isPlayVideo && (
          <iframe
            className={style.videos__frame}
            src={url}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture'
            allowFullScreen
          ></iframe>
        )}
      </CardModal>
    </>
  )
}

export default PlayVideo
