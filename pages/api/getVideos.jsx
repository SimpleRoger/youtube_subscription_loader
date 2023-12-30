import { db } from "@/firebase";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
// import { createUser } from "./createUser"; // You need to define this function
import { useSelector } from "react-redux";
import useSWR from "swr";

const getEntries = async (user) => {
  console.log("getVideos PAGE");
  console.log(user);
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data();
    return posts.subscriptions;
  } else {
    // createUser(user);
    return [];
  }
};

const getVideos = async (user) => {
  const channelID = await getEntries(user); // Wait for getEntries to complete
  const API_KEY = "AIzaSyCKwa7zD5KLqb8BkAEDf0KtEhO1AKCYjjA"; // Replace with your YouTube Data API key
  const publishedAfter = "2023-10-09T00:00:00Z";
  let returnData = [];

  const storedData = localStorage.getItem("apiData");
  const storedTimestamp = localStorage.getItem("apiTimestamp");
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
    for (let i = 0; i < channelID.length; i++) {
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelID[i]}&order=date&publishedAfter=${publishedAfter}&key=${API_KEY}`;
      const response = await axios.get(apiUrl);
      if (response.data.items.length !== 0) {
        returnData.push(JSON.stringify(response.data.items));
      }
    }
    console.log("RETURNDATA");
    console.log(returnData);
    //set local stroage to setItem
    localStorage.setItem("apiData", JSON.stringify(returnData));
    localStorage.setItem("apiTimestamp", Date.now().toString());
  }
};

export { getVideos };
