import React, { useEffect, useState } from "react";
import { getVideos } from "../api/getVideos";

export default function Videos() {
  const [videos, setVideos] = useState(null);
  function VideoPlayer({ videoId }) {
    return (
      <div>
        <iframe
          width="560"
          height="315"
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

    fetchVideos();
  }, []);

  // Wait until videos are fetched before rendering
  if (!videos) {
    return <div>Loading videos...</div>;
  }

  // Videos are fetched, you can now access them
  //   console.log(videos.etag);
  let videoss = videos.items;
  return (
    <div>
      {videoss.map((video) => (
        <VideoPlayer key={video.id.videoId} videoId={video.id.videoId} />
      ))}
    </div>
  );
}
