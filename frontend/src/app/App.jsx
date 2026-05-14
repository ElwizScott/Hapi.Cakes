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
        <div className="min-h-screen bg-hapi-light font-sans text-text-primary">
          {hideChrome ? null : <Navbar />}

          <main
            className={`mx-auto px-4 py-6 ${
              hideChrome ? "min-h-screen max-w-6xl" : "max-w-7xl"
            }`}
          >
            <div key={location.pathname} className="animate-fade-in-up">
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </div>
          </main>

          {hideChrome ? null : <Footer />}
        </div>
      </SiteCopyProvider>
    </AdminAuthProvider>
  );
}

export default App;
