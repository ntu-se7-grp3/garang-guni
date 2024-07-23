import styles from './BookNowContentRow.module.css'

function BookNowContentRow({header, children}) {
  return (
    <>
      {header && 
      <span className={styles.contentHeader}>
        {header}
      </span>}
      <div className={styles.row}>
        {children}
      </div>
    </>
  )
}

export default BookNowContentRow;