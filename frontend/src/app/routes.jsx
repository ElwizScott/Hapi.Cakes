import Home from "../features/public/pages/Home";
import Gallery from "../features/public/pages/Gallery";
import Contact from "../features/public/pages/Contact";
import Order from "../features/public/pages/Order";
import AdminLogin from "../features/admin/pages/AdminLogin";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/gallery", element: <Gallery variant="elegant" /> },
  { path: "/gallery-social", element: <Gallery variant="social" /> },
  { path: "/order", element: <Order /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin/login", element: <AdminLogin /> },
];

export default routes;
