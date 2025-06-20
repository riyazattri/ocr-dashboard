
import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { DashboardContent } from './DashboardContent';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState('overview');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-gray-100">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
        <DashboardContent activeView={activeView} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
