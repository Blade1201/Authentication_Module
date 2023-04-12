import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./styles/main.scss";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
      <BrowserRouter>

        <Routes>

          <Route path = "/" element = { <Login/> }/>

          <Route path = "/register" element = { <Register/> }/>

        </Routes>

      </BrowserRouter>
  );
}

export default App;
