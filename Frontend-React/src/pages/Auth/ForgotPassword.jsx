import { Input } from "@/components/ui/input"; // Importing custom Input component for text input fields
// import "./Login.css"; // Uncommented: Custom CSS for Login (not used here, but for styling)
import { Button } from "@/components/ui/button"; // Importing Button component for user interactions
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"; // Importing Form components to create structured form elements
import { useForm } from "react-hook-form"; // Custom React hook for form handling
import { zodResolver } from "@hookform/resolvers/zod"; // Zod resolver to validate form data using Zod schema
import { z } from "zod"; // Zod library for schema validation
import { useDispatch } from "react-redux"; // Redux hook to dispatch actions to the store
import { sendResetPassowrdOTP } from "@/Redux/Auth/Action"; // Action for sending reset password OTP
import { useNavigate } from "react-router-dom"; // Hook for navigating to different routes in the app
import { useState } from "react"; // React hook to manage local state in the component

// Zod schema to validate the form input (email)
const formSchema = z.object({
  email: z.string().email("Invalid email address"), // Ensures the email is valid
});

// ForgotPasswordForm component
const ForgotPasswordForm = () => {
  const [verificationType, setVerificationType] = useState("EMAIL"); // State to manage the verification method (default to EMAIL)
  const navigate = useNavigate(); // Hook to navigate to different routes (e.g., after form submission)
  const dispatch = useDispatch(); // Dispatch function to trigger Redux actions
  const form = useForm({
    resolver: zodResolver(formSchema), // Using Zod for validation on form submission
    defaultValues: {
      email: "", // Initial value for the email field
    },
  });

  // Function to handle form submission
  const onSubmit = (data) => {
    data.navigate = navigate; // Add navigate function to the data object
    dispatch(
      sendResetPassowrdOTP({
        sendTo: data.email, // The email entered by the user
        navigate, // The navigate function to redirect after action completion
        verificationType, // The type of verification (e.g., via email)
      })
    );
    console.log("login form", data); // Log the form data for debugging
  };

  return (
    <div className="space-y-5">
      {/* Container for the form with vertical spacing between elements */}

      <h1 className="text-center text-xl">
        Where do you want to get the code?
      </h1>
      {/* Heading to ask the user where they want to receive the OTP */}

      <Form {...form}>
        {/* Form wrapper that binds form to the 'form' object from useForm */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Form element with 'onSubmit' handler for form validation and submission */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* FormItem to wrap the input field */}
                <FormControl>
                  {/* FormControl to manage the input field's state and validation */}
                  <Input
                    {...field} // Binding the form field to the input
                    className="border w-full border-gray-700 py-5 px-5 text-white placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                  {/* Styled Input component with full width, padding, gray border, and white text */}
                </FormControl>

                <FormMessage />
                {/* Displaying error messages, if any */}
              </FormItem>
            )}
          />
          {/* Rendered form field for the email input */}

          <Button type="submit" className="w-full bg-slate-400 py-5">
            Send OTP
          </Button>
          {/* Submit button to trigger the form submission, styled with full width and background color */}
        </form>
      </Form>
      {/* Closing the form component */}
    </div>
  );
};

export default ForgotPasswordForm;
