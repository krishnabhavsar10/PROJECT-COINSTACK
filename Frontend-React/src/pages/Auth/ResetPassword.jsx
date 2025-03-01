import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { verifyResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import * as yup from "yup";
import { useState } from "react";

const formSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords & Confirm Password must match")
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .required("OTP is required"),
});

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return; // Prevent multiple clicks
    setIsSubmitting(true);

    dispatch(
      verifyResetPassowrdOTP({ otp: data.otp, password: data.password, session, navigate })
    );

    console.log("Reset Password Form:", data);
    
    // Simulate API response success
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/password-update-successfully"); // Redirect after successful password reset
    }, 2000);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 bg-opacity-90 text-white">
      <Card className="box flex flex-col items-center justify-center p-10 h-[35rem] w-[30rem] border border-black bg-gray-900 bg-opacity-90">
        <div className="space-y-5 w-full">
          <h1 className="text-center text-xl text-white pb-5">Reset Your Password</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* OTP Input */}
              <h1 className="pb-2 text-white">Verify OTP</h1>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP {...field} maxLength={6} className="text-white">
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="text-white" />
                          <InputOTPSlot index={1} className="text-white" />
                          <InputOTPSlot index={2} className="text-white" />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-white" />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} className="text-white" />
                          <InputOTPSlot index={4} className="text-white" />
                          <InputOTPSlot index={5} className="text-white" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Inputs */}
              <h1 className="pt-7 pb-2 text-white">Change Password</h1>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="border w-full border-gray-700 py-5 px-5 text-white bg-gray-800"
                        placeholder="New password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="border w-full border-gray-700 py-5 px-5 text-white bg-gray-800"
                        placeholder="Confirm password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full py-5" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Change Password"}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
