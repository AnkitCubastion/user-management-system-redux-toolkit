import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./components/landing";
import HomeLayout from "./components/homeLayout";
import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Database from "./components/database";
import ErrorElement from "./components/errorElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/database",
        element: <Database />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorElement />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
