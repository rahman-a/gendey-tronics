import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Check } from '../icons'
import strings from '../../localization'
import { useSelector } from 'react-redux'

const LearnPoints = ({ data }) => {
  const [points, setPoints] = useState(null)
  const { lang } = useSelector((state) => state.language)

  useEffect(() => {
    if (data) {
      const sortedData = data.sort((a, b) => a.order - b.order)
      setPoints(sortedData)
    }
  }, [data])
  return (
    <div
      className={`${style.points}
            ${lang === 'ar' ? style.points_ar : ''}`}
    >
      <h2>{strings.course[lang].points}</h2>
      <ul className={style.points__list}>
        {points &&
          points.map((point) => (
            <li className={style.points__item} key={point._id}>
              <span>
                <Check />
              </span>
              {point.point}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default LearnPoints
