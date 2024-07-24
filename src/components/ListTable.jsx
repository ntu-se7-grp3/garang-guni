import styles from "./ListTable.module.css"

function ListTable({ datas, picturePaths }) {
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
                  <p className={styles.objectItems} 
                     key={item}>
                      {item}
                  </p>
                ))}
              </div>
            </td>
            <td>
              <div className={styles.tableContent}>
                {picturePaths[data[0]].ACCEPTED.map((imgSrc, i) => {
                  return (
                    <>
                      <img key={i} 
                          src={imgSrc} 
                          alt={`${data[0]} accepted logo`} 
                          className={styles.tableImg}
                      />
                      { 
                        i < picturePaths[data[0]].ACCEPTED.length &&
                        <div id="blank" className={styles.tableImg}></div>
                      }
                    </>
                  );})}
              </div>
            </td>
            <td>
              <div className={styles.tableContent}>
                {picturePaths[data[0]].REJECTED.map((imgSrc, i) => {
                  return (
                    <>
                      <img key={i} 
                          src={imgSrc} 
                          alt={`${data[0]} rejected logo`} 
                          className={styles.tableImg}
                      />
                      { 
                        i < picturePaths[data[0]].REJECTED.length &&
                        <div id="blank" className={styles.tableImg}></div>
                      }
                    </>
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