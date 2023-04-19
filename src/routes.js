import Home from  './views/Home.jsx'
import User from "./views/User.jsx";
let routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/new-user',
        element: <User />
    }

]

export default routes;