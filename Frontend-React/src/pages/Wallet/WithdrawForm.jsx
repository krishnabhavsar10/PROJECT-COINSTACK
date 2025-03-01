import { withdrawalRequest } from "@/Redux/Withdrawal/Action";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DialogClose } from "@components/ui/dialog";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { useNavigate } from "react-router-dom";

const WithdrawForm = ({ onWithdrawComplete }) => { // Accept callback prop
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [localBalance, setLocalBalance] = useState(0);

  const { wallet, withdrawal } = useSelector((store) => store);
  
  useEffect(() => {
    setLocalBalance(wallet.userWallet?.balance || 0);
  }, [wallet.userWallet?.balance]);

  const handleChange = (e) => {
    let value = parseFloat(e.target.value);
    setAmount(value);

    if (isNaN(value) || value <= 0) {
      setError("Amount must be greater than 0");
    } else if (value > localBalance) {
      setError("Amount must be less than or equal to available balance");
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0 || amount > localBalance) {
      setError("Invalid withdrawal amount");
      return;
    }

    try {
      await dispatch(withdrawalRequest({ jwt: localStorage.getItem("jwt"), amount }));
      setLocalBalance((prevBalance) => prevBalance - amount);
      setSuccessMessage(`You have successfully withdrawn $${amount}`);
      setAmount("");
      onWithdrawComplete(); // Trigger balance refresh
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setError("Withdrawal failed. Please try again.");
    }
  };

  if (!withdrawal.paymentDetails) {
    return (
      <div className="h-[20rem] flex gap-5 flex-col justify-center items-center">
        <p className="text-2xl font-bold">Add payment method</p>
        <Button onClick={() => navigate("/payment-details")}>
          Add Payment Details
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center text-xl font-bold px-5 py-4">
        <p>Available balance</p>
        <p>${localBalance}</p>
      </div>

      <div className="flex flex-col items-center">
        <h1>Enter withdrawal amount</h1>
        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div>
        <p className="pb-2">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img className="h-8 w-8" src="/background2.png" alt="Bank Logo" />
          <div>
            <p className="text-xl font-bold">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs">
              {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full py-7 text-xl"
          disabled={!amount || amount > localBalance || amount <= 0}
        >
          Withdraw {amount && <span className="ml-5">${amount}</span>}
        </Button>
      </div>

      {successMessage && (
        <div className="text-green-600 text-center font-semibold mt-4">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default WithdrawForm;
