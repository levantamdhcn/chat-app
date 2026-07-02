import { Route, Routes } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout/index";
import Login from "./views/auth/Login";
import Signup from "./views/auth/SignUp";
import TabContent from "./views/sidebar";

interface route {
  component: React.FC;
  path: string;
  exact?: boolean;
  layout?: any;
  routes?: any;
  allowRoles?: string[];
}

type routes = Array<route>;

export const renderRoutes = (routes: routes) => {
  return (
    <Routes>
      {routes?.map((route: route, i) => {
        const Component = route.component;
        const path = route.path;
        const Layout = route.layout;
        const allowRoles = route.allowRoles;
        return allowRoles ? (
          <Route element={<AuthGuard allowedRoles={allowRoles} />}>
            <Route key={i} path={path} element={<Layout />}>
              {route.routes ? (
                renderRoutes(route.routes)
              ) : (
                <Route path={path} element={<Component />} />
              )}
            </Route>
          </Route>
        ) : (
          <Route key={i} element={<Layout />}>
            {route.routes ? (
                renderRoutes(route.routes)
              ) : (
                <Route path={path} element={<Component />} />
              )}
          </Route>
        );
      })}
    </Routes>
  );
};

const routers = [
  {
    exact: true,
    path: "/",
    layout: MainLayout,
    component: TabContent,  
    needAuth: true,
    allowRoles: ["user", "admin"],
  },
  {
    exact: true,
    path: "/login",
    layout: AuthLayout,
    component: Login,
    needAuth: false,
  },
  {
    exact: true,
    path: "/register",
    layout: AuthLayout,
    component: Signup,
    needAuth: false,
  },
];

export default routers;
