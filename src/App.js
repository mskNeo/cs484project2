import React, { useState, useEffect } from "react";
import "./App.css";
import Frames from "./Frames";
import Exercises from './Exercises';
import configData from "./config.json";

function App() {
  const [live, setLive] = useState();
  const [exercise, setExercise] = useState();
  const [liveData, setLiveData] = useState();
  const [exeData, setExeData] = useState();

  useEffect(() => {
    Frames(configData.prodIP, setLiveData, setLive).start();
    Exercises(setExeData, setExercise).start();
  }, []);

  return (
    <div className="App">
      <img className="live" src={live} alt="live feed" />
      {/* {liveData && liveData.people
        ? Object.keys(liveData.people).map((person) => {
            // console.log(liveData.people[person]);
            const keypoints = liveData.people[person].keypoints;
            if (keypoints.RElbow && keypoints.LElbow)
              return (
                <div>
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
          })
        : null} */}
      <img className="exercise" src={exercise} alt="exercise feed" />
    </div>
  );
}

export default App;
