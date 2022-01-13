import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import User from './pages/User';
import UserDetail from './pages/UserDetail';
import Admin from './pages/Admin';
import AdminDetail from './pages/AdminDetail';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/classes" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        { path: 'users/:id', element: <UserDetail /> },
        { path: 'classes', element: <Products /> },
        { path: 'classes/:id', element: <ProductDetail /> },
        { path: 'admins', element: <Admin /> },
        { path: 'admins/:id', element: <AdminDetail /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
