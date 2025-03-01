// Importing necessary components and libraries
import { Input } from "@/components/ui/input"; // Input field component
// import "./Login.css"; // Optional: Custom CSS for styling (commented out)
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
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { login } from "@/Redux/Auth/Action"; // Importing the login action from Redux
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loading component (not used in this code)
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop"; // Custom spinner component
// import { toast } from "@/components/ui/use-toast"; // Optional: Toast for notifications (commented out)
import { ToastAction } from "@/components/ui/toast"; // Importing ToastAction for handling toast notifications
import { useToast } from "@/components/ui/use-toast"; // Custom hook for using toast notifications

// Zod schema to validate the form fields
const formSchema = z.object({
  email: z.string().email("Invalid email address"), // Email must be valid
  password: z.string().min(8, "Password must be at least 8 characters long"), // Password must be at least 8 characters
});

const LoginForm = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const { auth } = useSelector((store) => store); // Accessing 'auth' state from Redux store
  const { toast } = useToast(); // Using the toast hook for notifications
  const form = useForm({
    resolver: zodResolver(formSchema), // Using Zod resolver for form validation
    defaultValues: {
      email: "", // Default value for email input
      password: "", // Default value for password input
    },
  });

  // Handling form submission
  const onSubmit = (data) => {
    data.navigate = navigate; // Adding navigate to the form data
    dispatch(login(data)); // Dispatching the login action with form data
    console.log("login form", data); // Logging the form data for debugging
  };

  return (
    <div className="space-y-5">
      {/* Page title for Login */}
      <h1 className="text-center text-white text-xl">Login</h1>
      
      {/* Wrapping the form components with the Form component */}
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} // Handling form submission
          onKeyDown={(e) => e.key === "Enter" && form.handleSubmit(onSubmit)()} // Handling Enter key press to submit the form
          className="space-y-4" // Adding space between form fields
        >

          {/* Email field */}
          <FormField
            control={form.control} // Connecting form control to the email field
            name="email" // Field name
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // Spread the field properties
                    className="border w-full border-gray-700 py-5 px-5 text-white" // Custom input styles
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
                    className="border w-full border-gray-700 py-5 px-5 text-white" // Custom input styles
                    placeholder="Enter your password" // Placeholder text
                  />
                </FormControl>
                <FormMessage /> {/* Validation message (if any) */}
              </FormItem>
            )}
          />

          {/* Displaying the Login button or loading spinner */}
          {!auth.loading ? (
            <Button type="submit" className="w-full py-5"> {/* Login button */}
              Login
            </Button>
          ) : (
            <SpinnerBackdrop show={true} /> // Show spinner when loading
          )}
        </form>
      </Form>
    </div>
  );
};

// Exporting LoginForm component for use in other parts of the app
export default LoginForm;
