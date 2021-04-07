import React, { useState, useEffect } from 'react';
import './App.css';
import Frames from './Frames';
import configData from './config.json';


function App() {
  useEffect(() => {
    Frames(configData.devIP, configData.fr).start();
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
