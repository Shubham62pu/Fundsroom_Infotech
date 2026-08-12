import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import CustomerList from '../pages/customers/CustomerList';
import CustomerForm from '../pages/customers/CustomerForm';
import CustomerDetail from '../pages/customers/CustomerDetail';
import ProductList from '../pages/products/ProductList';
import ProductForm from '../pages/products/ProductForm';
import StockMovements from '../pages/stockMovements/StockMovements';
import ChallanList from '../pages/challans/ChallanList';
import ChallanForm from '../pages/challans/ChallanForm';
import ChallanDetail from '../pages/challans/ChallanDetail';
import InvoiceList from '../pages/invoices/InvoiceList';
import InvoiceDetail from '../pages/invoices/InvoiceDetail';
import UserList from '../pages/users/UserList';
import { AppLayout } from '../components/layout/AppLayout';
const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      
      { path: 'customers', element: <CustomerList /> },
      { path: 'customers/new', element: <CustomerForm /> },
      { path: 'customers/:id/edit', element: <CustomerForm /> },
      { path: 'customers/:id', element: <CustomerDetail /> },

      { path: 'products', element: <ProductList /> },
      { path: 'products/new', element: <ProductForm /> },
      { path: 'products/:id/edit', element: <ProductForm /> },

      { path: 'stock-movements', element: <StockMovements /> },

      { path: 'challans', element: <ChallanList /> },
      { path: 'challans/new', element: <ChallanForm /> },
      { path: 'challans/:id/edit', element: <ChallanForm /> },
      { path: 'challans/:id', element: <ChallanDetail /> },

      { path: 'invoices', element: <InvoiceList /> },
      { path: 'invoices/:id', element: <InvoiceDetail /> },

      { path: 'users', element: <UserList /> },
      { path: '/', element: <Navigate to="/dashboard" replace /> },
    ],
  },
  
  { path: '*', element: <div className="p-4">404 Not Found</div> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
