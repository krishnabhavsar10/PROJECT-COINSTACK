/* eslint-disable no-unused-vars */ 
// Disables ESLint warning for unused variables

/* eslint-disable no-constant-condition */ 
// Disables ESLint warning for constant conditions in code

// Importing necessary UI components and icons
import { Button } from "@/components/ui/button"; // Button component from UI library
import {
  BookmarkFilledIcon, // Icon for a filled bookmark (used when item is in watchlist)
  BookmarkIcon, // Icon for an empty bookmark (used when item is not in watchlist)
  DotIcon, // Dot icon used in coin name display
  HeartIcon, // Heart icon (not used in this code)
} from "@radix-ui/react-icons"; // Importing icons from Radix UI

import StockChart from "./StockChart"; // Importing the StockChart component to display market data in a graph

// Importing modal dialog components for user interaction
import {
  Dialog, // Wrapper component for modal dialog
  DialogContent, // Component that contains the main content of the dialog
  DialogDescription, // Description text inside the dialog
  DialogHeader, // Header section of the dialog
  DialogTitle, // Title of the dialog
  DialogTrigger, // Component that triggers the dialog when clicked
} from "@/components/ui/dialog"; 

import TreadingForm from "./TreadingForm"; // Importing the form used for trading (buy/sell investments)

import { useParams } from "react-router-dom"; 
// Hook to extract parameters from the URL (used to get the coin ID)

import { useEffect } from "react"; 
// React hook to handle side effects like fetching data when the component loads

import { useDispatch, useSelector } from "react-redux"; 
// `useDispatch` is used to send actions to Redux
// `useSelector` is used to select data from the Redux store

// Importing Redux actions for fetching coin details
import { fetchCoinById, fetchCoinDetails } from "@/Redux/Coin/Action"; 

import { Avatar, AvatarImage } from "@/components/ui/avatar"; 
// Avatar components to display the coin's image

import { existInWatchlist } from "@/Util/existInWatchlist"; 
// Utility function to check if a coin is already in the user's watchlist

// Importing Redux actions for watchlist management
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action"; 

import { getAssetDetails } from "@/Redux/Assets/Action"; 
// Redux action to fetch asset details (not used directly in this code)

import { getUserWallet } from "@/Redux/Wallet/Action"; 
// Redux action to fetch user's wallet details

import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop"; 
// Custom spinner component used to show a loading state

// Define the StockDetails component
const StockDetails = () => {
  const { id } = useParams(); 
  // Extract the `id` parameter from the URL, which represents the coin ID

  const dispatch = useDispatch(); 
  // Get the dispatch function to send actions to Redux

  const { coin, watchlist, auth } = useSelector((store) => store); 
  // Extract `coin`, `watchlist`, and `auth` data from the Redux store

  // useEffect to fetch coin details when `id` changes
  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id, // Fetch details for the specific coin ID
        jwt: auth.jwt || localStorage.getItem("jwt"), // Use JWT from Redux state or local storage for authentication
      })
    );
  }, [id]); 
  // This effect runs whenever `id` changes (dependency array: `[id]`)

  // useEffect to fetch user watchlist and wallet details on component mount
  useEffect(() => {
    dispatch(getUserWatchlist()); // Fetch the user's watchlist
    dispatch(getUserWallet(localStorage.getItem("jwt"))); // Fetch user's wallet using JWT
  }, []); 
  // Empty dependency array means this effect runs only once when the component mounts

  // Function to handle adding the coin to the watchlist
  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist(coin.coinDetails?.id)); 
    // Dispatch action to add the current coin to the watchlist
  };

  // If the coin data is still loading, show a spinner
  if (coin.loading) {
    return <SpinnerBackdrop />; 
    // Return the SpinnerBackdrop component to indicate a loading state
  }

  return (
    <>
      {/* Display "loading..." text while fetching data */}
      {coin.loading ? (
        "loading..."
      ) : (
        <div className="p-5 mt-5">
          {/* Top section: Coin details and action buttons */}
          <div className="flex justify-between">
            {/* Left side: Coin details */}
            <div className="flex gap-5 items-center">
              <div>
                <Avatar>
                  <AvatarImage src={coin.coinDetails?.image?.large} /> 
                  {/* Display the coin's image */}
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p>{coin.coinDetails?.symbol?.toUpperCase()}</p> 
                  {/* Display the coin symbol in uppercase */}
                  <DotIcon className="text-gray-400" /> 
                  {/* Separator dot */}
                  <p className="text-gray-400">{coin.coinDetails?.name}</p> 
                  {/* Display the full name of the coin */}
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">
                    {coin.coinDetails?.market_data.current_price.usd} 
                    {/* Display the current price of the coin in USD */}
                  </p>
                  <p
                    className={`${
                      coin.coinDetails?.market_data.market_cap_change_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`} 
                    /* Change text color based on price change (red for negative, green for positive) */
                  >
                    <span className="">
                      {coin.coinDetails?.market_data.market_cap_change_24h} 
                      {/* Show market cap change in the last 24 hours */}
                    </span>
                    <span>
                      (
                      {
                        coin.coinDetails?.market_data
                          .market_cap_change_percentage_24h
                      }
                      %) 
                      {/* Show market cap change percentage */}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side: Action buttons */}
            <div className="flex items-center gap-5">
              <Button
                onClick={handleAddToWatchlist} 
                /* Call handleAddToWatchlist function when clicked */
                className="h-10 w-10"
                variant="outline"
                size="icon"
              >
                {existInWatchlist(watchlist.items, coin.coinDetails) ? (
                  <BookmarkFilledIcon className="h-6 w-6" /> 
                  /* Show filled bookmark icon if coin is already in watchlist */
                ) : (
                  <BookmarkIcon className="h-6 w-6" /> 
                  /* Show empty bookmark icon if coin is not in watchlist */
                )}
              </Button>

              {/* Trade Now button - Opens a dialog modal */}
              <Dialog>
                <DialogTrigger>
                  <Button size="lg">TRADE NOW</Button> 
                  {/* Button to trigger the trading modal */}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="px-10 pt-5 text-center">
                      How much do you want to Invest?
                      {/* Modal title asking for investment amount */}
                    </DialogTitle>
                  </DialogHeader>
                  <TreadingForm /> 
                  {/* Trading form component inside the modal */}
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Chart section: Displays stock price chart */}
          <div className="mt-10">
            <StockChart coinId={coin.coinDetails?.id} /> 
            {/* Render StockChart component, passing coin ID */}
          </div>
        </div>
      )}
    </>
  );
};

export default StockDetails; 
// Export StockDetails component so it can be used in other files
