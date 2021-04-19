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
      <div>Live Feed</div>
      <img className="live" src={live} alt="live feed" />
      <img className="exercise" src={exercise} alt="exercise feed" />
    </div>
  );
}

export default App;
