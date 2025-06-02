import { createRootRoute, createRoute, createRouter, redirect} from "@tanstack/react-router";
import RootLayout from "./RootLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";
import AllLeaguesPage from "./pages/AllLeaguesPage.tsx";
import LeaguePage from "./pages/LeaguePage.tsx";
import AllTeamsPage from "./pages/AllTeamsPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";

const rootRoute = createRootRoute({
  component: RootLayout, // Use the separate layout component
});

// Define individual routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Check token
    if (!token) {
      return redirect({ to: "/login" });
    }
  },
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Check token
    if (!token) {
      return redirect({ to: "/login" });
    }
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logout",
  component: LogoutPage,
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Get the token
    if (!token) {
      return redirect({ to: "/login" });
    }
    else{
      localStorage.removeItem("authToken");
  }
  },
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  validateSearch: (search: Record<string, unknown>) => ({
    fromLogin: search.fromLogin === true,
  }),
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Check token
    if (!token) {
      return redirect({ to: "/login" });
    }
  },
});

const allLeaguesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/all-leagues",
  component: AllLeaguesPage,
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Check token
    if (!token) {
      return redirect({ to: "/login" });
    }
  },
});

export const leagueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/league/$id/$name",
  component: LeaguePage,
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Check token
    if (!token) {
      return redirect({ to: "/login" });
    }
  },
});

const allTeamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/all-teams",
  component: AllTeamsPage,
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Check token
    if (!token) {
      return redirect({ to: "/login" });
    }
  },
});

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/team",
  component: TeamPage,
  beforeLoad: async () => {
    const token = localStorage.getItem("authToken"); // Check token
    if (!token) {
      return redirect({ to: "/login" });
    }
  },
});

// Create the route tree
const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, loginRoute, dashboardRoute, logoutRoute, allLeaguesRoute, leagueRoute, allTeamsRoute, teamRoute]);

// Create the router instance
export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
