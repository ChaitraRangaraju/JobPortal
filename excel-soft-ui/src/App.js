import React from "react";
import './App.css';
import JobListPage from './pages/JobListPage';
import JobViewPage from './pages/JobViewPage';
import Application from './pages/ApplicationPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Welcome from "./pages/WelcomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome/>,
  },
  {
    path: "/jobs",
    element: <JobListPage />,
  },
  {
    path: "/apply/:JOBID",
    element: <Application />,
  },
  {
    path: "/job/:JOBID",
    element: <JobViewPage />,
  },

]);


function App() {

  return (
    <div>
      <header class="header">
                    <a href="#" id="logo">EXCELSOFT</a>

                    <nav class="navbar">
                        <a href="http://localhost:3000/">Home</a>
                        <a href="https://www.excelsoftcorp.com/">About Us</a>
                        
                        <a href="#contact">Contact</a>
                    </nav>
      </header>

      <RouterProvider router={router} />
      
    </div>
    

  );
}

export default App;
