import { createBrowserRouter } from "react-router-dom";
import BillingTable from "../BillingDashboard/BillingTable/BillingTable";
import UpdateBilling from "../BillingDashboard/UpdateBilling/UpdateBilling";
import ErrorPage from "../ErrorPage/ErrorPage";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Home from "../Home/Home";
import Main from "../Layout/Main";

export const routes = createBrowserRouter([{

    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/home',
            element: <Home></Home>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/billingTable',
            element: <BillingTable></BillingTable>
        },
        {
            path: '/update-billing/:id',
            loader: ({ params }) => fetch(`http://localhost:5000/update-billing/${params.id}`),
            element: <UpdateBilling></UpdateBilling>
        },
    ]
}])