import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Players from "./players.jsx";
import Nothing from "./nothing.jsx"
import Player from "./Player.jsx"
import Squads from "./squads.jsx"
import Code from "./code.jsx"

function MainRouter() {


  return (
    <Router >
     
      <Routes>
        <Route path="/" element={<Nothing />} />
        <Route path="/players" element={<Players />} />
        <Route path="/squads" element={<Squads />} />
        <Route path="/players/:first/:last" element={<Player />} />
        <Route path="/code" element={<Code />} />
      </Routes>
    </Router>
  )
}

export default MainRouter
