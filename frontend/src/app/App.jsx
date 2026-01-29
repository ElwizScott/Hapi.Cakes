import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { AdminAuthProvider } from "../features/admin/context/AdminAuthContext";

function App() {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-hapi-light font-sans text-slate-700">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>

        <Footer />
      </div>
    </AdminAuthProvider>
  );
}

export default App;
