import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Template from '../../components/Template'
import VideoCard from '../../components/VideoCard'
import Loader from '../../components/Loader'
import strings from '../../localization'
import actions from '../../actions'

// const videos = [
//   {
//     id: uuidv4(),
//     title: 'الحل النهائى لمشكلة إستهلاك البنزين',
//     link: 'https://www.youtube.com/embed/JnVIKfnZrRs',
//   },
//   {
//     id: uuidv4(),
//     title: 'لو عربيتك مش راضية تشتغل تعمل ايه',
//     link: 'https://www.youtube.com/embed/QxUkOsTmWCA',
//   },
//   {
//     id: uuidv4(),
//     title: 'اثناء التدريب علي اللحام من فاعليات كورس صيانة كنترول السيارة',
//     link: 'https://www.youtube.com/embed/0BEscARVp3g',
//   },
//   {
//     id: uuidv4(),
//     title:
//       'تجهيزات القسم النظري الخاص بإصلاح وبرمجة كنترول السيارات بالأكاديمية ',
//     link: 'https://www.youtube.com/embed/1v4SEkNmISI',
//   },
//   {
//     id: uuidv4(),
//     title: 'اختبار كنترول فولكس فاجن على الطاولة بواسطة المتدربين',
//     link: 'https://www.youtube.com/embed/_AxwaXW6bgQ',
//   },
//   {
//     id: uuidv4(),
//     title: 'اختبار كنترول السيارة بواسطة الأسوليسكوب واختبار اشارات الأيسيهات',
//     link: 'https://www.youtube.com/embed/ATW1WM82k78',
//   },
//   {
//     id: uuidv4(),
//     title: 'كل ما تحتاج معرفته عن شبكة الإتصال بين الكنترولات كان باص CAN BUS',
//     link: 'https://www.youtube.com/embed/JpHCCmWjrPc',
//   },
//   {
//     id: uuidv4(),
//     title:
//       'ازاي تعرف إن المشكلة في كنترول السيارة (الإجراءات المتبعة للوصول للمشكلة)',
//     link: 'https://www.youtube.com/embed/eqqclQHj08E',
//   },
//   {
//     id: uuidv4(),
//     title: 'مشاكل علبة البيئة وحلولها /// كود p0420 الحلقة الأولى',
//     link: 'https://www.youtube.com/embed/Ly_snBsolDs',
//   },
//   {
//     id: uuidv4(),
//     title:
//       'أثناء التدريب العملي خلال الدورة التدريبية لإصلاح وبرمجة كنترول السيارات',
//     link: 'https://www.youtube.com/embed/Q5_IYASF3cs',
//   },
// ]

const VideoGallery = () => {
  const [skip, setSkip] = useState(0)

  const history = useHistory()
  const { lang } = useSelector((state) => state.language)
  const {
    images: videos,
    count,
    isLoading,
  } = useSelector((state) => state.listGalleryItems)
  const dispatch = useDispatch()

  const nextHandlerVideos = () => {
    const skipValue = skip + 15
    if (skipValue < count) {
      setSkip(skipValue)
      dispatch(
        actions.content.listGalleryItems({
          type: 'video',
          skip: String(skipValue),
        })
      )
    }
  }
  const prevHandlerVideos = () => {
    if (skip >= 5) {
      console.log({ skip })
      const skipValue = skip - 15
      setSkip(skipValue)
      dispatch(
        actions.content.listGalleryItems({
          type: 'video',
          skip: String(skipValue),
        })
      )
    }
  }

  useEffect(() => {
    dispatch(
      actions.content.listGalleryItems({ type: 'video', skip: String(skip) })
    )
  }, [])

  return (
    <Template>
      <div className={style.videoGallery}>
        <figure>
          <img src='images/img-2.png' alt='screen' />
          <div className={style.videoGallery__switch}>
            <h2>{strings.gallery[lang].video_gallery}</h2>
            <button onClick={() => history.push('/gallery')}>
              {strings.gallery[lang].photo_switch}
            </button>
          </div>
        </figure>
        <div
          className='container'
          style={{ display: 'grid', placeItems: 'center' }}
        >
          <div className={style.videoGallery__wrapper}>
            {isLoading ? (
              <Loader size='8' center custom={{ top: '10%' }} />
            ) : videos && videos.length === 0 ? (
              <img
                className={style.videoGallery__noVideos}
                src='/images/no-videos-available.png'
                alt='not found'
              />
            ) : (
              videos &&
              videos.map((video, idx) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  lang={lang}
                  strings={strings}
                />
              ))
            )}
          </div>
        </div>
        {count && count > 15 && (
          <div className={style.photoGallery__pagination}>
            <button onClick={prevHandlerVideos}>
              {lang === 'en' ? 'prev' : 'السابق'}
            </button>
            <button onClick={nextHandlerVideos}>
              {lang === 'en' ? 'next' : 'التالى'}
            </button>
          </div>
        )}
      </div>
    </Template>
  )
}

export default VideoGallery
