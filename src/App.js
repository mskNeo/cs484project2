import React, { useState, useEffect } from "react";
import "./App.css";
import Frames from "./Frames";
import configData from "./config.json";
import moment from "moment";
import easy from './assets/right.png'
import med from './assets/left.png'
import hard from './assets/both.png'

const exercises = ["arm_circles", "knee_drives", "jumping_jacks"];
let twods = [];
let exercise_frames = [];
exercises.forEach((exercise) => {
  const twod = require(`./recordings_json/twod/${exercise}.json`);
  twods.push(twod);
  const exercise_frame = require(`./recordings_json/frames/${exercise}.json`);
  exercise_frames.push(exercise_frame);
});

function App() {
  const [live, setLive] = useState();
  const [message, setMessage] = useState("Pick an exercise by copying the images below.");
  const [exercise, setExercise] = useState(0);
  const [start, setStart] = useState(false);
  const [select, setSelect] = useState(false);
  const [ready, setReady] = useState(false);
  const [liveData, setLiveData] = useState();
  const [start_time, setStartTime] = useState();
  const [frame_index, setFrameIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    Frames(configData.prodIP, setLiveData, setLive).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex(frame_index + 1);
    }, 250);
    return () => clearInterval(interval);
  }, [frame_index]);

  useEffect(() => {
    const model_keys = Object.keys(
      exercise_frames[exercise][frame_index % twods[exercise].length].people
        ? exercise_frames[exercise][frame_index % twods[exercise].length].people
        : {}
    );
    const model =
      model_keys.length > 0
        ? exercise_frames[exercise][
            frame_index % exercise_frames[exercise].length
          ].people[model_keys[0]].keypoints
        : null;

    if (liveData && liveData.people) {
      let count = 0;
      for (let i = 0; i < Object.keys(liveData.people).length; i++) {
        if (liveData.people[i] && liveData.people[i].avg_position[2] <= 3350) {
          count++;
        }
      }
      // console.log(count);
      if (count === 0) {
        setSelect(false);
        setMessage("Come workout with us!");
      }
      if (!start && !ready && !select && count > 1) {
        setSelect(false);
        setMessage("Only one person, please. I'm scared of large crowds.");
      } else {
        Object.keys(liveData.people).forEach((person) => {
          const pos = liveData.people[person].avg_position;
          const keypoints = liveData.people[person].keypoints;
          if (
            keypoints.RElbow &&
            keypoints.RShoulder &&
            keypoints.LElbow &&
            keypoints.LShoulder &&
            !start
          ) {
            // if wrists are above people's eyes/heads, they're up
            if (!select && !ready) {
              if (pos[2] > 3350) {
                return;
              } else if (
                (keypoints.RElbow[1] > keypoints.RShoulder[1] ||
                  keypoints.LElbow[1] > keypoints.LShoulder[1]) &&
                !select
              ) {
                setMessage("Raise your hands high like you're trying to touch the sky.");
              } else {
                setMessage("Ok, put your hands down.");
                setSelect(true);
              }
            } else if (select && !ready) {
              if (
                keypoints.RElbow[1] > keypoints.RShoulder[1] &&
                keypoints.LElbow[1] > keypoints.LShoulder[1]
              ) {
                setReady(true);
              }
            } else if (select && ready) {
              if (
                keypoints.RElbow[1] > keypoints.RShoulder[1] &&
                keypoints.LElbow[1] > keypoints.LShoulder[1]
              ) {
                setMessage("Pick an exercise by copying the images below.");
              } // both hands, hard exercise
              else if (
                ready &&
                keypoints.RElbow[1] < keypoints.RShoulder[1] &&
                keypoints.LElbow[1] < keypoints.LShoulder[1]
              ) {
                setMessage("Get ready! Start, now!");
                setTimeout(() => {
                  setStart(true);
                  setExercise(2);
                  setMessage("");
                  setStartTime(Date.now());
                }, 300);
              }
              // right hand, easy exercise
              else if (ready && keypoints.RElbow[1] < keypoints.RShoulder[1]) {
                setMessage("Get ready! Start, now!");
                setTimeout(() => {
                  setStart(true);
                  setExercise(0);
                  setMessage("");
                  setStartTime(Date.now());
                }, 300);
              }
              // left hand, medium one
              else if (ready && keypoints.LElbow[1] < keypoints.LShoulder[1]) {
                setMessage("Get ready! Start, now!");
                setTimeout(() => {
                  setStart(true);
                  setExercise(1);
                  setMessage("");
                  setStartTime(Date.now());
                }, 300);
              }
            }
          }
          if (start && model && pos[2] < 3350) {
            const arr = ["RElbow", "RKnee", "LKnee", "LElbow"];
            let temp = score;
            arr.forEach((point) => {
              temp +=
                keypoints[point] &&
                keypoints[point][1] &&
                model[point] &&
                model[point][1]
                  ? Math.abs(keypoints[point][1] - model[point][1])
                  : 0;
            });
            setScore(temp);
          }
        });
      }
    }
  }, [liveData, message, start, select, ready, exercise, frame_index]);

  const timer = moment().diff(start_time, "seconds");

  if (timer === 30) {
    setStart(false);

    setStartTime(null);

    setMessage("You're done! Go enjoy your day :)");
    setTimeout(() => {
      setMessage("Come workout with us!");
      setSelect(false);
      setReady(false);
    }, 10000);
  }

  return (
    <div className="view">
      {start ? (
        <>
          <img className="live" src={live} alt="live feed" />
          {start_time ? <div id="timer">{30 - timer}</div> : null}
          {start_time && timer >= 10 && timer <= 12 ? (
            <div id="encourage">Keep Moving</div>
          ) : null}
          {start_time && timer >= 20 && timer <= 22 ? (
            <div id="encourage">Looks Good!</div>
          ) : null}
          {start_time && timer >= 26 && timer <= 28 ? (
            <div id="encourage">Almost There :)</div>
          ) : null}
          <img
            className="exercise"
            src={`data:image/pnjpegg;base64,${
              twods[exercise][frame_index % twods[exercise].length].src
            }`}
            alt="exercise feed"
          />
        </>
      ) : (
        <div>
          <h1 id="message">{message}</h1>
          <br />
          {message === "Pick an exercise by copying the images below." && (
            <div id="exercises">
              <div className="choice">
                <img src={easy} alt="easy hands" />
                <p>Easy</p>
              </div>
              <div className="choice">
                <img src={med} alt="Medium hands" />
                <p>Medium</p>
              </div>
              <div className="choice">
                <img src={hard} alt="hard hands" />
                <p>Hard</p>
              </div>
            </div>
          )}
          {message === "You're done! Go enjoy your day :)" && (
            <h1 id="message">
              Your Score: {Math.round((1000000 - score) / 10000)} points
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
