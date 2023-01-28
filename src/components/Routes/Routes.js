import { createBrowserRouter } from "react-router-dom";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Home from "../Home/Home";
import Main from "../Layout/Main";

export const routes = createBrowserRouter([{

    path:'/',
    element: <Main></Main>,
    children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/home',
            element: <Home></Home>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
    ]
}])