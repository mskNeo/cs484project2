import React, { useState, useEffect } from "react";
import "./App.css";
import Frames from "./Frames";
import Exercises from './Exercises';
import configData from "./config.json";

function App() {
  const [live, setLive] = useState();
  const [exercise, setExercise] = useState();
  const [start, setStart] = useState(false);
  const [liveData, setLiveData] = useState();
  const [exeData, setExeData] = useState();

  useEffect(() => {
    Frames(configData.prodIP, setLiveData, setLive).start();
    Exercises(setExeData, setExercise).start();
  }, []);

  useEffect(() => {
    console.log(liveData);
    if (liveData && liveData.people) {
      Object.keys(liveData.people).forEach((person) => {
        const pos = liveData.people[person].avg_position;
        const keypoints = liveData.people[person].keypoints;
        if (keypoints.RElbow && keypoints.LElbow) {
          if (keypoints.RElbow[1] < 0 && keypoints.LElbow[1] < 0 && pos[2] <= 3350) {
            setStart(true);
          }
        }
      });
    } else {
      setStart(false);
    }
  }, [liveData]);

  // useEffect(() => {
  //   console.log(exeData);
  // }, [exeData]);

  return (
    <div className="view">
      <img className="live" src={live} alt="live feed" />
      {
      start
        ? 
          <img className="exercise" src={exercise} alt="exercise feed" />
        : <h1>Raise your elbows to start</h1>
      }   
    </div>
  );
}

export default App;
