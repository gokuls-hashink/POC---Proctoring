import React, { useState } from "react";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import AssessmentPage from "./AssessmentPage.jsx";
import ProctorView from "./ProctorView.jsx";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [start, setStart] = useState(false);
  const [role, setRole] = useState("");

  const handleStart = () => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setRole(decodedToken.role);
      setStart(true);
    } catch (err) {
      alert("Invalid token");
    }
  };

  if (!start) {
    return (
      <div className="join-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <textarea
          rows={4}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your 100ms token here"
        />
        <button onClick={handleStart}>Start Exam</button>
      </div>
    );
  }

  return (
    <HMSRoomProvider>
      {role === "student" ? (
        <AssessmentPage token={token} userName={name} />
      ) : (
        <ProctorView token={token} userName={name} />
      )}
    </HMSRoomProvider>
  );
}

export default App;
