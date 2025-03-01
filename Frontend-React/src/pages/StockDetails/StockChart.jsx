import { useEffect, useState } from "react"; // Import React hooks for managing state and side effects
import ReactApexChart from "react-apexcharts"; // Import ApexCharts for chart visualization
import { convertToUnixTimestamp } from "./ConvertToChartData"; // Function to convert data into a format suitable for charts
import { Button } from "@/components/ui/button"; // Import a button component from a UI library
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks for state management
import { fetchMarketChart } from "@/Redux/Coin/Action"; // Import Redux action to fetch market chart data
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop"; // Import a loading spinner for showing a loading state

// Define available time series options for different chart intervals
const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY", // API keyword for fetching daily data
    key: "Time Series (Daily)", // Key in API response containing daily data
    lable: "1 Day", // Label for user display
    value: 1, // Numeric representation for 1-day interval
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY", // API keyword for weekly data
    key: "Weekly Time Series", // Key in API response containing weekly data
    lable: "1 Week", // Label for user display
    value: 7, // Represents 7-day (1-week) interval
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY", // API keyword for monthly data
    key: "Monthly Time Series", // Key in API response containing monthly data
    lable: "1 Month", // Label for user display
    value: 30, // Represents 30-day (1-month) interval
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3", // API keyword for 3-month data
    key: "3 Month Time Series", // Key in API response containing 3-month data
    lable: "3 Month", // Label for user display
    value: 90, // Represents 90-day (3-month) interval
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6", // API keyword for 6-month data
    key: "6 Month Time Series", // Key in API response containing 6-month data
    lable: "6 Month", // Label for user display
    value: 180, // Represents 180-day (6-month) interval
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY", // API keyword for yearly data
    key: "Yearly Time Series", // Key in API response containing yearly data
    lable: "1 year", // Label for user display
    value: 365, // Represents 365-day (1-year) interval
  },
];

// Define the StockChart component
const StockChart = ({ coinId }) => {
  const [activeType, setActiveType] = useState(timeSeries[0]); // State to keep track of the selected time series type
  const dispatch = useDispatch(); // Get the Redux dispatcher function
  const { coin, auth } = useSelector((store) => store); // Access the Redux store to retrieve coin and auth data

  // Define chart data using the Redux state
  const series = [
    {
      data: coin.marketChart.data, // Fetch the market chart data from Redux store
    },
  ];

  // Chart configuration options
  const [options] = useState({
    chart: {
      id: "area-datetime", // Unique chart ID
      type: "area", // Define the chart type as an area chart
      height: 350, // Set the height of the chart
      zoom: {
        autoScaleYaxis: true, // Enable automatic Y-axis scaling on zoom
      },
    },
    annotations: {
      // (Placeholder for adding custom annotations to the chart)
    },
    dataLabels: {
      enabled: false, // Disable data labels on the chart
    },
    xaxis: {
      type: "datetime", // Define X-axis type as datetime for time series data
      tickAmount: 6, // Set the number of ticks on the X-axis
    },
    colors: ["#758AA2"], // Define the color of the chart line
    markers: {
      colors: ["#fff"], // Set marker (dot) color
      strokeColors: "#fff", // Set marker border color
      strokeWidth: 1, // Set marker border width
      size: 0, // Set marker size (0 means no visible markers)
      style: "hollow", // Use hollow marker style
    },
    tooltip: {
      theme: "dark", // Set tooltip theme to dark
    },
    fill: {
      type: "gradient", // Use gradient fill for the chart
      gradient: {
        shadeIntensity: 1, // Set the shading intensity of the gradient
        opacityFrom: 0.7, // Define starting opacity
        opacityTo: 0.9, // Define ending opacity
        stops: [0, 100], // Define gradient stops
      },
    },
    grid: {
      borderColor: "#47535E", // Define the color of the grid lines
      strokeDashArray: 4, // Set the dash pattern of the grid lines
      show: true, // Display the grid lines on the chart
    },
  });

  // useEffect to fetch market chart data when `coinId` or `activeType.value` changes
  useEffect(() => {
    if (coinId) {
      dispatch(
        fetchMarketChart({
          coinId, // The coin ID for which market data needs to be fetched
          days: activeType.value, // Fetch data for the selected time interval
          jwt: localStorage.getItem("jwt") || auth.jwt, // Use JWT token from local storage or Redux state for authentication
        })
      );
    }
  }, [coinId, activeType.value]); // Effect runs whenever `coinId` or `activeType.value` changes

  // If market chart data is still loading, show a spinner
  if (coin.marketChart.loading) {
    return (
      <div className="h-full w-full inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-t-gray-200 border-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("coin reducer", coin); // Debugging: log the coin state from Redux

  return (
    <div>
      {/* Time interval selection buttons */}
      <div id="charts">
        <div className="toolbars space-x-2">
          {timeSeries.map((item) => (
            <Button
              onClick={() => setActiveType(item)} // Update the active time series when a button is clicked
              key={item.lable} // Use label as the unique key
              variant={activeType.lable !== item.lable ? "outline" : ""} // Change button style if not selected
            >
              {item.lable} {/* Display label on the button */}
            </Button>
          ))}
        </div>

        {/* Render the chart */}
        <div id="chart-timelines">
          <ReactApexChart
            options={options} // Pass chart configuration
            series={series} // Pass chart data
            type="area" // Define chart type as area
            height={450} // Set the height of the chart
          />
        </div>
      </div>
      {/* <div id="html-dist"></div> */} {/* (Commented out) Placeholder for future content */}
    </div>
  );
};

// Export the StockChart component so it can be used in other parts of the app
export default StockChart;
