// 'Activity.jsx' is created to display the "Treading History" section.
// It helps in organizing the code and makes it reusable in other parts of the app.

// Importing the TreadingHistory component from another file in the 'Portfolio' folder
import TreadingHistory from '../Portfilio/TreadingHistory'

// Defining the 'Activity' component
const Activity = () => {
  return (
    // Main wrapper div with padding of 20 units on the left and right sides
    <div className='px-20'>
      {/* Title text for the section with padding at the top and bottom, text size 2xl, and bold font */}
      <p className='py-5 pb-10 text-2xl font-semibold'>Trading History</p>
      
      {/* Rendering the TreadingHistory component inside the Activity component */}
      <TreadingHistory />
    </div>
  )
}

// Exporting the Activity component so it can be used in other parts of the application
export default Activity
