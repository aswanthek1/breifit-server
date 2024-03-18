exports.generateLast5DaysDate = () => {
    const currentDate = new Date();

    // Initialize an empty array to store the dates
    const datesArray = {
        slicedDate: [],
        originalDate: []
    };

    // Loop to get the dates of the last 5 days
    for (let i = 0; i < 5; i++) {
        // Get the date string in 'YYYY-MM-DD' format
        const dateString = currentDate.toISOString().slice(0, 10);

        // Add the date string to the array
        datesArray.slicedDate.push(dateString);
        datesArray.originalDate.push(currentDate.toISOString())

        // Move to the previous day
        currentDate.setDate(currentDate.getDate() - 1);
    }
    return datesArray;
}