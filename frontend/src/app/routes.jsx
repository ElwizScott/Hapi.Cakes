import Home from "../features/public/pages/Home";
import Gallery from "../features/public/pages/Gallery";
import ElegantGallery from "../features/public/pages/ElegantGallery";
import Contact from "../features/public/pages/Contact";
import Order from "../features/public/pages/Order";
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminDashboard from "../features/admin/pages/Dashboard";
import AdminLayout from "../features/admin/components/AdminLayout";
import AdminCategories from "../features/admin/pages/Categories";
import AdminCakes from "../features/admin/pages/CakeList";
import CakeDetail from "../features/public/pages/CakeDetail";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/gallery", element: <ElegantGallery /> },
  { path: "/gallery-social", element: <Gallery variant="social" /> },
  { path: "/cakes/:cakeId", element: <CakeDetail /> },
  { path: "/order", element: <Order /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin/dashboard",
    element: (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <AdminLayout>
        <AdminCategories />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/cakes",
    element: (
      <AdminLayout>
        <AdminCakes />
      </AdminLayout>
    ),
  },
];

export default routes;
