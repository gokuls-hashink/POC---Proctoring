import React, { useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectScreenShareByPeerID,
  selectIsConnectedToRoom
} from "@100mslive/react-sdk";
import { selectVideoTrackByPeerID } from "@100mslive/react-sdk";

const PeerVideo = ({ peer }) => {
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));
  const screenTrack = useHMSStore(selectScreenShareByPeerID(peer.id));

  console.log(peer.name, "video track:", videoTrack);
  console.log(peer.name, "screen sharing:", screenTrack?.enabled);

  return (
    <div className="peer-tile">
      <p>{peer.name}</p>

      {videoTrack?.enabled && (
        <video
          autoPlay
          muted
          playsInline
          ref={(el) => {
            if (el) hmsActions.attachVideo(videoTrack.id, el);
          }}
        />
      )}

      {screenTrack?.enabled && (
        <video
          autoPlay
          muted
          playsInline
          ref={(el) => {
            if (el) hmsActions.attachVideo(screenTrack.id, el);
          }}
        />
      )}
    </div>
  );
};



  

const ProctorView = ({ token, userName }) => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    if (!isConnected && token && userName && !hasJoinedRef.current) {
      hmsActions.join({ userName, authToken: token });
      hasJoinedRef.current = true;
    }
  }, [isConnected, token, userName, hmsActions]);

  return (
    <div className="grid">
      {peers
        .filter((peer) => !peer.isLocal)
        .map((peer) => (
          <PeerVideo key={peer.id} peer={peer} />
        ))}
    </div>
  );
};

export default ProctorView;
