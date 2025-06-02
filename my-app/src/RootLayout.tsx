// src/layouts/RootLayout.tsx
import { Link, Outlet } from "@tanstack/react-router";

const RootLayout = () => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if token exists

  return (
    <div>
      <nav className="flex gap-4 p-4 bg-gray-800 text-white">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        {!isAuthenticated && (
          <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
        )}
        <Link to="/dashboard"   search={{ fromLogin: false }} className="hover:text-blue-400 transition">Dashboard</Link>
        <Link to="/all-teams" className="hover:text-blue-400 transition">Your Teams</Link>
        <Link to="/all-leagues" className="hover:text-blue-400 transition">Your Leagues</Link>
        <Link to="/logout" className="hover:text-red-400 transition ml-auto">Logout</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default RootLayout;
