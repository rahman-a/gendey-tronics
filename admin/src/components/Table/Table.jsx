import React from 'react'
import style from './style.module.scss'

const Table = ({ children, className }) => {
  return (
    <div className={style.records}>
      <table className={className}>{children}</table>
    </div>
  )
}

export default Table
