import routers, { renderRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import "./styles/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialise } from "./store/reducers/auth";
import { ThunkDispatch } from "@reduxjs/toolkit";

const App = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(token){
      dispatch(initialise({ token }));
    };
  }, [dispatch]);
  return (
    <Router>{renderRoutes(routers)}</Router>
  );
};

export default App;
