import React from 'react';
import './App.scss';
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Start from "./input/Start";
import Result from "./result/Result";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="" element={<Start/>}/>
            <Route path="result" element={<Result/>}/>
        </Routes>
      </Router>
  );
}

export default App;
