import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import LeftSidebar  from "./components/LeftSidebar.component";
import RightMainbar  from "./components/RightMainbar.component.js";

function App() {
  return (
    <div >
      <LeftSidebar/>
      <RightMainbar/>
    </div>
  );
}

export default App;
