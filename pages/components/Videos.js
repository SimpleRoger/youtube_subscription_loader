import React, { useEffect, useState } from "react";
import { getVideos } from "../api/getVideos";

export default function Videos() {
  const [videos, setVideos] = useState(null);
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
        const fetchedVideos = await getVideos();
        setVideos(fetchedVideos);
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
  return (
    <div className="flex flex-col gap-10">
      {videos?.map((videoGroup, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-10">
          {videoGroup.map((video, videoIndex) => (
            <div key={videoIndex}>
              <VideoPlayer key={video.id.videoId} videoId={video.id.videoId} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
