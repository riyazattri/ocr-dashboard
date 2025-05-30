
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
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
        <main className="flex-1">
          <DashboardContent activeView={activeView} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
