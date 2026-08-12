import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import type { Role } from '../../types';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ArrowRightLeft, 
  FileText, 
  Receipt,
  UserCog 
} from 'lucide-react';
import { cn } from '../../lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'] },
  { name: 'Customers', href: '/customers', icon: Users, roles: ['ADMIN', 'SALES'] },
  { name: 'Products', href: '/products', icon: Package, roles: ['ADMIN', 'WAREHOUSE'] },
  { name: 'Stock Movements', href: '/stock-movements', icon: ArrowRightLeft, roles: ['ADMIN', 'WAREHOUSE'] },
  { name: 'Sales Challans', href: '/challans', icon: FileText, roles: ['ADMIN', 'SALES', 'WAREHOUSE'] },
  { name: 'Invoices', href: '/invoices', icon: Receipt, roles: ['ADMIN', 'SALES', 'ACCOUNTS'] },
  { name: 'Users/Roles', href: '/users', icon: UserCog, roles: ['ADMIN'] },
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredItems = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white/50 backdrop-blur-sm">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-600 p-1">
            <Package className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Fundsroom</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {filteredItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500',
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
