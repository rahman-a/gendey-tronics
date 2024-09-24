import styles from './style.module.scss'

export default function CardsContainer({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.container__cards}>{children}</div>
    </div>
  )
}
