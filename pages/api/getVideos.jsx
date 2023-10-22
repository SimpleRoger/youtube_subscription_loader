import axios from "axios";

const getVideos = async () => {
  //   const channelId = "";
  const channelID = [
    "UCwQnoax3HWID1WOzZ4mqLPQ",
    "UCJ24N4O0bP7LGLBDvye7oCA",
    "UCxTYD_ycrBfhCK_cH-QrPBA",
    "UCtUId5WFnN82GdDy7DgaQ7w",
    "UCtUId5WFnN82GdDy7DgaQ7w",
    "UC5b05foL_cpyxTpDzithwNw",
    "UC3QzTw6dhgxlPeyWJeXegwA",
  ];
  const API_KEY = "AIzaSyCKwa7zD5KLqb8BkAEDf0KtEhO1AKCYjjA"; // Replace with your YouTube Data API key
  const publishedAfter = "2023-10-09T00:00:00Z";
  let returnData = [];
  //
  try {
    for (let i = 0; i < channelID.length; i++) {
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelID[i]}&order=date&publishedAfter=${publishedAfter}&key=${API_KEY}`;
      // const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?channelId=UCwQnoax3HWID1WOzZ4mqLPQ&order=date&publishedAfter=2023-10-09T00%3A00%3A00Z&key=AIzaSyCKwa7zD5KLqb8BkAEDf0KtEhO1AKCYjjA`;
      const response = await axios.get(apiUrl);
      if (response.data.items.length != 0) {
        returnData.push(response.data.items);
      }
      console.log(returnData);
    }
    return returnData;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
};

export { getVideos };
