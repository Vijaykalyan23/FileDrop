import { useEffect, useRef, useState } from "react";
import { UploadFile } from "./service/api";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const uploadRef = useRef();

  const handleUpload = () => uploadRef.current.click();

  const handleCopy = () => {
    if (res) {
      navigator.clipboard.writeText(res);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpen = () => {
    if (res) {
      window.open(res, "_blank");
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    const apiCall = async () => {
      if (file) {
        const fileData = new FormData();
        fileData.append("name", file.name);
        fileData.append("file", file);

        const response = await UploadFile(fileData);
        setRes(response?.path);
      }
    };
    apiCall();
  }, [file]);

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div className="toggle-theme">
        <button onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1>File Sharing App</h1>

      <div className="upload-section">
        <button onClick={handleUpload}>📤 Upload File</button>
        <input
          type="file"
          ref={uploadRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {res && (
        <div className="result">
          <a href={res} target="_blank" rel="noopener noreferrer">{res}</a>
          <div className="btn-group">
            <button onClick={handleCopy}>
              {copied ? <span>✔ Copied</span> : "📋 Copy Link"}
            </button>
            <button onClick={handleOpen}>🔗 Open / Download</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
