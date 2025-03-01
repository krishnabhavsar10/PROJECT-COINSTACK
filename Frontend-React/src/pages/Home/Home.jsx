/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"; // Importing React hooks
import { AssetTable } from "./AssetTable"; // Importing AssetTable component
import { Button } from "@/components/ui/button"; // Importing Button component
import { ChevronLeftIcon } from "@radix-ui/react-icons"; // Importing Chevron Left icon
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import {
  fetchCoinDetails,
  fetchCoinList,
  fetchTreadingCoinList,
  getTop50CoinList,
} from "@/Redux/Coin/Action"; // Importing Redux actions for fetching coin data
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"; // Importing Pagination components
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop"; // Importing custom spinner for loading state

const Home = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const [page, setPage] = useState(1); // State to manage current page number
  const [category, setCategory] = useState("all"); // State to manage the selected category (all, top50, trading)
  const { coin, auth } = useSelector((store) => store); // Accessing coin data and authentication state from Redux store

  // Fetching the coin list based on the current page
  useEffect(() => {
    dispatch(fetchCoinList(page)); // Dispatch the action to fetch the list of coins for the current page
  }, [page]); // Re-run the effect whenever the page number changes

  // Fetching detailed information about a specific coin (Bitcoin) when the component mounts
  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: "bitcoin", // Default coin for details
        jwt: auth.jwt || localStorage.getItem("jwt"), // Using JWT from Redux or local storage for authorization
      })
    );
  }, []); // This effect runs only once when the component mounts

  // Fetching top 50 or trading coin lists based on the selected category
  useEffect(() => {
    if (category === "top50") {
      dispatch(getTop50CoinList()); // Fetch top 50 coins
    } else if (category === "trading") {
      dispatch(fetchTreadingCoinList()); // Fetch trading coins
    }
  }, [category]); // Re-run the effect when the category changes

  // Handling page change
  const handlePageChange = (page) => {
    setPage(page); // Update the page number state
  };

  // If the coins are still loading, show a spinner
  if (coin.loading) {
    return <SpinnerBackdrop />; // Display a custom loading spinner
  }

  return (
    <div className="relative px-6"> {/* Adding padding for spacing */}
      <div className="lg:flex"> {/* Flexbox layout for larger screens */}
        <div className="lg:w-full border rounded-md p-4 shadow-sm"> {/* Border, padding, and shadow for the main content area */}
          <div className="p-3 flex items-center gap-4"> {/* Flex container for buttons */}
            {/* Button for the "All" category */}
            <Button
              variant={category === "all" ? "default" : "outline"} // Conditional button style based on the selected category
              onClick={() => setCategory("all")} // Set category to "all"
              className="rounded-full"
            >
              All
            </Button>
            {/* Button for the "Top 50" category */}
            <Button
              variant={category === "top50" ? "default" : "outline"} // Conditional button style based on the selected category
              onClick={() => setCategory("top50")} // Set category to "top50"
              className="rounded-full"
            >
              Top 50
            </Button>
          </div>
          <div className="border border-gray-300 rounded-lg overflow-hidden"> {/* Border and rounded corners for the table container */}
            {/* Display the AssetTable component with dynamic data based on the category */}
            <AssetTable
              category={category} // Pass the current category
              coins={category === "all" ? coin.coinList : coin.top50} // Display coins based on the category
              className="w-full border-collapse border border-gray-400" /* Faint border styling for the table */
            />
          </div>
          {/* Pagination is only shown for the "all" category */}
          {category === "all" && (
            <Pagination className="border-t py-3"> {/* Adding top border and padding */}
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost" // Ghost button style for pagination
                    disabled={page === 1} // Disable the button if on the first page
                    onClick={() => handlePageChange(page - 1)} // Decrease page number
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" /> {/* Chevron icon for previous */}
                    Previous
                  </Button>
                </PaginationItem>
                {/* Pagination links for page numbers */}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)} // Set to page 1
                    isActive={page === 1} // Mark as active if on page 1
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(2)} // Set to page 2
                    isActive={page === 2} // Mark as active if on page 2
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(3)} // Set to page 3
                    isActive={page === 3} // Mark as active if on page 3
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                {/* If the page number is greater than 3, show the current page */}
                {page > 3 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(page)} isActive>
                      {page} {/* Display current page */}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {/* Ellipsis for pagination overflow */}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  {/* Next page button */}
                  <PaginationNext className="cursor-pointer" onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
