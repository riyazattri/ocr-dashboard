
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Table, BarChart3, Settings, LogOut, User, Shield, Sparkles } from 'lucide-react';

interface AppSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    url: "overview",
    icon: BarChart3,
    description: "Analytics overview"
  },
  {
    title: "Upload Documents",
    url: "upload",
    icon: Upload,
    description: "Process new files"
  },
  {
    title: "Sample Validator",
    url: "validator",
    icon: Shield,
    description: "Template management"
  },
  {
    title: "Document Library",
    url: "documents",
    icon: Table,
    description: "View processed files"
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
    description: "System preferences"
  },
];

export function AppSidebar({ activeView, setActiveView, onLogout }: AppSidebarProps) {
  return (
    <Sidebar className="border-r-0 shadow-2xl">
      <SidebarHeader className="border-b border-sidebar-border/50 pb-6 pt-8">
        <div className="flex items-center gap-3 px-6">
          <div className="premium-gradient p-3 rounded-xl shadow-lg">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-sidebar-foreground flex items-center gap-2">
              OCR Pro
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </h2>
            <p className="text-sm text-sidebar-foreground/70 font-medium">
              Document Intelligence Platform
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 text-xs font-semibold uppercase tracking-wider mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.url)}
                    isActive={activeView === item.url}
                    className={`w-full h-12 px-4 rounded-xl transition-all duration-200 group ${
                      activeView === item.url
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25 border border-sidebar-primary/20'
                        : 'hover:bg-sidebar-accent/60 text-sidebar-foreground/80 hover:text-sidebar-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 ${
                          activeView === item.url ? 'text-white' : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground'
                        }`} />
                        <div className="text-left">
                          <span className="font-medium text-sm">{item.title}</span>
                          <p className={`text-xs ${
                            activeView === item.url ? 'text-sidebar-primary-foreground/80' : 'text-sidebar-foreground/50'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border/50 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent/30">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60">john@company.com</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout}
            className="w-full bg-transparent border-sidebar-border/30 text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
