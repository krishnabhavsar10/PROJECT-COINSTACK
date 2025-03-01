/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Disabling ESLint warnings for unused variables and prop types

import { sendVerificationOtp, verifyOtp } from "@/Redux/Auth/Action"; 
// Importing Redux actions for sending and verifying OTP

import { Button } from "@/components/ui/button"; 
// Importing custom button component

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
// Importing dialog components for the OTP modal

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"; 
// Importing OTP input components

import { useState } from "react"; 
// Importing useState hook for local state management

import { useDispatch, useSelector } from "react-redux"; 
// Importing Redux hooks to dispatch actions and access state

const AccountVerificationForm = ({ handleSubmit }) => {
  const [otp, setOtp] = useState(""); 
  // State to store user-entered OTP

  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  // State to manage OTP dialog visibility

  const [error, setError] = useState(""); 
  // State to store and display OTP errors

  const dispatch = useDispatch(); 
  // Hook to dispatch Redux actions

  const { auth } = useSelector((store) => store); 
  // Getting authentication-related state from Redux store

  // Function to handle sending OTP
  const handleSendOtp = () => {
    dispatch(
      sendVerificationOtp({
        verificationType: "EMAIL",
        jwt: localStorage.getItem("jwt"), // Fetching JWT from local storage
      })
    );
    setIsDialogOpen(true); // Opening OTP modal after sending OTP
    setError(""); // Resetting error message when opening the dialog
  };

  // Function to handle OTP input change
  const handleOtpChange = (value) => {
    setOtp(value); // Updating OTP state
    if (error) setError(""); // Clearing error message on new input
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) { 
      setError("Enter a 6-digit OTP."); // Checking OTP length and setting error
      return;
    }

    const response = await dispatch(verifyOtp({ otp })); 
    // Dispatching action to verify OTP

    if (response?.success) { 
      handleSubmit(otp); // If successful, calling the parent function
      setIsDialogOpen(false); // Closing the OTP modal on success
    } else {
      setError("Invalid OTP. Try again."); // Showing error message for invalid OTP
    }
  };

  return (
    <div className="flex justify-center mt-5"> 
      {/* Centering the component with margin from the top */}
      <div className="w-full max-w-md bg-white p-4 shadow-md rounded-md"> 
        {/* Container with max width, white background, padding, shadow, and rounded corners */}
        <div className="flex justify-between items-center"> 
          {/* Flexbox for alignment of email and OTP button */}
          <p className="text-sm font-medium">Email:</p> 
          {/* Label for email field */}
          <p className="text-sm text-gray-600">{auth.user?.email}</p> 
          {/* Displaying user email from Redux state */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}> 
            {/* Dialog component to handle OTP modal */}
            <DialogTrigger asChild> 
              {/* Using Button as the trigger for opening dialog */}
              <Button size="sm" onClick={handleSendOtp}> 
                {/* Button to send OTP */}
                Send OTP
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm"> 
              {/* Modal content with max width */}
              <DialogHeader>
                <DialogTitle className="text-center text-lg">Enter OTP</DialogTitle> 
                {/* Title inside the OTP modal */}
              </DialogHeader>
              <div className="flex flex-col items-center gap-2"> 
                {/* Centering OTP input and buttons with spacing */}
                <InputOTP value={otp} onChange={handleOtpChange} maxLength={6}> 
                  {/* OTP input component with max length 6 */}
                  <InputOTPGroup> 
                    {/* First group of OTP input slots */}
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator /> 
                  {/* Separator between OTP groups */}
                  <InputOTPGroup> 
                    {/* Second group of OTP input slots */}
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {error && <p className="text-red-500 text-xs">{error}</p>} 
                {/* Displaying error message if OTP is invalid */}

                <Button onClick={handleVerifyOtp} className="w-full" disabled={otp.length !== 6}> 
                  {/* Button to verify OTP, disabled if OTP is not 6 digits */}
                  Submit
                </Button>
              </div>
              <DialogClose className="absolute top-2 right-2" /> 
              {/* Close button positioned at the top-right of the modal */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationForm; 
// Exporting component for use in other parts of the application
