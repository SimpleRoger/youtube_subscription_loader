import React, { useEffect, useState } from "react";
import { getVideos } from "../api/getVideos";
import { useSelector } from "react-redux";

export default function Videos({ user }) {
  const [videos, setVideos] = useState(null);
  // const user = useSelector((state) => state.user);

  function VideoPlayer({ videoId }) {
    return (
      <div className="w-screen mx-auto flex justify-center">
        <iframe
          width="70%"
          height="600"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`YouTube Video - ${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  useEffect(() => {
    async function fetchVideos() {
      try {
        setTimeout(async () => {
          console.log("videos PAGE");
          console.log(user);
          await getVideos(user);

          //here instead of fetching we simply just get it from local browser storage
          const storedData = JSON.parse(localStorage.getItem("apiData"));
          if (storedData) {
            // Data was found in local storage
            console.log(storedData);
            const parsedData = storedData;
            // Now you can use parsedData as your API response
            console.log("Data from local storage:", parsedData);
            console.log(JSON.stringify(parsedData));
            setVideos(parsedData);
            var arr = JSON.parse(localStorage.getItem("apiData"));
            // listSpan.innerText = arr[0].listname;
            console.log(arr);
            console.log(storedData[0].listname);
          } else {
            // Data was not found in local storage or has expired, handle this case as needed

            console.log("No data found in local storage or it has expired.");
          }
        }, 1000);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    if (videos == null) {
      fetchVideos();
    }
  }, []);

  // Wait until videos are fetched before rendering
  if (!videos) {
    return <div>Loading videos...</div>;
  }

  // Videos are fetched, you can now access them
  //   console.log(videos.etag);
  console.log("VIDEOS");
  console.log(videos);
  // Parse the JSON data
  const parsedData = videos.map((videos) => JSON.parse(videos));

  // Map through the data and display each video

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        {parsedData.map((videoArray, index) => (
          <div key={index} className="flex flex-col gap-10">
            {videoArray.map((video) => (
              <div key={video.id.videoId} className="flex flex-col gap-10">
                <div key={video.id.videoId} className="max-w-[1500px]">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    title={`YouTube Video - ${video.id.videoId}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>{" "}
                  {/* You can display other video information here */}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
