import styles from "./ListTable.module.css"

function ListTable({ buyableItemsWithPrice, datas, picturePaths }) {
  const buyableItems = buyableItemsWithPrice.map((buyingItems) => buyingItems[0]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Objects</th>
          <th>Accepted Items ✔️</th>
          <th>Not Accepted Items ❌</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(datas).map((data) => (
          <tr key={data[0]}>
            <td>
              <div>
                {data[1].map((item) => (
                  <div key={item} className={styles.objectName}>
                    <input type="checkbox"
                           checked={buyableItems.includes(item)}
                           disabled={true}
                    />
                    <p className={styles.objectItems} >
                        {`${item} ${buyableItemsWithPrice.find(([first]) =>
                          first === item) ? 
                         `$${buyableItemsWithPrice.find(([first]) =>
                             first === item)[1]}/kg`:
                         ""}`}
                    </p>
                  </div>
                ))}
              </div>
            </td>
            <td>
              <div className={styles.tableContent}>
                {picturePaths[data[0]].ACCEPTED.map((imgSrc, i) => {
                  return (
                    <img key={i}
                        src={imgSrc} 
                        alt={`${data[0]} accepted logo`} 
                        className={styles.tableImg}
                    />
                  );})}
              </div>
            </td>
            <td>
              <div className={styles.tableContent}>
                {picturePaths[data[0]].REJECTED.map((imgSrc, i) => {
                  return (
                    <img key={i}
                        src={imgSrc} 
                        alt={`${data[0]} rejected logo`} 
                        className={styles.tableImg}
                    />
                  );})}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListTable;