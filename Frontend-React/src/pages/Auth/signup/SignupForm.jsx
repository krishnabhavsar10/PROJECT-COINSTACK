/* eslint-disable no-unused-vars */ 
// Disables the ESLint rule for unused variables in this file (if any)

// Importing necessary components and libraries
import { Input } from "@/components/ui/input"; // Input field component
import { Button } from "@/components/ui/button"; // Button component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"; // Form components for handling form validation and rendering
import { useForm } from "react-hook-form"; // React hook for form handling
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver to integrate Zod schema validation
import { z } from "zod"; // Zod library for defining validation schemas
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { register } from "@/Redux/Auth/Action"; // Importing the register action from Redux
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop"; // Custom spinner component

// Zod schema to validate the form fields
const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"), // Full name field should not be empty
  email: z.string().email("Invalid email address").nonempty("Email is required"), // Email should be valid and not empty
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"), // Password must have at least 8 characters and cannot be empty
});

const SignupForm = () => {
  const { auth } = useSelector((store) => store); // Accessing 'auth' state from Redux store
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Redux hook to dispatch actions

  // Using react-hook-form for form handling with Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema), // Using Zod resolver for form validation
    defaultValues: {
      email: "", // Default value for email input
      password: "", // Default value for password input
      fullName: "", // Default value for full name input
    },
  });

  // Handling form submission
  const onSubmit = async (data) => {
    try {
      await dispatch(register(data)); // Dispatching the register action with form data
      console.log("Signup form submitted:", data); // Logging the form data for debugging

      // Show success message
      alert("Registration successful! Redirecting to login...");

      // Redirect to the login page after successful registration
      navigate("/signin");
    } catch (error) {
      console.error("Registration failed:", error); // Logging any errors during registration
    }
  };

  return (
    <div className="space-y-5">
      {/* Page title for Signup */}
      <h1 className="text-center text-xl text-white">Create New Account</h1>
      
      {/* Wrapping the form components with the Form component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Full Name field */}
          <FormField
            control={form.control} // Connecting form control to the full name field
            name="fullName" // Field name
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // Spread the field properties
                    type="text" // Setting input type as text
                    className="border w-full border-gray-700 py-5 px-5 text-white placeholder-gray-400 bg-transparent" // Custom input styles
                    placeholder="Enter your full name" // Placeholder text
                  />
                </FormControl>
                <FormMessage /> {/* Validation message (if any) */}
              </FormItem>
            )}
          />
          
          {/* Email field */}
          <FormField
            control={form.control} // Connecting form control to the email field
            name="email" // Field name
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // Spread the field properties
                    type="email" // Setting input type as email
                    className="border w-full border-gray-700 py-5 px-5 text-white placeholder-gray-400 bg-transparent" // Custom input styles
                    placeholder="Enter your email" // Placeholder text
                  />
                </FormControl>
                <FormMessage /> {/* Validation message (if any) */}
              </FormItem>
            )}
          />
          
          {/* Password field */}
          <FormField
            control={form.control} // Connecting form control to the password field
            name="password" // Field name
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // Spread the field properties
                    type="password" // Setting input type as password
                    className="border w-full border-gray-700 py-5 px-5 text-white placeholder-gray-400 bg-transparent" // Custom input styles
                    placeholder="Enter your password" // Placeholder text
                  />
                </FormControl>
                <FormMessage /> {/* Validation message (if any) */}
              </FormItem>
            )}
          />

          {/* Displaying the Register button or loading spinner */}
          {!auth.loading ? (
            <Button type="submit" className="w-full py-5"> {/* Register button */}
              Register
            </Button>
          ) : (
            <SpinnerBackdrop show={true} /> // Show spinner when loading
          )}
        </form>
      </Form>
    </div>
  );
};

// Exporting SignupForm component for use in other parts of the app
export default SignupForm;
