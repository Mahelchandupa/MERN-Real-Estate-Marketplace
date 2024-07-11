import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Root from "./root";
import PrivateRoute from "../components/PrivateRoute";
import CreateListing from "../pages/CreateListing";
import UpdateListing from "../pages/UpdateListing";
import Listing from "../pages/Listing";

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
      },
      {
        path: '/create-listing',
        element: (
          <PrivateRoute>
            <CreateListing />
          </PrivateRoute>
        )
      },
      {
        path: '/update-listing/:listingId',
        element: (
          <PrivateRoute>
            <UpdateListing />
          </PrivateRoute>
        )
      },
      {
        path: '/listing/:listingId',
        element: <Listing />
      }
    ]
  }
]);

export default router;