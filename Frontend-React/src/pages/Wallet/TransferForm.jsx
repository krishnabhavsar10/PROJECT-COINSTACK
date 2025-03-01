import { transferMoney } from "@/Redux/Wallet/Action";
import { Button } from "@components/ui/button";
import { DialogClose } from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransferForm = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);
  const availableBalance = wallet.userWallet?.balance || 0;

  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });
  const [error, setError] = useState({ amount: "", walletId: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "amount") {
      const amountValue = parseFloat(value);
      if (isNaN(amountValue) || amountValue <= 0) {
        setError((prev) => ({ ...prev, amount: "Amount must be a positive number" }));
      } else if (amountValue > availableBalance) {
        setError((prev) => ({ ...prev, amount: "Amount exceeds available balance" }));
      } else {
        setError((prev) => ({ ...prev, amount: "" }));
      }
    }

    if (name === "walletId" && !value.trim()) {
      setError((prev) => ({ ...prev, walletId: "Wallet ID is required" }));
    } else {
      setError((prev) => ({ ...prev, walletId: "" }));
    }
  };

  const handleSubmit = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError((prev) => ({ ...prev, amount: "Amount must be a positive number" }));
      return;
    }
    if (parseFloat(formData.amount) > availableBalance) {
      setError((prev) => ({ ...prev, amount: "Amount exceeds available balance" }));
      return;
    }
    if (!formData.walletId.trim()) {
      setError((prev) => ({ ...prev, walletId: "Wallet ID is required" }));
      return;
    }
    
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: { amount: formData.amount, purpose: formData.purpose },
      })
    );
  };

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7"
          placeholder="$9999"
          type="number"
        />
        {error.amount && <p className="text-red-500 text-sm mt-1">{error.amount}</p>}
      </div>
      <div>
        <h1 className="pb-1">Enter Wallet ID</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-7"
          placeholder="#ADFE34456"
        />
        {error.walletId && <p className="text-red-500 text-sm mt-1">{error.walletId}</p>}
      </div>
      <div>
        <h1 className="pb-1">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7"
          placeholder="Gift for your friend..."
        />
      </div>
      {!(!!error.amount || !!error.walletId || !formData.amount || !formData.walletId) ? (
        <DialogClose>
          <Button
            onClick={handleSubmit}
            variant=""
            className="w-full p-7 text-xl"
          >
            Send
          </Button>
        </DialogClose>
      ) : (
        <Button
          disabled
          variant=""
          className="w-full p-7 text-xl"
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default TransferForm;