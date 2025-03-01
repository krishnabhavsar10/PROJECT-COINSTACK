// Defining the Notfound functional component
const Notfound = () => {
  return (
    <div className="flex gap-3 flex-col min-h-screen items-center justify-center">
      {/* Container with flexbox for centering the content */}
      
      <p className="text-6xl">401</p> {/* Display error code (401 - Unauthorized) */}
      
      <h1 className="text-6xl">Page Not found</h1> {/* Display the page not found message */}
    </div>
  );
};

// Exporting the Notfound component so it can be used in other parts of the app
export default Notfound;
