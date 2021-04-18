import React, { useState, useEffect } from "react";
import "./App.css";
import Frames from "./Frames";
import configData from "./config.json";

function App() {
  const [src, setSrc] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    Frames(configData.devIP, setData, setSrc).start();
  }, []);

  return (
    <div className="App">
      <div>Live Feed</div>
      <img src={src} alt="live_feed" />
      {data && data.people
        ? Object.keys(data.people).map((person, index) => {
            // console.log(data.people[person]);
            const keypoints = data.people[person].keypoints;
            if (keypoints.RElbow && keypoints.LElbow)
              return (
                <div key={index}>
                  <div>Person {person}</div>
                  <div>X-Coordinate: {keypoints.RElbow[0].toFixed(2)}</div>
                  <div>Y-Coordinate: {keypoints.RElbow[1].toFixed(2)}</div>
                  <div>Z-Coordinate: {keypoints.RElbow[2].toFixed(2)}</div>
                  <div>
                    {keypoints.RElbow[1] < 0 && keypoints.LElbow[1] < 0
                      ? "Both Arms Raised!"
                      : keypoints.RElbow[1] < 0
                      ? "Right Arm Raised!"
                      : keypoints.LElbow[1] < 0
                      ? "Left Arm Raised!"
                      : "Nothing"}
                  </div>
                </div>
              );
            return null;
          })
        : null}
    </div>
  );
}

export default App;
