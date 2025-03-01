export function convertToUnixTimestamp(data) {
    const convertedData = []; // Initialize an empty array to store converted data

    // Iterate over each key-value pair in the input object
    for (const [key, value] of Object.entries(data)) {
        const timestamp = new Date(key).getTime(); // Convert the date string (key) into a Unix timestamp (milliseconds)
        
        // Extract the '1. open' value from the object, convert it to a float, and store it along with the timestamp
        convertedData.push([timestamp, parseFloat(value['1. open'])]);
    }

    return convertedData; // Return the array containing converted timestamp and open price
}
