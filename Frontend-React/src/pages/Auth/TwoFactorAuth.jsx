import { twoStepVerification } from "@/Redux/Auth/Action";
import CustomeToast from "@/components/custome/CustomeToast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TwoFactorAuth = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { session } = useParams();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleTwoFactoreAuth = () => {
    dispatch(twoStepVerification({ otp: value, session, navigate }));
    console.log(value);
  };

  return (
    <div>
      <CustomeToast show={auth.error} message={auth.error?.error} />
      <div className="flex flex-col gap-5 h-screen justify-center items-center">
        <Card className="p-5 flex flex-col justify-center items-center border border-black">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://cdn.dribbble.com/users/1125847/screenshots/15197732/media/7201b01895b7b60d33eea77d098eb7b3.png?resize=1600x1200&vertical=center" />
          </Avatar>
          <CardHeader>
            <div className="flex items-center gap-5">
              <h1 className="text-xl font-semibold">Two Step Verification</h1>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div 
              onKeyDown={(e) => e.key === "Enter" && handleTwoFactoreAuth()}
              tabIndex={0} // Ensures it can listen to key events
            >
              <InputOTP
                value={value}
                onChange={(value) => setValue(value)}
                maxLength={6}
                className="flex justify-center gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="border border-black text-black focus:ring-0 focus:border-black"
                  />
                  <InputOTPSlot
                    index={1}
                    className="border border-black text-black focus:ring-0 focus:border-black"
                  />
                  <InputOTPSlot
                    index={2}
                    className="border border-black text-black focus:ring-0 focus:border-black"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={3}
                    className="border border-black text-black focus:ring-0 focus:border-black"
                  />
                  <InputOTPSlot
                    index={4}
                    className="border border-black text-black focus:ring-0 focus:border-black"
                  />
                  <InputOTPSlot
                    index={5}
                    className="border border-black text-black focus:ring-0 focus:border-black"
                  />
                </InputOTPGroup>
              </InputOTP>
              <p className="mt-2 text-black-300 text-sm text-black text-center">
                Check your email for OTP
              </p>
            </div>
            <Button onClick={handleTwoFactoreAuth} className="w-full">
              Verify
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
