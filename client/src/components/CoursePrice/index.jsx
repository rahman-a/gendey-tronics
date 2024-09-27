import styles from './style.module.scss'

export default function CoursePrice({ originalPrice, discount, finalPrice }) {
  return (
    <div className={styles.price}>
      {discount > 0 ? (
        <div className={styles.price__container}>
          <span className={styles.price__original}>{`$${originalPrice}`}</span>
          <span className={styles.price__final}>{`$${finalPrice}`}</span>
        </div>
      ) : (
        `$${finalPrice}`
      )}
    </div>
  )
}
