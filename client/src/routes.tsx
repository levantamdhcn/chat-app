import { Switch, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/index'
import TabContent from './views/sidebar'

interface route {
    component: any
    path: string
    exact?: boolean
    layout?: any
    routes?: any
}

type routes = Array<route>

export const renderRoutes = (routes: routes) => {
    return (
        <Switch>
            {
                routes?.map((route: route,i) => {
                    const Component = route.component
                    const path = route.path
                    const exact = route.exact
                    const Layout = route.layout

                    return (
                        <Route
                            exact={exact}
                            key={i}
                            path={path}
                            render={(props: any) => (
                                <Layout>
                                    {
                                        route.routes ? renderRoutes(route.routes) : <Component {...props}/>
                                    }
                                </Layout>
                            )}
                        />
                    )
                })
            }
        </Switch>
    )
}

const routers = [
    {
        exact: true,
        path: "/",
        layout: MainLayout,
        component: TabContent,
    }
] 

export default routers