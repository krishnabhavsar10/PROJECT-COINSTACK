import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react"; // Attractive edit icon
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Payment Details</h1>

      {withdrawal.paymentDetails ? (
        <Card className="shadow-lg border border-gray-200 rounded-lg">
          <CardHeader className="bg-gray-100 px-6 py-4 rounded-t-lg">
            {/* Bank Name & Account Number */}
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                {withdrawal.paymentDetails?.bankName.toUpperCase()}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                A/C No: {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 py-5">
            <div className="grid grid-cols-2 gap-6 text-gray-800">
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">A/C Holder:</span>
                <span className="text-gray-500">{withdrawal.paymentDetails.accountHolderName}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">IFSC Code:</span>
                <span className="text-gray-500">{withdrawal.paymentDetails.ifsc.toUpperCase()}</span>
              </div>
            </div>
          </CardContent>

          {/* Edit Button at Bottom */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-center">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 px-5 py-3 rounded-md shadow-md"
                >
                  <PencilIcon className="h-5 w-5" /> Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="pb-5">
                  <DialogTitle>Edit Payment Details</DialogTitle>
                </DialogHeader>
                <PaymentDetailsForm />
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      ) : (
        <div className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="py-4 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-lg">
                Add Payment Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="pb-5">
                <DialogTitle>Payment Details</DialogTitle>
              </DialogHeader>
              <PaymentDetailsForm />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
