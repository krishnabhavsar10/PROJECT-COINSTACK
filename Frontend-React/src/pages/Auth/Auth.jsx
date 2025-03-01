/* eslint-disable no-unused-vars */ 
// Disables the ESLint rule for unused variables in this file (useful when there are imports or variables that are not used)

// Importing necessary styles and components
import "./Auth.css"; // Importing custom CSS for the authentication page to style elements
import { Button } from "@/components/ui/button"; // Button component used for user interactions

// Importing form components for different authentication states (signup, login, and forgot password)
import SignupForm from "./signup/SignupForm"; // Signup form component
import LoginForm from "./login/login"; // Login form component
import { useLocation, useNavigate } from "react-router-dom"; // React Router hooks for managing navigation and location
import { useState } from "react"; // React hook for managing local state in the component
import ForgotPassword from "./ForgotPassword"; // Forgot Password page component
import ForgotPasswordForm from "./ForgotPassword"; // Forgot Password form component
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton component (not used in this code, but imported for potential loading state)
import { useSelector } from "react-redux"; // Redux hook to access global state from the Redux store
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop"; // Custom spinner component to show during loading
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Avatar components (not used in this code)
import { AvatarFallback } from "@radix-ui/react-avatar"; // Avatar fallback component (not used in this code)
import { ToastAction } from "@/components/ui/toast"; // Toast action component (not used in this code)
import { useToast } from "@/components/ui/use-toast"; // Custom hook for managing toast notifications
import CustomeToast from "@/components/custome/CustomeToast"; // Custom toast component to show messages to users

const Auth = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between pages
  const location = useLocation(); // Hook to get the current URL location/pathname
  const { auth } = useSelector((store) => store); // Access the 'auth' slice from the Redux store to check authentication status or error
  const { toast } = useToast(); // Hook for managing toast notifications

  const [animate, setAnimate] = useState(false); // State to control animations on form transitions (e.g., sliding up/down)

  const handleNavigation = (path) => {
    navigate(path); // Function to navigate to the specified 'path' (URL)
  };

  const [showToast, setShowToast] = useState(false); // State to toggle visibility of the toast notification

  const handleShowToast = () => {
    setShowToast(true); // Function to show toast notification by setting showToast state to true
  };

  console.log("---------- ", auth.error); // Log any authentication errors for debugging purposes

  return (
    <div className={`authContainer h-screen relative`}>
      {/* Outer div with class 'authContainer', taking the full screen height (h-screen) and positioned relative for absolute positioning of inner elements */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50"></div>
      {/* Overlay div with black background and opacity to create a darkened effect behind the authentication form */}

      <div
        className={`bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white`}
      >
        {/* Main authentication form container with specific styles:
          - Positioned in the center of the screen using absolute positioning and transform
          - Flexbox for centering content
          - Fixed size with 'h-[35rem]' (height) and 'w-[30rem]' (width)
          - Rounded corners (rounded-md) and box shadow (shadow-2xl) for styling
          - Background with black color and opacity for darkened effect */}
          
        {/* Conditional rendering of custom error toast */}
        <CustomeToast show={auth.error} message={auth.error?.error} />

        <h1 className="text-6xl font-bold pb-9 text-white ">CoinStack</h1>
        {/* Heading with large font size (text-6xl), bold, padding bottom (pb-9), and white color */}

        {/* Conditional rendering based on URL pathname (either showing signup, forgot-password, or login forms) */}
        {location.pathname == "/signup" ? (
          <section className={`w-full login ${animate ? "slide-down" : "slide-up"}`}>
            {/* Signup form section, animated using 'slide-down' or 'slide-up' based on 'animate' state */}
            <div className={`loginBox w-full px-10 space-y-5`}>
              {/* Container for the signup form with full width and padding */}
              <SignupForm /> {/* Render the SignupForm component */}

              <div className="flex items-center justify-center text-white">
                {/* Flexbox for centering text and button */}
                <span>Already have an account ?</span>
                <Button
                  onClick={() => handleNavigation("/signin")} // Navigates to login page
                  variant="ghost" // 'ghost' variant means the button has no background but retains text styling
                  className="text-white underline" // Styling the button text with white color and underlining
                >
                  Signin
                </Button>
              </div>
            </div>
          </section>
        ) : location.pathname == "/forgot-password" ? (
          <section className="p-5 w-full">
            {/* Forgot password form section */}
            <ForgotPasswordForm />
            <div className="flex items-center justify-center mt-5 text-white">
              {/* Link to navigate back to the login page */}
              {/* <span>Back To Login?</span> */}
              <Button
                onClick={() => navigate("/signin")} // Navigates back to login page
                variant="ghost" // 'ghost' variant button style
                className="text-white underline" // Styling button text with white color and underline
              >
                Signin
              </Button>
            </div>
          </section>
        ) : (
          <section className={`w-full login`}>
            {/* Login form section */}
            <div className={`loginBox w-full px-10 space-y-5`}>
              {/* Container for the login form */}
              <LoginForm /> {/* Render the LoginForm component */}

              <div className="flex items-center justify-center text-white">
                {/* Flexbox for centering text and button */}
                <span>Already have an account ?</span>
                <Button
                  onClick={() => handleNavigation("/signup")} // Navigates to signup page
                  variant="ghost" // 'ghost' variant style for button (no background color)
                  className="text-white underline" // Button text is white and underlined
                >
                  Signup
                </Button>
              </div>

              <div className="">
                <Button
                  onClick={() => navigate("/forgot-password")} // Navigates to forgot password page
                  variant="ghost" // 'ghost' variant for button style (no background, just text styling)
                  className="w-full py-2 text-base font-semibold text-white" 
                  // Full width button, padding, base text size, bold font, white text color
                >
                  Forgot Password ?
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
