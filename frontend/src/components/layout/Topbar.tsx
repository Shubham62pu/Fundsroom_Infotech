import { useAuth } from '../../store/AuthContext';
import { LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';

export function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex flex-1" />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium text-slate-900">{user?.name}</span>
            <span className="text-xs text-slate-500">{user?.role}</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <User className="h-5 w-5 text-slate-600" />
          </div>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={logout}
          title="Logout"
          className="text-slate-600 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
