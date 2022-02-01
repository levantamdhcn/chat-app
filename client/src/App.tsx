import { Router } from 'react-router-dom';
import { createBrowserHistory, History  } from 'history'
import { RouterProps } from 'react-router';
import routers, { renderRoutes } from './routes';

import './styles/index.scss'

const history: History = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      {renderRoutes(routers)}
    </Router>
  );
}

export default App;
