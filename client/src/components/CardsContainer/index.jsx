import styles from './style.module.scss'

export default function CardsContainer({ children, title }) {
  return (
    <div className={styles.container}>
      {title && (
        <div className={styles.container__title}>
          <h3>{title.toUpperCase()}</h3>
        </div>
      )}
      <div className={styles.container__cards}>{children}</div>
    </div>
  )
}
