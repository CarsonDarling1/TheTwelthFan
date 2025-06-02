import { AuthProvider } from "./context/AuthContext"; // Import your AuthProvider
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
