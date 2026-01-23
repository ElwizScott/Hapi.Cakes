import Home from "../features/public/pages/Home";
import Gallery from "../features/public/pages/Gallery";
import Contact from "../features/public/pages/Contact";
import Order from "../features/public/pages/Order";
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminDashboard from "../features/admin/pages/Dashboard";
import AdminRouteGuard from "../features/admin/components/AdminRouteGuard";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/gallery", element: <Gallery variant="elegant" /> },
  { path: "/gallery-social", element: <Gallery variant="social" /> },
  { path: "/order", element: <Order /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRouteGuard>
        <AdminDashboard />
      </AdminRouteGuard>
    ),
  },
];

export default routes;
