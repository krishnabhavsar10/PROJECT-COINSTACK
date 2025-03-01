import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Importing Avatar components for displaying coin logos
import { ScrollArea } from "@/components/ui/scroll-area"; // Importing ScrollArea component for scrollable tables
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Importing table components
import { useSelector } from "react-redux"; // Importing Redux hook to access the store
import { useNavigate } from "react-router-dom"; // Importing the navigation hook for routing

// This component renders a table of assets (cryptocurrencies) and their details.
export function AssetTable({ coins, category }) {
  const navigate = useNavigate(); // Initialize navigation hook

  return (
    // Main Table component with padding and border at the top
    <Table className="px-5  border-t relative">
      {/* Scrollable area for the table with dynamic height based on the category */}
      <ScrollArea className={category == "all" ? "h-[74vh]" : "h-[82vh]"}>
        {/* Table Header */}
        <TableHeader>
          {/* Table Row with sticky header */}
          <TableRow className="sticky top-0 left-0 right-0 bg-background">
            {/* Column headers for the table */}
            <TableHead className="py-4">Coin</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24H</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {/* Mapping over the coins array to display each coin's details */}
          {coins.map((item) => (
            <TableRow
              className="cursor-pointer" // Making the rows clickable
              onClick={() => navigate(`/market/${item.id}`)} // Navigating to a detailed page of the coin when clicked
              key={item.id} // Unique key for each row
            >
              {/* Coin Name and Image */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.image} alt={item.symbol} /> {/* Displaying coin image */}
                </Avatar>
                <span> {item.name}</span> {/* Coin name */}
              </TableCell>

              {/* Coin Symbol */}
              <TableCell>{item.symbol.toUpperCase()}</TableCell>

              {/* Total Volume */}
              <TableCell>{item.total_volume}</TableCell>

              {/* Market Cap */}
              <TableCell>{item.market_cap}</TableCell>

              {/* 24H Market Cap Change Percentage */}
              <TableCell
                className={`${
                  item.market_cap_change_percentage_24h < 0 // Styling based on whether the percentage is negative or positive
                    ? "text-red-600" // Negative percentage will be red
                    : "text-green-600" // Positive percentage will be green
                }`}
              >
                {item.market_cap_change_percentage_24h}% {/* Display 24h percentage change */}
              </TableCell>

              {/* Current Price */}
              <TableCell className="text-right">{item.current_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}
