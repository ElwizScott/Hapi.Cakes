import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./routes";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { AdminAuthProvider } from "../features/admin/context/AdminAuthContext";
import { SiteCopyProvider } from "../features/public/context/SiteCopyContext";

function App() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith("/cakes/");

  return (
    <AdminAuthProvider>
      <SiteCopyProvider>
        <div className="min-h-screen bg-hapi-light font-sans text-slate-700">
          {hideChrome ? null : <Navbar />}

          <main
            className={`mx-auto px-4 py-6 ${
              hideChrome
                ? "h-screen max-w-6xl overflow-hidden"
                : "max-w-7xl"
            }`}
          >
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

          {hideChrome ? null : <Footer />}
        </div>
      </SiteCopyProvider>
    </AdminAuthProvider>
  );
}

export default App;
