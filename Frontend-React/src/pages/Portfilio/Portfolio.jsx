/* eslint-disable no-unused-vars */ // Disables ESLint rule for unused variables

// Importing necessary UI components for table, select, and avatar
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { getUserAssets } from "@/Redux/Assets/Action"; // Action to fetch user assets
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Avatar components for displaying images
import { useNavigate } from "react-router-dom"; // Hook for navigation

const Portfolio = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch(); // Dispatch function for Redux actions
  const { asset } = useSelector((store) => store); // Extracting asset state from Redux store

  // Fetch user's assets when the component mounts
  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="px-10 py-5 mt-8">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>



      {/* Portfolio Table */}
      <Table className="px-5 relative">
        {/* Table Header */}
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background">
            <TableHead className="py-3">Assets</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>UNIT</TableHead>
            <TableHead>CHANGE</TableHead>
            <TableHead>CHANGE(%)</TableHead>
            <TableHead className="text-right">VALUE</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {/* Mapping through user assets to display each row */}
          {asset.userAssets?.map((item) => (
            <TableRow
              onClick={() => navigate(`/market/${item.coin.id}`)} // Navigate to the market page for the selected coin
              key={item.id} // Unique key for each row
            >
              {/* Asset Column - Displays Image and Name */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50"> {/* Display coin image */}
                  <AvatarImage src={item.coin.image} alt={item.coin.symbol} />
                </Avatar>
                <span>{item.coin.name}</span> {/* Display coin name */}
              </TableCell>

              {/* Coin Price */}
              <TableCell>{item.coin.current_price}</TableCell>

              {/* Quantity of the asset owned */}
              <TableCell>{item.quantity}</TableCell>

              {/* Price Change in last 24 hours */}
              <TableCell
                className={`${
                  item.coin.price_change_percentage_24h < 0
                    ? "text-red-600" // Red for negative change
                    : "text-green-600" // Green for positive change
                }`}
              >
                {item.coin.price_change_24h}
              </TableCell>

              {/* Percentage Price Change in last 24 hours */}
              <TableCell
                className={`${
                  item.coin.price_change_percentage_24h < 0
                    ? "text-red-600" // Red for negative change
                    : "text-green-600" // Green for positive change
                }`}
              >
                {item.coin.price_change_percentage_24h}%
              </TableCell>

              {/* Total Value of the Asset (Price * Quantity) */}
              <TableCell className="text-right">
                {item.coin.current_price * item.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Exporting Portfolio component so it can be used in other parts of the application
export default Portfolio;
