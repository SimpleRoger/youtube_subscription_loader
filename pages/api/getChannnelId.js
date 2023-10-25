import axios from "axios";

const getChannelId = async (entries) => {
  //i have to get all the links from firebase (same as settings)
  //then just go through array
  //   const channelID = await getEntries(user); // Wait for getEntries to complete
  const API_KEY = "AIzaSyCKwa7zD5KLqb8BkAEDf0KtEhO1AKCYjjA"; // Replace with your YouTube Data API key
  const publishedAfter = "2023-10-09T00:00:00Z";
  let returnData = [];

  const storedData = localStorage.getItem("apiDataChannelId");
  const storedTimestamp = localStorage.getItem("apiTimestampChannelId");
  const dataIsStale =
    !storedTimestamp ||
    Date.now() - parseInt(storedTimestamp) > 2 * 60 * 60 * 1000;

  // logic
  if (!dataIsStale) {
    // If data is not stale, use the stored data
    const parsedData = storedData;
    // Use parsedData as your API response
    console.log("Data from local storage:", parsedData);
    console.log("DATA IS NOT STALE");
  } else {
    // Data is stale or not available, make a new API request
    console.log("FETCH DATA AGAIN");
    for (let i = 0; i < entries.length; i++) {
      console.log(entries);
      const apiUrl = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=${entries[i]}&part=id`;
      const response = await axios.get(apiUrl);
      console.log("CHANNEL ID");
      console.log(response);
      // Extract the 'id' property
      if (response.data.items.length !== 0) {
        returnData.push(JSON.stringify(response.data.items[0].id));
        const data = response.data.items;
        console.log("RESPONSE CONSOLE LOG", response.data.items[0].id);
        console.log(data);
        //   const jsonData = JSON.parse(data[0]);

        // Extract the 'id' property
        //   const id = jsonData[0].id;
        //   returnData.push(JSON.stringify(id));
      }
    }
    console.log("RETURNDATA for channel ID", returnData);
    // console.log(returnData);

    //set local stroage to setItem
    localStorage.setItem("apiDataChannelId", JSON.stringify(returnData));
    localStorage.setItem("apiTimestampChannelId", Date.now().toString());
  }
};

export default getChannelId;
