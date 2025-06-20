
import { SidebarTrigger } from "@/components/ui/sidebar";
import { OverviewView } from './OverviewView';
import { UploadView } from './UploadView';
import { DocumentsView } from './DocumentsView';
import { SettingsView } from './SettingsView';
import { SampleValidatorView } from './SampleValidatorView';
import { Badge } from "@/components/ui/badge";

interface DashboardContentProps {
  activeView: string;
}

const viewTitles = {
  overview: { title: 'Dashboard Overview', subtitle: 'Monitor your document processing analytics' },
  upload: { title: 'Upload Documents', subtitle: 'Process new PDF files with OCR technology' },
  validator: { title: 'Sample Validator', subtitle: 'Manage document templates and validation rules' },
  documents: { title: 'Document Library', subtitle: 'View and manage processed documents' },
  settings: { title: 'System Settings', subtitle: 'Configure platform preferences' },
};

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

  const currentView = viewTitles[activeView as keyof typeof viewTitles] || viewTitles.overview;

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50/50 to-white/80 min-h-screen">
      <div className="sticky top-0 z-10 glass-effect border-b border-gray-200/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <SidebarTrigger className="h-10 w-10 bg-white/80 hover:bg-white border border-gray-200/60 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl" />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{currentView.title}</h1>
                <Badge variant="secondary" className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border-indigo-200/50 font-medium">
                  Pro
                </Badge>
              </div>
              <p className="text-gray-600 font-medium">{currentView.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">JD</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {renderView()}
      </div>
    </div>
  );
}
