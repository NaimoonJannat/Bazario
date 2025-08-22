// src/Routes/Routes.jsx
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";
import Home from "../Pages/HomePage/Home";
import Products from "../Pages/ProductsPage/Products";
import Dashboard from "../Roles/Seller/Dashboard/Dashboard";


import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Roles/Seller/Dashboard/DashboardLayout/DashboardLayout";
import AddProduct from "../Roles/Seller/Dashboard/DashboardPages/AddProduct";
import Coupons from "../Roles/Seller/Dashboard/DashboardPages/Coupons";
import UserList from "../Roles/Seller/Dashboard/DashboardPages/UserList";
import DueOrders from "../Roles/Seller/Dashboard/DashboardPages/DueOrders";
import OutofStock from "../Roles/Seller/Dashboard/DashboardPages/OutofStock";
import ExpiredProducts from "../Roles/Seller/Dashboard/DashboardPages/ExpiredProducts";
import DiscountPage from "../Roles/Seller/Dashboard/DashboardPages/DiscountPage";
import Feedbacks from "../Roles/Seller/Dashboard/DashboardPages/Feedbacks";
import PreOrder from "../Roles/Seller/Dashboard/DashboardPages/PreOrder";
import OnSHopSale from "../Roles/Seller/Dashboard/DashboardPages/OnSHopSale";
import ProductDetails from "../Pages/ProductsPage/ProductDetails";

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
         loader: () => fetch("http://localhost:5000/products")
      },
      {
        path: "/products/product/:id",
        element: <ProductDetails />,
         loader: () => fetch("http://localhost:5000/products")
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "add-product", // /dashboard/add-product
        element: <AddProduct />,
      },
       {
        path: "coupons", // /dashboard/coupons
        element: <Coupons></Coupons>,
      },
       {
        path: "user-list", // /dashboard/User list
        element: <UserList></UserList>,
      },
       {
        path: "due-orders", // /dashboard/due-orders
        element: <DueOrders></DueOrders>,
      },
       {
        path: "out-of-stock", // /dashboard/OutOfStock
        element: <OutofStock></OutofStock>,
      },
       {
        path: "expired-products", // /dashboard/Expired products
        element: <ExpiredProducts></ExpiredProducts>,
      },
       {
        path: "discounts", // /dashboard/Discount
        element: <DiscountPage></DiscountPage>,
      },
       {
        path: "feedback", // /dashboard/Feedback
        element: <Feedbacks></Feedbacks>,
      },
       {
        path: "pre-orders", // /dashboard/pre-orders
        element: <PreOrder></PreOrder>,
      },
       {
        path: "on-shop-sale", // /dashboard/on-shop-sale
        element: <OnSHopSale></OnSHopSale>,
      },
    ],
  },
]);

export default Routes;
