import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PencilIcon } from "lucide-react";
import AccountVarificationForm from "./AccountVarificationForm";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEnableTwoStepVerification = (otp) => {
    console.log("EnableTwoStepVerification", otp);
    dispatch(enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp }));
  };

  const defaultUserInfo = {
    email: auth.user?.email || "",
    fullName: auth.user?.fullName || "Not Entered Yet",
    dob: "",
    nationality: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  };

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isEdited, setIsEdited] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (auth.user) {
      setUserInfo({
        ...userInfo,
        fullName: auth.user.fullName || "Not Entered Yet",
        email: auth.user.email || "",
      });
    }
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    setIsEdited({ ...isEdited, [name]: true });
  };

  const validateFields = () => {
    let newErrors = {};
    Object.keys(userInfo).forEach((key) => {
      if (key !== "email" && key !== "fullName" && !userInfo[key].trim()) {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      setIsSaved(true);
      console.log("Updated Info: ", userInfo);
      setIsEditOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="pb-9 bg-gray-100 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-900">Your Information</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-5">
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem] font-medium">Full Name:</p>
                  <p className="text-black">{userInfo.fullName}</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem] font-medium">Email:</p>
                  <p className="text-black">{userInfo.email}</p>
                </div>
              </div>
              <div className="space-y-7">
                {Object.entries(userInfo)
                  .filter(([key]) => key !== "email" && key !== "fullName" && userInfo[key])
                  .map(([key, value]) => (
                    <div className="flex" key={key}>
                      <p className="w-[9rem] font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
                      <p className={`${isSaved ? "text-black" : "text-gray-500 opacity-50"}`}>{value}</p>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                {auth.user.twoFactorAuth?.enabled ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <span>{"Enabled"}</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enable Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="px-10 pt-5 text-center">
                        Verify your account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
