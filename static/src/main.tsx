import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppIndex from "./AppIndex.js"
import Route from "./routes/Route.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AppIndex /> },
      { path: "route", element: <Route /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
