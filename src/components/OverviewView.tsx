
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, CheckCircle, Clock } from 'lucide-react';

export function OverviewView() {
  const stats = [
    {
      title: "Total Documents",
      value: "1,234",
      description: "All uploaded files",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Processed Today",
      value: "42",
      description: "Files processed today",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "In Queue",
      value: "8",
      description: "Awaiting processing",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Success Rate",
      value: "98.5%",
      description: "Processing accuracy",
      icon: Upload,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest document processing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { file: "invoice_2024_001.pdf", status: "Completed", time: "2 min ago" },
                { file: "contract_draft.pdf", status: "Processing", time: "5 min ago" },
                { file: "report_final.pdf", status: "Completed", time: "10 min ago" },
                { file: "form_application.pdf", status: "Completed", time: "15 min ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">{activity.file}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Upload New Document</p>
                    <p className="text-sm text-gray-500">Add a PDF for processing</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">View All Documents</p>
                    <p className="text-sm text-gray-500">Browse processed files</p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
