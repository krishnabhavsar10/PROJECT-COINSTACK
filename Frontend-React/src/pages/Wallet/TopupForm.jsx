import { paymentHandler } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TopupForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const [error, setError] = useState("");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    
    if (!/^\d*$/.test(value)) {
      setError("Only numeric values are allowed");
      return;
    }
    
    setAmount(value);

    if (value < 1) {
      setError("Amount must be greater than 1");
    } else if (value > 99999) {
      setError("Amount cannot exceed ₹99,999 due to safety and fraud prevention reasons.");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (amount < 1) {
      setError("Amount must be greater than 1");
      return;
    }
    if (amount > 99999) {
      setError("Amount cannot exceed ₹99,999 due to safety and fraud prevention reasons.");
      return;
    }

    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      })
    );
    console.log(amount, paymentMethod);
  };

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-lg"
          placeholder="₹99999"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div>
        <h1 className="pb-1">Select payment method</h1>
        <RadioGroup
          onValueChange={(value) => {
            setPaymentMethod(value);
          }}
          className="flex"
          defaultValue="RAZORPAY"
        >
          <div className="flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              iconClassName="h-8 w-8"
              className="h-9 w-9"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img src="/Razorpay.png" alt="Razorpay" />
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 px-5">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              iconClassName="h-8 w-8"
              value="STRIPE"
              id="r2"
              hidden
            />
            <Label htmlFor="r2" hidden>
              <div className="bg-white rounded-md px-5 py- w-32">
                <img className="h-10" src="/Stripe.png" alt="Stripe" hidden />
              </div>
            </Label>
            
          </div>
        </RadioGroup>
      </div>
      
      {wallet?.loading ? (
  <Skeleton className="py-7 w-full" />
) : (
  <Button
    onClick={handleSubmit}
    variant=""  // Ensure a valid variant or remove if unnecessary
    className="w-full py-7 text-xl">
    Submit
  </Button>
)}

    
    </div>
  );
};

export default TopupForm;
