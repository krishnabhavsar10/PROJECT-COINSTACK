/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Importing table components for displaying data in a structured format
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks to manage state
import { searchCoin } from "@/Redux/Coin/Action"; // Importing the action to fetch searched coin data
import { useNavigate, useLocation } from "react-router-dom"; // React Router hooks for navigation and URL handling
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop"; // Importing a loading spinner component
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Importing avatar components for displaying coin images

const SearchCoin = () => {
  const dispatch = useDispatch(); // Creating a dispatch function to trigger Redux actions
  const { coin } = useSelector((store) => store); // Extracting the 'coin' state from the Redux store
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const location = useLocation(); // Hook to access the current URL and its query parameters

  useEffect(() => {
    // Extract search query from URL and dispatch an action to fetch results
    const params = new URLSearchParams(location.search); // Parsing the URL search parameters
    const query = params.get("query"); // Extracting the search query parameter
    if (query) {
      dispatch(searchCoin(query)); // Dispatching the action to search for the coin
    }
  }, [location.search, dispatch]); // Re-run this effect when the URL search query changes

  if (coin.loading) {
    return <SpinnerBackdrop />; // Show a loading spinner if the data is still being fetched
  }

  return (
    <div className="p-10 lg:p=[50%]">
      {/* Table for displaying search results */}
      <Table className="px-5  relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3">Market Cap Rank</TableHead>
            <TableHead>Trading Pair</TableHead>
            <TableHead className="text-right">SYMBOL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Mapping through the list of searched coins and displaying them in table rows */}
          {coin.searchCoinList?.map((item) => (
            <TableRow onClick={() => navigate(`/market/${item.id}`)} key={item.id}>
              {/* Market cap rank column */}
              <TableCell>
                <p>{item.market_cap_rank}</p>
              </TableCell>

              {/* Coin name with image (Trading Pair) */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.large} alt={item.name} />
                </Avatar>
                <span>{item.name}</span>
              </TableCell>

              {/* Coin symbol displayed in right alignment */}
              <TableCell className="text-right">${item.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchCoin;
