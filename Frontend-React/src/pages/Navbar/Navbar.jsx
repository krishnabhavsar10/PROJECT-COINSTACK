// Importing necessary components and libraries
import { Button } from "@/components/ui/button"; // Custom Button component
import { Input } from "@/components/ui/input"; // Custom Input component
import { 
  MagnifyingGlassIcon, 
  HomeIcon, 
  BookmarkIcon, 
  ListBulletIcon 
} from "@radix-ui/react-icons"; // Radix UI icons for the menu items
import { 
  CreditCardIcon, 
  LandmarkIcon, 
  WalletIcon, 
  BarChart3Icon, 
  UserCircleIcon 
} from "lucide-react"; // Lucide React icons for the menu items
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { useState } from "react"; // React hook for managing state
import { useSelector, useDispatch } from "react-redux"; // Redux hooks for state and dispatch
import { logout } from "@/Redux/Auth/Action"; // Logout action from Redux

// Array of menu items, including name, path, and icon
const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Portfolio", path: "/portfolio", icon: <BarChart3Icon className="h-6 w-6" /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
  { name: "Activity", path: "/activity", icon: <ListBulletIcon className="h-6 w-6" /> },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-6 w-6" /> },
  { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className="h-6 w-6" /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Profile", path: "/profile", icon: <UserCircleIcon className="h-6 w-6" /> },
  { name: "Logout", path: "/" }, // Logout button that triggers a special function
];

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook to navigate between routes
  const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions (like logout)
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input field

  // Function to navigate to the specified path
  const handleNavigate = (path) => {
    navigate(path); // Navigate to the specified path
  };

  // Function to handle logout and redirect to the home page
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action from Redux
    navigate("/"); // Navigate to the home page after logout
  };

  // Function to handle key press in the search field (e.g., Enter key)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`); // Navigate to search results page with query
    }
  };

  return (
    <>
      <div className="px-6 py-4 border-b bg-white fixed top-0 left-0 right-0 flex justify-between items-center shadow-md z-50">
        {/* Left Section: Branding and Search */}
        <div className="flex items-center gap-8">
          <p 
            onClick={() => navigate("/")} // Navigate to home page when brand name is clicked
            className="text-2xl font-extrabold cursor-pointer text-orange-700 tracking-wide"
          >
            Coin<span className="text-gray-800">Stack</span> {/* Brand name */}
          </p>
          
          {/* Search Input Field */}
          <div className="relative ml-0">
            <Input
              type="text"
              placeholder="Search..." // Placeholder for search input
              value={searchTerm} // Bind search input value to state
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
              onKeyDown={handleKeyPress} // Trigger search on Enter key press
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 w-64" // Styling for input field
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 text-gray-500" /> {/* Magnifying glass icon inside input */}
          </div>
        </div>

        {/* Right Section: Navigation Links */}
        <div className="flex items-center gap-8">
          {menu.map((item) => (
            <Button
              key={item.name} // Unique key for each button
              onClick={() => (item.name === "Logout" ? handleLogout() : handleNavigate(item.path))} // Navigate or logout based on item name
              variant="ghost" // Ghost style button (outline style)
              className="text-gray-700 hover:text-orange-700 text-base flex items-center gap-2 px-3 py-2 font-medium" // Styling for buttons
            >
              {item.icon && <span>{item.icon}</span>} {/* Render the icon if available */}
              {item.name} {/* Render the menu item name */}
            </Button>
          ))}
        </div>
      </div>

      {/* Add Padding to Prevent Overlapping with Content */}
      <div className="pt-20"></div> {/* Spacer to avoid navbar overlapping with page content */}
    </>
  );
};

export default Navbar; // Export the Navbar component for use in other parts of the app
