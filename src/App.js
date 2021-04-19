import React, { useState, useEffect } from "react";
import "./App.css";
import Frames from "./Frames";
import Exercises from './Exercises';
import configData from "./config.json";

function App() {
  const [live, setLive] = useState();
  const [exercise, setExercise] = useState();
  const [present, setPresent] = useState(false);
  const [liveData, setLiveData] = useState();
  const [exeData, setExeData] = useState();

  useEffect(() => {
    Frames(configData.prodIP, setLiveData, setLive).start();
    Exercises(setExeData, setExercise).start();
  }, []);

  useEffect(() => {
    if (liveData && liveData.people) {
      Object.keys(liveData.people).forEach((person) => {
        const keypoints = liveData.people[person].keypoints;
        if (keypoints.RElbow && keypoints.LElbow) {
          // setPresent(true);
        }
        // need to set present to false when people are not in view
      });
    }
  }, [liveData]);

  return (
    <div className="view">
      <img className="live" src={live} alt="live feed" />
      {
      present
        ? 
          <img className="exercise" src={exercise} alt="exercise feed" />
        : <h1>No one present</h1>
      }   
    </div>
  );
}

export default App;
