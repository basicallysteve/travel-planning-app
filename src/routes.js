import Home from  './views/Home.jsx'
import User from "./views/User.jsx";
import Users from "./views/Users.jsx"
let routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/new-user',
        element: <User />
    },
    {
        path: "/users/:id",
        element: <User />
    },
    {
        path: "/users",
        element: <Users />
    }

]

export default routes;