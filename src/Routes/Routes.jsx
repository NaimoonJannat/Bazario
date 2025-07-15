// src/Routes/Routes.jsx
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";
import Home from "../Pages/HomePage/Home";
import Products from "../Pages/ProductsPage/Products";
import Dashboard from "../Roles/Seller/Dashboard";


import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Roles/Seller/Dashboard/DashboardLayout/DashboardLayout";
import AddProduct from "../Roles/Seller/Dashboard/DashboardPages/AddProduct";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true, // /dashboard
        element: <Dashboard />,
      },
      {
        path: "/add-product", // /dashboard/profile
        element: <AddProduct />,
      },
      // Add more dashboard routes like:
      // { path: "products", element: <SellerProducts /> },
    ],
  },
]);

export default Routes;
