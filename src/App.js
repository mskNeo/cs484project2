import React, { useState, useEffect } from "react";
import "./App.css";
import Frames from "./Frames";
import Exercises from './Exercises';
import configData from "./config.json";

function App() {
  const [live, setLive] = useState();
  const [exercise, setExercise] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    Frames(configData.prodIP, setData, setLive).start();
    Exercises(setData, setExercise).start();
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
