import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HMSRoomProvider } from "@100mslive/react-sdk"; // ✅ Make sure this is imported
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HMSRoomProvider>      
      <App />
    </HMSRoomProvider>
  </React.StrictMode>
);
