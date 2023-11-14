import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

import "./index.css";

const BarChartComponent = (props) => {
  const { barChartData, month } = props;
  return (
    <div className="barchart-container">
      <h1>
        BarChart Statistics -{" "}
       <span style={{color:"green",fontFamily:"cursive"}}>{month.displayText}</span> 
      </h1>
      <BarChart
        height={400}
        width={900}
        data={barChartData.barChartData}
        margin={{
          top: 5,
        }}
      >
        <XAxis dataKey="range" />
        <YAxis/>
        <Tooltip />
        <Bar dataKey="count" fill="#6ce5e8"/>
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
