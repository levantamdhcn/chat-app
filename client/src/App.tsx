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
import { getConversations } from "./store/reducers/conversation";
import useAuth from "./hooks/useAuth";

const App = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { user } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if(token){
      //initial user info
      dispatch(initialise({ token }));
      
      //initial conversations
      if(user && user.id) {
        dispatch(getConversations({ userId: user.id }));
      }
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>{renderRoutes(routers)}</Router>
  );
};

export default App;
