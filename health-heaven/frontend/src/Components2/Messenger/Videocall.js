import React, { useState, useEffect } from "react";
import { X, Mic, MicOff, Video, VideoOff } from "lucide-react";

const VideoCall = ({ onEnd, isOutgoing, recipient, avatar }) => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callStatus, setCallStatus] = useState(isOutgoing ? "calling" : "incoming");
  const [callDuration, setCallDuration] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (callStatus === "connected") {
      const intervalId = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      setTimer(intervalId);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callStatus]);

  useEffect(() => {
    // Simulate call connection after 2 seconds
    if (isOutgoing && callStatus === "calling") {
      const timeout = setTimeout(() => {
        setCallStatus("connected");
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [isOutgoing, callStatus]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = () => {
    setCallStatus("connected");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={avatar || "/default-avatar.png"}
            alt={recipient}
            className="w-10 h-10 rounded-full mr-3"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
          />
          <div>
            <h3 className="text-white font-medium">{recipient || "User"}</h3>
            <p className="text-gray-400 text-sm">
              {callStatus === "connected"
                ? formatDuration(callDuration)
                : callStatus === "calling"
                ? "Calling..."
                : "Incoming call"}
            </p>
          </div>
        </div>
        <button
          onClick={onEnd}
          className="p-2 bg-red-500 rounded-full text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {videoEnabled ? (
          <div className="relative w-full max-w-2xl aspect-video bg-gray-800 rounded-lg overflow-hidden mx-auto">
            {/* Simulated video feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={avatar || "/default-avatar.png"}
                alt="Remote"
                className="w-full h-full object-cover opacity-50"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
              />
            </div>
            
            {/* Self view */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded overflow-hidden border-2 border-gray-600">
              {/* This would be your own camera feed */}
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <span className="text-gray-400 text-xs">You</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
            <img
              src={avatar || "/default-avatar.png"}
              alt={recipient}
              className="w-24 h-24 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
          </div>
        )}
      </div>

      <div className="p-8 flex justify-center space-x-4">
        <button
          onClick={() => setMicEnabled(!micEnabled)}
          className={`p-4 rounded-full ${
            micEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
          }`}
        >
          {micEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </button>
        
        <button
          onClick={onEnd}
          className="p-4 bg-red-500 rounded-full text-white"
        >
          <X className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => setVideoEnabled(!videoEnabled)}
          className={`p-4 rounded-full ${
            videoEnabled ? "bg-gray-700 text-white" : "bg-red-500 text-white"
          }`}
        >
          {videoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </button>
      </div>

      {callStatus === "incoming" && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="text-center">
            <img
              src={avatar || "/default-avatar.png"}
              alt={recipient}
              className="w-24 h-24 rounded-full mx-auto mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            <h3 className="text-white text-xl font-medium mb-1">{recipient || "User"}</h3>
            <p className="text-gray-300 mb-8">Incoming video call...</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onEnd}
                className="p-4 bg-red-500 rounded-full text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                onClick={handleAnswer}
                className="p-4 bg-green-500 rounded-full text-white"
              >
                <Video className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;