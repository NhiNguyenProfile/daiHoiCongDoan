import {Navigate, useRoutes} from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import VoteController from "./pages/VoteController";
import CheckIn from "./pages/CheckIn";
import Map from "./pages/Map";
import Mail from "./pages/Mail";
import GiveIdea from "./pages/GiveIdea";
import Vote from "./pages/Vote";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "mail", element: <Mail /> },
        { path: "giveIdea", element: <GiveIdea /> },
        { path: "voteControl", element: <VoteController /> },
        { path: "checkIn", element: <CheckIn /> },
        { path: "map", element: <Map />},
        { path: "vote", element: <Vote />},
      ],
    },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
