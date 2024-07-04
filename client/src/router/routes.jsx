import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Root from "./root";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      }
    ]
  }
]);

export default router;