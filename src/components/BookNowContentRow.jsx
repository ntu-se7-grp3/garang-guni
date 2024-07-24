import styles from './BookNowContentRow.module.css'

function BookNowContentRow({header, children}) {
  return (
    <div className={styles.bookNowContentRow}>
      {header && 
      <span className={styles.contentHeader}>
        {header}
      </span>}
      <div className={styles.row}>
        {children}
      </div>
    </div>
  )
}

export default BookNowContentRow;