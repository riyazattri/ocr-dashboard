
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OverviewView } from './OverviewView';
import { UploadView } from './UploadView';
import { DocumentsView } from './DocumentsView';
import { SettingsView } from './SettingsView';
import { SampleValidatorView } from './SampleValidatorView';

interface DashboardContentProps {
  activeView: string;
}

export function DashboardContent({ activeView }: DashboardContentProps) {
  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewView />;
      case 'upload':
        return <UploadView />;
      case 'validator':
        return <SampleValidatorView />;
      case 'documents':
        return <DocumentsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold capitalize">{activeView === 'validator' ? 'Sample Validator' : activeView}</h1>
      </div>
      {renderView()}
    </div>
  );
}
