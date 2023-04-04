import routers, { renderRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import './styles/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initialise } from './store/reducers/auth';
import { ThunkDispatch } from '@reduxjs/toolkit';

const App = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      //initial user info
      dispatch(initialise({ accessToken, refreshToken }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Router>{renderRoutes(routers)}</Router>;
};

export default App;
