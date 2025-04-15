import React, { useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  selectLocalPeer
} from "@100mslive/react-sdk";

const AssessmentPage = ({ token, userName }) => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const localPeer = useHMSStore(selectLocalPeer);
  const hasJoinedRef = useRef(false); // ✅ Prevent loop

  useEffect(() => {
    if (!isConnected && token && userName && !hasJoinedRef.current) {
      hmsActions.join({ userName, authToken: token });
      hasJoinedRef.current = true;
    }
  }, [isConnected, token, userName, hmsActions]);

  useEffect(() => {
    if (isConnected && localPeer?.roleName === "student") {
      hmsActions.setScreenShareEnabled(true);
      hmsActions.setLocalVideoEnabled(true);  
      hmsActions.setLocalAudioEnabled(true);  
    }
  }, [isConnected, localPeer, hmsActions]);
  

  return (
    <div className="assessment-container">
      <h2>📝 Assessment Page</h2>
      <p>Answer all questions carefully. You are being monitored.</p>

      <div className="question">
        <p>1. What is the capital of France?</p>
        <input type="text" />
      </div>

      <button>Submit</button>
    </div>
  );
};

export default AssessmentPage;
