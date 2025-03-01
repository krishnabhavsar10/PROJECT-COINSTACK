// Import necessary Redux actions and UI components
import { getAssetDetails } from "@/Redux/Assets/Action"; // Fetch asset details
import { payOrder } from "@/Redux/Order/Action"; // Handle buy/sell transactions
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Avatar components for displaying the coin image
import { Button } from "@/components/ui/button"; // Button component for user interactions
import { Input } from "@/components/ui/input"; // Input field for entering investment amount
import { DotIcon } from "@radix-ui/react-icons"; // Dot icon for UI display
import { DollarSign } from "lucide-react"; // Dollar sign icon for currency display

// Import React hooks
import { useEffect, useState } from "react"; // useEffect for side effects, useState for state management
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management

// Define TradingForm component with onClose prop (used to close modal after transaction)
const TradingForm = ({ onClose }) => {
  // Extract necessary data from Redux store
  const { coin, asset, wallet } = useSelector((store) => store);

  // Define state variables
  const [quantity, setQuantity] = useState(0); // Stores calculated crypto quantity
  const [amount, setAmount] = useState(""); // Stores input amount in USD
  const [orderType, setOrderType] = useState("BUY"); // Stores order type: "BUY" or "SELL"
  const [successMessage, setSuccessMessage] = useState(""); // Stores transaction success message

  const dispatch = useDispatch(); // Get dispatch function to send actions to Redux

  // Fetch asset details when coin ID changes
  useEffect(() => {
    if (coin.coinDetails?.id) {
      dispatch(
        getAssetDetails({
          coinId: coin.coinDetails.id, // Pass the current coin ID
          jwt: localStorage.getItem("jwt"), // Authentication token from local storage
        })
      );
    }
  }, [coin.coinDetails?.id, dispatch]); // Dependency array ensures effect runs when `coin.coinDetails.id` changes

  // Function to calculate crypto quantity based on USD amount and current price
  const calculateVolume = (amountUSD, cryptoPrice) => {
    if (!cryptoPrice || amountUSD <= 0) return 0; // If no price or invalid amount, return 0
    return parseFloat((amountUSD / cryptoPrice).toFixed(6)); // Calculate and format to 6 decimal places
  };

  // Update quantity when amount or coin price changes
  useEffect(() => {
    if (!amount) {
      setQuantity(0); // If no amount is entered, reset quantity to 0
    } else {
      setQuantity(calculateVolume(amount, coin.coinDetails?.market_data?.current_price?.usd || 1));
      // Calculate quantity based on current price
    }
  }, [amount, coin.coinDetails?.market_data?.current_price]); // Runs when amount or price updates

  // Handle input change and update amount
  const handleOnChange = (e) => {
    let inputAmount = e.target.value;
    if (/^\d*\.?\d*$/.test(inputAmount)) {
      setAmount(inputAmount); // Allow only valid numeric input
    }
  };

  // Function to handle transaction (BUY/SELL)
  const handleTransaction = () => {
    if (!isButtonDisabled) {
      dispatch(
        payOrder({
          jwt: localStorage.getItem("jwt"), // Authentication token
          amount: parseFloat(amount), // Convert amount to number
          orderData: {
            coinId: coin.coinDetails?.id, // Current coin ID
            quantity, // Calculated quantity
            orderType, // "BUY" or "SELL"
          },
        })
      );

      // Update wallet and asset details after transaction
      if (orderType === "BUY") {
        wallet.userWallet.balance -= parseFloat(amount); // Deduct amount from wallet if buying
      } else {
        asset.assetDetails.quantity -= quantity; // Deduct quantity from assets if selling
        wallet.userWallet.balance += parseFloat(amount); // Add amount to wallet balance if selling
      }

      // Set success message for transaction
      setSuccessMessage(
        `Transaction Successful! ${orderType} ${quantity} ${coin.coinDetails?.symbol?.toUpperCase()}.
        Available Balance: $${wallet.userWallet?.balance.toFixed(2)}, Available Quantity: ${asset.assetDetails?.quantity}`
      );

      // Reset form fields
      setAmount("");
      setQuantity(0);

      // Close modal after 1 second
      setTimeout(() => {
        if (onClose) onClose();
      }, 1000);
    }
  };

  // Validation checks
  const isInvalidAmount = !amount || parseFloat(amount) <= 0; // Check if amount is valid
  const isInsufficientBalance =
    orderType === "SELL"
      ? quantity > asset.assetDetails?.quantity // Check if user has enough assets to sell
      : parseFloat(amount) > wallet.userWallet?.balance; // Check if user has enough balance to buy

  const isButtonDisabled = isInvalidAmount || quantity === 0 || isInsufficientBalance;
  // Disable button if amount is invalid, quantity is zero, or user has insufficient balance

  return (
    <div className="space-y-10 p-5">
      {/* Input field and calculated quantity display */}
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter Amount ..."
            onChange={handleOnChange}
            value={amount}
            type="text"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity} {/* Display calculated crypto quantity */}
            </p>
          </div>
        </div>

        {/* Display validation messages */}
        {successMessage === "" && isInvalidAmount && (
          <h1 className="text-red-800 text-center pt-4">Amount must be greater than 0</h1>
        )}
        {successMessage === "" && isInsufficientBalance && (
          <h1 className="text-red-800 text-center pt-4">Insufficient Balance/Quantity</h1>
        )}
      </div>

      {/* Coin details display */}
      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage src={coin.coinDetails?.image?.large} /> {/* Display coin image */}
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p>{coin.coinDetails?.symbol?.toUpperCase()}</p> {/* Display coin symbol */}
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coin.coinDetails?.name}</p> {/* Display coin name */}
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              {coin.coinDetails?.market_data?.current_price?.usd} {/* Display current price */}
            </p>
          </div>
        </div>
      </div>

      {/* Available balance or asset quantity display */}
      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
        <div>
          {orderType === "BUY" ? (
            <div className="flex items-center">
              <DollarSign />
              <span className="text-2xl font-semibold">{wallet.userWallet?.balance.toFixed(2)}</span>
            </div>
          ) : (
            <p>{asset.assetDetails?.quantity || 0}</p>
          )}
        </div>
      </div>

      {/* Transaction buttons */}
      <div>
        <Button
          onClick={handleTransaction}
          className={`w-full py-6 ${orderType === "SELL" ? "bg-red-600 text-white" : ""}`}
          disabled={isButtonDisabled}
        >
          {orderType} {/* Display "BUY" or "SELL" */}
        </Button>

        <Button
          onClick={() => setOrderType((prev) => (prev === "BUY" ? "SELL" : "BUY"))}
          className="w-full mt-5 text-xl"
          variant="link"
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"} {/* Toggle between BUY and SELL */}
        </Button>
      </div>

      {/* Success message display */}
      {successMessage && (
        <div className="mt-5 p-4 border rounded-md bg-green-100 text-green-800">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TradingForm; // Export the TradingForm component
