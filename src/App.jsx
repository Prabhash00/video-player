import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [videoSrc, setVideoSrc] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  return (
    <>
      <div>
        <div className="card">
          <div className="logos">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            <img src={reactLogo} className="logo react" alt="React logo" />
          </div>
          <div className="header">
            <h3 className="heading3">Video Player</h3>
            <input
              type="file"
              accept="video/mkv, video/*,.mkv"
              onChange={handleChange}
              className="file-selector"
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
