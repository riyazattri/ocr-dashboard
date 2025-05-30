
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, FileText, Calendar, User, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for documents
const mockDocuments = [
  {
    id: 1,
    filename: "invoice_2024_001.pdf",
    uploadDate: "2024-01-15",
    status: "Completed",
    extractedFields: {
      documentType: "Invoice",
      amount: "$1,250.00",
      date: "2024-01-10",
      vendor: "ABC Company",
      invoiceNumber: "INV-2024-001"
    }
  },
  {
    id: 2,
    filename: "contract_draft.pdf",
    uploadDate: "2024-01-14",
    status: "Completed",
    extractedFields: {
      documentType: "Contract",
      contractValue: "$50,000.00",
      startDate: "2024-02-01",
      client: "XYZ Corporation",
      duration: "12 months"
    }
  },
  {
    id: 3,
    filename: "receipt_store.pdf",
    uploadDate: "2024-01-13",
    status: "Completed",
    extractedFields: {
      documentType: "Receipt",
      total: "$89.95",
      date: "2024-01-12",
      store: "Tech Store Inc",
      items: "3 items"
    }
  },
  {
    id: 4,
    filename: "form_application.pdf",
    uploadDate: "2024-01-12",
    status: "Processing",
    extractedFields: {
      documentType: "Application Form",
      applicantName: "John Smith",
      submissionDate: "2024-01-11",
      formType: "Employment Application",
      status: "Under Review"
    }
  }
];

export function DocumentsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents] = useState(mockDocuments);
  const { toast } = useToast();

  const filteredDocuments = documents.filter(doc =>
    doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.extractedFields.documentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['Filename', 'Upload Date', 'Status', 'Document Type', 'Key Field 1', 'Key Field 2'];
    const csvData = filteredDocuments.map(doc => [
      doc.filename,
      doc.uploadDate,
      doc.status,
      doc.extractedFields.documentType,
      Object.values(doc.extractedFields)[1] || '',
      Object.values(doc.extractedFields)[2] || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ocr_documents.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export completed",
      description: "Document data has been exported to CSV",
    });
  };

  const exportSingleDocument = (doc: typeof mockDocuments[0]) => {
    const data = {
      filename: doc.filename,
      uploadDate: doc.uploadDate,
      status: doc.status,
      extractedFields: doc.extractedFields
    };

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.filename.replace('.pdf', '')}_data.json`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Document exported",
      description: `${doc.filename} data has been exported`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Document Library</CardTitle>
              <CardDescription>
                Manage and view all your processed documents
              </CardDescription>
            </div>
            <Button onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Key Fields</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-600" />
                        <span className="font-medium">{doc.filename}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {doc.extractedFields.documentType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {doc.uploadDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={doc.status === 'Completed' ? 'default' : 'secondary'}
                        className={doc.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {Object.entries(doc.extractedFields).slice(1, 3).map(([key, value], index) => (
                          <div key={index} className="flex items-center gap-1">
                            {key.includes('amount') || key.includes('Value') || key.includes('total') ? (
                              <DollarSign className="h-3 w-3 text-green-600" />
                            ) : key.includes('date') || key.includes('Date') ? (
                              <Calendar className="h-3 w-3 text-blue-600" />
                            ) : (
                              <User className="h-3 w-3 text-gray-600" />
                            )}
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => exportSingleDocument(doc)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria' : 'Upload some PDF files to get started'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
