import React, { useState, useEffect } from "react";
import "./App.css";
import Frames from "./Frames";
import configData from "./config.json";
import moment from "moment";

const exercises = ["arm_circles", "jumping_jacks", "knee_drives"];
let twods = [];
exercises.forEach((exercise) => {
  const twod = require(`./recordings_json/twod/${exercise}.json`);
  twods.push(twod);
});

function App() {
  const [live, setLive] = useState();
  const [message, setMessage] = useState("Come workout with us!");
  const [exercise, setExercise] = useState(0);
  const [start, setStart] = useState(false);
  const [liveData, setLiveData] = useState();
  const [exeData, setExeData] = useState();
  const [start_time, setStartTime] = useState();
  const [frame_index, setFrameIndex] = useState(0);

  useEffect(() => {
    Frames(configData.prodIP, setLiveData, setLive).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex(frame_index + 1);
    }, 300);
    return () => clearInterval(interval);
  }, [frame_index]);

  useEffect(() => {
    console.log(liveData);
    if (liveData && liveData.people) {
      // if (liveData.people.length > 1) {
      //   setStart("Only one person, please. I'm scared of large crowds.");
      // }
      Object.keys(liveData.people).forEach((person) => {
        const pos = liveData.people[person].avg_position;
        const keypoints = liveData.people[person].keypoints;
        if (keypoints.RElbow && keypoints.RShoulder && keypoints.LElbow && keypoints.LShoulder && !start) {
          // if wrists are above people's eyes/heads, they're up
          if (pos[2] > 3350) {
            setMessage("Come closer with your hands up, we won't bite ;)");
            
          } else if (keypoints.RElbow[1] >= keypoints.RShoulder[1] && keypoints.LElbow[1] >= keypoints.LShoulder[1]) {
            setMessage(
              "Raise your hands high like you're trying to touch the sky."
            );
          } else {
            // setMessage("Ok, put your hands down.");
            // setTimeout(() => {
            //   // if hands are down below waist
            //   if (keypoints.RWrist[1] < keypoints.RHip[1] && keypoints.LWrist[1] < keypoints.LHip[1]) {
            //     setMessage("Pick an exercise. Raise your right hand for an easy one, left hand for a medium one, and both hands for a harder one.");
            //     // easy exercise
            //     if ()
            //     // medium exercise

            //     // hard exercise
            //   }
            // }, 1000);
            setStart(true);
            setMessage("");
            setStartTime(Date.now());
          }
        }
      });
    }
  }, [liveData, message, start]);

  const timer = moment().diff(start_time, "seconds");

  if (timer === 30) {
    setStart(false);
    setStartTime(null);

    setMessage("You're done! Go enjoy your day :)");

    setTimeout(() => {
      setMessage("Come workout with us!");
    }, 3000);
  }
  

  return (
    <div className="view">
      {start 
        ? 
          <>
            <img className="live" src={live} alt="live feed" />
            {start_time ? <div id="timer">{30 - timer}</div> : null}
            <img className="exercise" src={`data:image/pnjpegg;base64,${
                twods[exercise][frame_index % twods[exercise].length].src
              }`} alt="exercise feed" />
          </>
        : 
          <h1>{message}</h1>
      }
    </div>
  );
}

export default App;
