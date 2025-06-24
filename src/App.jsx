import { useRef, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      document.title = file.name;
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }
  };

  // 🔑 Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const v = videoRef.current;
      if (!v) return;

      if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        e.preventDefault();

        // Remove focus to stop default browser skip
        if (document.activeElement === v) {
          v.blur();
        }

        v.currentTime += e.code === "ArrowRight" ? 5 : -5;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  

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
          <div className="video-wrapper">
            <video
              ref={videoRef}
              src={videoSrc}
              className="video-player"
              controls
              tabIndex={0}
              onClick={() => videoRef.current && videoRef.current.focus()}
            />

            {/* Optional: Keep these for users who prefer clicking */}
            <div className="controls">
              <button onClick={handleBackward}>⏪ Back 5s</button>
              <button onClick={handleForward}>⏩ Forward 5s</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
