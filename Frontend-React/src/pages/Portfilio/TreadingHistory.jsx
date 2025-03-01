/* eslint-disable no-unused-vars */ // Disables ESLint rule for unused variables

// Importing necessary UI components for table, button, and avatar
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Button component (not used currently)
import { useEffect, useState } from "react"; // React hooks for state and lifecycle methods
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { getUserAssets } from "@/Redux/Assets/Action"; // Action to fetch user assets
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Avatar components for displaying coin images
import { getAllOrdersForUser } from "@/Redux/Order/Action"; // Action to fetch user orders
import { calculateProfite } from "@/Util/calculateProfite"; // Utility function for calculating profit/loss
import { readableDate } from "@/Util/readableDate"; // Utility function to format date/time

const TreadingHistory = () => {
  const dispatch = useDispatch(); // Dispatch function for Redux actions
  const [currentTab, setCurrentTab] = useState("portfolio"); // State for active tab
  const { asset, order } = useSelector((store) => store); // Extracting asset & order data from Redux store

  // Fetch user assets and orders when the component mounts
  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt"))); // Fetch user's assets
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") })); // Fetch user's order history
  }, []);

  // Function to change tabs (currently not used)
  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  console.log("currentTab-----", currentTab); // Debugging log for currentTab state

  return (
    <div className="">
      {/* Table for displaying trading history */}
      <Table className="px-5 relative">
        {/* Table Header */}
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background">
            <TableHead className="py-3">Date & Time</TableHead>
            <TableHead>Trading Pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="">
          {/* Mapping through user orders, sorted by timestamp (latest first) */}
          {[...(order.orders || [])]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((item) => (
              <TableRow key={item.id}>
                {/* Date & Time Column */}
                <TableCell>
                  <p>{readableDate(item.timestamp).date}</p> {/* Formatted date */}
                  <p className="text-gray-400">{readableDate(item.timestamp).time}</p> {/* Formatted time */}
                </TableCell>

                {/* Trading Pair Column (Displays Image and Name) */}
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="-z-50"> {/* Display coin image */}
                    <AvatarImage
                      src={item.orderItem.coin.image}
                      alt={item.orderItem.coin.symbol}
                    />
                  </Avatar>
                  <span>{item.orderItem.coin.name}</span> {/* Display coin name */}
                </TableCell>

                {/* Buy Price Column */}
                <TableCell>${item.orderItem.buyPrice}</TableCell>

                {/* Selling Price Column (Shows "-" if no sell price) */}
                <TableCell>{item.orderItem.sellPrice ? `$${item.orderItem.sellPrice}` : "-"}</TableCell>

                {/* Order Type Column (BUY or SELL) */}
                <TableCell>{item.orderType}</TableCell>

                {/* Profit/Loss Column (Only calculated for SELL orders) */}
                <TableCell
                  className={`${
                    calculateProfite(item) < 0 ? "text-red-600" : "" // Red text for losses
                  }`}
                >
                  {item.orderType === "SELL" ? calculateProfite(item) : "-"}
                </TableCell>

                {/* Order Value Column (Total transaction value) */}
                <TableCell className="text-right">${item.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Exporting TreadingHistory component so it can be used in other parts of the application
export default TreadingHistory;