import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { dashboardApi, type DashboardMetrics } from '../../api/dashboard';
import { 
  Users, 
  Package, 
  AlertTriangle, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await dashboardApi.getMetrics();
        setMetrics(response.data.data);
      } catch (error) {
        console.error('Failed to fetch metrics', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (!user) return null;

  const role = user.role;
  const showCustomers = ['ADMIN', 'SALES'].includes(role);
  const showProducts = ['ADMIN', 'WAREHOUSE'].includes(role);
  const showChallans = ['ADMIN', 'SALES', 'WAREHOUSE'].includes(role);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Welcome back, {user.name}. Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {showCustomers && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Customers
              </CardTitle>
              <div className="rounded-full bg-blue-100 p-2">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{metrics?.totalCustomers || 0}</div>
            </CardContent>
          </Card>
        )}

        {showProducts && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Products
              </CardTitle>
              <div className="rounded-full bg-indigo-100 p-2">
                <Package className="h-4 w-4 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{metrics?.totalProducts || 0}</div>
            </CardContent>
          </Card>
        )}

        {showProducts && (
          <Card 
            className="cursor-pointer transition-all hover:border-amber-400 hover:shadow-md"
            onClick={() => navigate('/products?filter=low-stock')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Low Stock Alerts
              </CardTitle>
              <div className="rounded-full bg-amber-100 p-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                (metrics?.lowStockAlerts || 0) > 0 ? "text-amber-600" : "text-slate-900"
              )}>
                {metrics?.lowStockAlerts || 0}
              </div>
              <p className="mt-1 text-xs text-slate-500">Click to view items</p>
            </CardContent>
          </Card>
        )}

        {showChallans && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Draft Challans
              </CardTitle>
              <div className="rounded-full bg-slate-100 p-2">
                <FileText className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{metrics?.draftChallans || 0}</div>
            </CardContent>
          </Card>
        )}

        {showChallans && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Confirmed Challans
              </CardTitle>
              <div className="rounded-full bg-emerald-100 p-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{metrics?.confirmedChallans || 0}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
