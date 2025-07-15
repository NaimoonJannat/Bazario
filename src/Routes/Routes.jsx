import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";

import { createBrowserRouter } from "react-router";
import Home from "../Pages/HomePage/Home";
import Products from "../Pages/ProductsPage/Products";



const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:
            [
                {
                    path: '/',
                    element:<Home></Home>
                },
                {
                    path: '/registration',
                    element: <Registration></Registration>,
                },
                {
                    path: '/login',
                    element: <Login></Login>,
                },
                {
                    path: '/products',
                    element:<Products></Products>
                },
                {
                    path: '/dashboard',
                    element:
                },

            ]
    }
]);


export default Routes;