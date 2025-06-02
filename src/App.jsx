import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [videoSrc, setVideoSrc] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      document.title = file.name;
    }
  };

  return (
    <> 
      <SpeedInsights />
      <div>
        <div className="card">
          <div className="logos">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            <img src={reactLogo} className="logo react" alt="React logo" />
          </div>
          <div className="header">
            <h3>Video Player</h3>
            <input
              type="file"
              accept="video/x-matroska,video/*,.mkv"
              onChange={handleChange}
            />
          </div>
        </div>
        {videoSrc && (
          <video controls src={videoSrc} className="video-player">
            Your browser doesn't support this file type
          </video>
        )}
      </div>
    </>
  );
}

export default App;
