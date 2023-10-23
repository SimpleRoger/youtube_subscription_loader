import { db } from "@/firebase";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
// import { createUser } from "./createUser"; // You need to define this function
import { useSelector } from "react-redux";
import useSWR from "swr";

const getEntries = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data();
    return posts.subscriptions;
  } else {
    createUser(user);
    return [];
  }
};

const getVideos = async () => {
  const user = useSelector((state) => state.user);
  const channelID = await getEntries(user); // Wait for getEntries to complete
  const API_KEY = "AIzaSyCKwa7zD5KLqb8BkAEDf0KtEhO1AKCYjjA"; // Replace with your YouTube Data API key
  const publishedAfter = "2023-10-09T00:00:00Z";
  let returnData = [];

  try {
    for (let i = 0; i < channelID.length; i++) {
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelID[i]}&order=date&publishedAfter=${publishedAfter}&key=${API_KEY}`;
      const response = await axios.get(apiUrl);
      if (response.data.items.length !== 0) {
        returnData.push(response.data.items);
      }
    }
    return returnData;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
};

export { getVideos };
