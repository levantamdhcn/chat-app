import { Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import routers, { renderRoutes } from "./routes";

import "./index.css";
import "./styles/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const history: History = createBrowserHistory();

const App = () => {
  return <Router history={history}>{renderRoutes(routers)}</Router>;
};

export default App;
