import Home from "../features/public/pages/Home";
import Gallery from "../features/public/pages/Gallery";
import ElegantGallery from "../features/public/pages/ElegantGallery";
import Contact from "../features/public/pages/Contact";
import Order from "../features/public/pages/Order";
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminDashboard from "../features/admin/pages/Dashboard";
import AdminRouteGuard from "../features/admin/components/AdminRouteGuard";
import AdminCategories from "../features/admin/pages/Categories";
import AdminCakes from "../features/admin/pages/CakeList";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/gallery", element: <ElegantGallery /> },
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
  {
    path: "/admin/categories",
    element: (
      <AdminRouteGuard>
        <AdminCategories />
      </AdminRouteGuard>
    ),
  },
  {
    path: "/admin/cakes",
    element: (
      <AdminRouteGuard>
        <AdminCakes />
      </AdminRouteGuard>
    ),
  },
];

export default routes;
