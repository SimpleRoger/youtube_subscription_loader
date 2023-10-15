import axios from "axios";

const API_KEY = "AIzaSyCKwa7zD5KLqb8BkAEDf0KtEhO1AKCYjjA"; // Replace with your YouTube Data API key
const channelID = ["UCwQnoax3HWID1WOzZ4mqLPQ"];
let returnData = [];
const getVideos = async () => {
  //   const channelId = "";
  const publishedAfter = "2023-10-09T00:00:00Z";
  //
  try {
    for (let i = 0; i < channelID.length; i++) {
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelID[0]}&order=date&publishedAfter=${publishedAfter}&key=${API_KEY}`;
      const response = await axios.get(apiUrl);
      returnData.push(repsonse);
    }
    return returnData;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
};

export { getVideos };
