import styles from "./ListTable.module.css"

function ListTable({ datas, picturePaths }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Objects</th>
          <th>Accepted Items✔️</th>
          <th>Not Accepted Items❌</th>
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
              <img
                src={picturePaths[data[0]].ACCEPTED}
                alt={`${data[0]} accepted picture`}
                className={styles.tableImg}
              />
            </td>
            <td>
              <img
                src={picturePaths[data[0]].REJECTED}
                alt={`${data[0]} rejected picture`}
                className={styles.tableImg}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListTable;