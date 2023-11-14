import { useState, useEffect } from "react";
import Transactions from "./components/TransacTable";
import Statistics from "./components/StatisticsData";
import BarChartComponent from "./components/BarchartData";
import PieChartComponent from "./components/PiechartData";

import { months, apiStatusConstants } from "./formate";

import "./App.css";

const limit = 10;

function App() {
  const [selectedMonth, setSelectedMonth] = useState(months[3].value);

  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);

  const [apiData, setApiData] = useState({
    apiStatus: apiStatusConstants.initial,
    transactions: [],
    statistics: [],
    pieChart: [],
    barChart: [],
  });

  const onChangeMonth = (e) => {
    setPage(1);
    setSelectedMonth(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const onKeyDownSearch = async (e) => {
    if (e.key === "Enter") {
      await setPage(1);
      await getTransactionData();
    }
  };

  useEffect(() => {
    getTransactionData();
  }, [selectedMonth, page]);

  const getTransactionData = async () => {
    setApiData((prevData) => ({
      ...prevData,
      apiStatus: apiStatusConstants.inProgress,
    }));
    const offset = (page - 1) * limit;
    const apiUrl = `https://roxiler-systems-assignment.onrender.com/combined-response?month=${selectedMonth}&s_query=${searchText}&limit=${limit}&offset=${offset}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      setApiData((prevData) => ({
        ...prevData,
        apiStatus: apiStatusConstants.success,
        transactions: data.listTransactions,
        statistics: data.statistics,
        pieChart: data.pieChart,
        barChart: data.barChart,
      }));
    } else {
      setApiData((prevData) => ({
        ...prevData,
        apiStatus: apiStatusConstants.failure,
      }));
    }
  };

  const incrementPage = () => {
    setPage((prevPage) => (prevPage += 1));
  };
  const decrementPage = () => {
    setPage((prevPage) => (prevPage -= 1));
  };

  const renderSuccessView = () => {
    const currentMonth = months.find(
      (eachMonth) => eachMonth.value === selectedMonth
    );
    return (
      <div>
        <Transactions
          transactionsData={apiData.transactions}
          page={page}
          increment={incrementPage}
          decrement={decrementPage}
        />
        <Statistics statisticsData={apiData.statistics} month={currentMonth} />
        <BarChartComponent
          barChartData={apiData.barChart}
          month={currentMonth}
        />
        <PieChartComponent
          pieChartData={apiData.pieChart}
          month={currentMonth}
        />
      </div>
    );
  };

  const renderFailureView = () => {
    return (
      <div className="view-container">
        <h1>Failed to fetch data</h1>
        <button onClick={getTransactionData} type="button">
          Retry
        </button>
      </div>
    );
  };

  const renderApiStatus = () => {
    switch (apiData.apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="heading-container">
        <h1>Transaction Dashboard</h1>
      </div>
      <div className="filter-container">
        <input
          onChange={onChangeSearch}
          onKeyDown={onKeyDownSearch}
          value={searchText}
          type="search"
          placeholder="Search transaction"
        />
        <select value={selectedMonth} onChange={onChangeMonth}>
          {months.map((eachMonth) => (
            <option key={eachMonth.value} value={eachMonth.value}>
              {eachMonth.displayText}
            </option>
          ))}
        </select>
      </div>
      {renderApiStatus()}
    </div>
  );
}

export default App;
