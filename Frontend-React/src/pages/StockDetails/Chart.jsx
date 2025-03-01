import { useEffect, useState } from "react"; // Import React hooks
import ReactApexChart from "react-apexcharts"; // Import ApexCharts for chart rendering
import fetchData, { dataType } from "../Home/fetchMarketData"; // Import function to fetch market data
import { convertToUnixTimestamp } from "./ConvertToChartData"; // Import function to convert data to chart format

const Chart = () => {
  const [stockData, setStockData] = useState(null); // State to store stock market data

  useEffect(() => {
    const fetchStockData = async () => {
      const data = await fetchData(); // Fetch market data asynchronously
      console.log("stock data ", data[dataType]); // Log fetched data for debugging

      const chartData = convertToUnixTimestamp(data[dataType]); // Convert data into a format suitable for charting
      console.log("chartData ", chartData); // Log converted chart data

      setStockData(data); // Store fetched data in state
    };
    fetchStockData(); // Invoke data fetching function on component mount
  }, []); // Empty dependency array ensures useEffect runs only once

  if (!stockData) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  // Extracting dates and closing prices from the fetched stock data
  const dates = Object.keys(stockData[dataType]); // Get dates as keys
  const closePrices = dates.map((date) =>
    parseFloat(stockData[dataType][date]["4. close"]) // Convert closing prices to float
  );

  // ApexCharts configuration options
  const options = {
    chart: {
      type: "area", // Set chart type to area
      stacked: false, // Disable stacked series
      height: 350, // Set chart height
      zoom: {
        enabled: true, // Enable zoom functionality
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    xaxis: {
      type: "datetime", // Set X-axis type to datetime
      categories: dates, // Use extracted dates as categories
      title: {
        // text: 'Date', // (Commented out) X-axis title
      },
      pan: {
        enabled: true, // Enable panning on X-axis
      },
    },
    yaxis: {
      title: {
        // text: 'Closing Price (USD)', // (Commented out) Y-axis title
      },
    },
    title: {
      text: "IBM Stock Weekly Closing Prices", // Set chart title
      align: "center", // Center the title
    },
    colors: ["#fff"], // Set line color to white
    markers: {
      colors: ["#fff"], // Set marker (dot) color to white
      strokeColors: "#fff", // Set marker border color to white
      strokeWidth: 2, // Set marker border width
    },
    tooltip: {
      theme: "dark", // Set tooltip theme to dark
    },
    toolbar: {
      show: true, // Show the toolbar
    },
    grid: {
      borderColor: "#cccccc", // Set grid line color
      strokeDashArray: 4, // Set grid line dash style
      show: true, // Show grid
    },
    series: [
      {
        name: "Series 1", // Name of the data series
        data: closePrices, // Use extracted closing prices as data
        fill: {
          type: "solid", // Set fill type to solid
          color: "#3367d6", // Set fill color
          opacity: 0.5, // Set fill opacity
        },
      },
    ],
  };

  // Series data for ApexCharts
  const series = [
    {
      name: "Close Prices", // Name of the series
      data: closePrices, // Use extracted closing prices as data
    },
  ];

  return (
    <div className="stock-chart">
      <ReactApexChart
        options={options} // Pass chart configuration options
        series={series} // Pass data series
        type="line" // Set chart type to line
        height={640} // Set chart height
      />
    </div>
  );
};

export default Chart; // Export the Chart component for use in other files
