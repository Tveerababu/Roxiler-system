import "./index.css";

const Statistics = (props) => {
  const { statisticsData, month } = props;
  const { totalSaleAmount, soldItems, notSoldItems } = statisticsData;
  return (
    <div className="statistics-container">
      <h1>
        Statistics -{" "}
        <span style={{color:"blue",fontFamily:"cursive"}}>{month.displayText}</span>
      </h1>
      <table className="statistics-table">
        <tbody>
          <tr>
            <td>Total sale</td>
            <td>{Math.round(totalSaleAmount.total * 100) / 100}</td>
          </tr>
          <tr>
            <td>Total sold item</td>
            <td>{soldItems.count}</td>
          </tr>
          <tr>
            <td>Total not sold item</td>
            <td>{notSoldItems.count}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
