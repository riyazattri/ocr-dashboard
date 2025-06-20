
import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function SampleValidatorView() {
  const [dragOver, setDragOver] = useState(false);
  const [sampleFile, setSampleFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationRules, setValidationRules] = useState<string[]>([]);
  const { toast } = useToast();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      setSampleFile(pdfFile);
      toast({
        title: "Sample PDF uploaded",
        description: "Ready to process as validation template",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSampleFile(file);
      toast({
        title: "Sample PDF uploaded",
        description: "Ready to process as validation template",
      });
    }
  };

  const removeSampleFile = () => {
    setSampleFile(null);
    setValidationRules([]);
  };

  const processSampleFile = async () => {
    if (!sampleFile) return;
    
    setIsProcessing(true);
    
    // Simulate API call to extract validation rules from sample PDF
    setTimeout(() => {
      const mockRules = [
        "Document must contain 'Invoice' header",
        "Date field required in DD/MM/YYYY format",
        "Total amount field must be present",
        "Company logo must be in top-left corner",
        "Minimum 5 line items required"
      ];
      setValidationRules(mockRules);
      setIsProcessing(false);
      toast({
        title: "Sample processed successfully",
        description: "Validation template has been created",
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Sample PDF Validator</CardTitle>
          <CardDescription>
            Upload a sample PDF that will serve as a template for validating future document uploads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Sample PDF</h3>
            <p className="text-gray-500 mb-4">
              This PDF will be used as a validation template for future uploads
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
              id="sample-upload"
            />
            <Button asChild>
              <label htmlFor="sample-upload" className="cursor-pointer">
                Choose Sample PDF
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {sampleFile && (
        <Card>
          <CardHeader>
            <CardTitle>Sample PDF Ready</CardTitle>
            <CardDescription>
              Process this file to create validation template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">{sampleFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(sampleFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeSampleFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              onClick={processSampleFile} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing Sample...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Validation Template
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {validationRules.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Validation Template Active
            </CardTitle>
            <CardDescription>
              Future PDF uploads will be validated against these rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {validationRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded-md">
                  <AlertCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-800">{rule}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> All future uploaded PDFs will be automatically validated against this template. 
                Files that don't match the validation criteria will be flagged for review.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
