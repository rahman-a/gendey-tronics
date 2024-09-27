import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from './style.module.scss'
import { Trash } from '../../icons'
import { Loader } from '../../components'
import actions from '../../actions'

const Image = ({ src, id, idx, showImageHandler }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { message } = useSelector((state) => state.deleteMedia)
  const dispatch = useDispatch()

  const deleteMediaHandler = (e) => {
    e.stopPropagation()
    setIsLoading(true)
    dispatch(actions.media.deleteMedia(id))
  }

  useEffect(() => {
    message && setIsLoading(false)
  }, [message])

  return (
    <figure
      className={style.photos__image}
      onClick={() => showImageHandler(src, idx)}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/images/${src}`}
        alt='gallery'
      />
      <div>
        {isLoading ? (
          <Loader
            size='2.5'
            options={{ animation: 'border' }}
            custom={{ color: '#fff', padding: 0 }}
          />
        ) : (
          <span onClick={deleteMediaHandler}>
            {' '}
            <Trash />{' '}
          </span>
        )}
      </div>
    </figure>
  )
}

export default Image
