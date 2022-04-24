import React from 'react'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import { ArrowRight } from '../../icons'

const BackButton = ({ page, title, position }) => {
  const navigate = useHistory().push
  const getStyle = (_) => {
    let style = {
      top: '10rem',
      left: '10rem',
    }
    if (position === 'right') {
      style = {
        top: '10rem',
        right: '10rem',
      }
    }
    return style
  }

  const arrowStyle = (_) => {
    let style = {
      transform: 'rotate(180deg) translate(0, -2px)',
    }
    if (position === 'right') {
      style = {
        transform: 'translate(0px, -2px)',
        position: 'absolute',
        right: '-2rem',
        top: '1px',
      }
    }
    return style
  }
  return (
    <button
      className={style.back}
      onClick={() => navigate(`/${page}`)}
      style={getStyle()}
    >
      <span style={arrowStyle()}>
        <ArrowRight />
      </span>
      <span style={{ fontSize: '1.6rem' }}> back to {title} </span>
    </button>
  )
}

export default BackButton
