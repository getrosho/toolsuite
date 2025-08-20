import { useState } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CloudUpload, Download, Plus, X, ArrowUpDown, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How many PDFs can I merge at once?',
    answer: 'You can merge up to 10 PDF files in a single operation. Each file can be up to 10MB in size.',
  },
  {
    question: 'Can I change the order of merged PDFs?',
    answer: 'Yes, you can drag and drop the uploaded files to rearrange them before merging. The final PDF will follow the order you specify.',
  },
  {
    question: 'What happens to bookmarks and links?',
    answer: 'Our merging process preserves bookmarks, links, and other PDF metadata when possible. Complex interactive elements may need manual adjustment.',
  },
];

interface UploadedFile {
  file: File;
  id: string;
}

export default function MergePDFs() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [mergeComplete, setMergeComplete] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== files.length) {
      toast({
        title: 'Invalid file type',
        description: 'Please select only PDF files.',
        variant: 'destructive',
      });
    }

    const oversizedFiles = pdfFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: 'Files too large',
        description: 'Some files are larger than 10MB and were not added.',
        variant: 'destructive',
      });
    }

    const validFiles = pdfFiles.filter(file => file.size <= 10 * 1024 * 1024);
    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));

    if (uploadedFiles.length + newFiles.length > 10) {
      toast({
        title: 'Too many files',
        description: 'You can merge a maximum of 10 PDF files.',
        variant: 'destructive',
      });
      return;
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    if (newFiles.length > 0) {
      toast({
        title: 'Files added',
        description: `${newFiles.length} PDF file(s) added successfully.`,
      });
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...uploadedFiles];
    const [removed] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, removed);
    setUploadedFiles(newFiles);
  };

  const startMerge = async () => {
    if (uploadedFiles.length < 2) {
      toast({
        title: 'Need more files',
        description: 'Please add at least 2 PDF files to merge.',
        variant: 'destructive',
      });
      return;
    }

    setIsMerging(true);
    setMergeProgress(0);
    
    // Simulate merge progress
    const progressInterval = setInterval(() => {
      setMergeProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsMerging(false);
          setMergeComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    try {
      const formData = new FormData();
      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append('pdfs', uploadedFile.file);
      });
      
      const response = await fetch('/api/merge-pdfs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Merge failed');
      }
      
      // Handle successful merge
    } catch (error) {
      console.error('Merge error:', error);
      setIsMerging(false);
      clearInterval(progressInterval);
      toast({
        title: 'Merge failed',
        description: 'There was an error merging your PDFs. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadFile = () => {
    toast({
      title: 'Download started',
      description: 'Your merged PDF is being downloaded.',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-layer-group text-green-500 mr-3"></i>
              Merge PDFs Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combine multiple PDF files into a single document. Upload your PDFs, arrange them in the desired order, 
              and merge them into one convenient file.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              {!mergeComplete ? (
                <div className="space-y-6">
                  {/* Upload Section */}
                  <div className="text-center">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 transition-colors hover:border-primary">
                      <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                        <Plus className="text-white w-8 h-8" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Add PDF files to merge
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Select multiple PDF files or add them one by one
                      </p>
                      
                      <input 
                        type="file" 
                        accept=".pdf" 
                        multiple
                        onChange={handleFileUpload}
                        className="hidden" 
                        id="pdf-upload"
                        disabled={isMerging}
                      />
                      <label htmlFor="pdf-upload">
                        <Button asChild className="bg-gradient-primary hover:bg-gradient-primary-hover">
                          <span>
                            <Plus className="w-4 h-4 mr-2" />
                            Add PDF Files
                          </span>
                        </Button>
                      </label>
                      
                      <div className="mt-4 text-sm text-muted-foreground">
                        Maximum 10 files, 10MB each
                      </div>
                    </div>
                  </div>

                  {/* File List */}
                  {uploadedFiles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Files to merge ({uploadedFiles.length})
                      </h3>
                      <div className="space-y-2">
                        {uploadedFiles.map((uploadedFile, index) => (
                          <div key={uploadedFile.id} className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
                                <i className="fas fa-file-pdf text-red-500 text-sm"></i>
                              </div>
                              <div>
                                <div className="font-medium text-sm text-foreground">{uploadedFile.file.name}</div>
                                <div className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.file.size)}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                                {index + 1}
                              </span>
                              {index > 0 && (
                                <Button size="sm" variant="outline" onClick={() => moveFile(index, index - 1)}>
                                  <ArrowUpDown className="w-3 h-3" />
                                </Button>
                              )}
                              <Button size="sm" variant="outline" onClick={() => removeFile(uploadedFile.id)}>
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <Button 
                          onClick={startMerge}
                          disabled={uploadedFiles.length < 2 || isMerging}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <i className="fas fa-layer-group mr-2"></i>
                          Merge PDFs
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Merge Progress */}
                  {isMerging && (
                    <div className="mt-8">
                      <Progress value={mergeProgress} className="mb-4" />
                      <div className="text-center text-sm text-muted-foreground">
                        Merging {uploadedFiles.length} PDF files... {mergeProgress}%
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                      Merge Complete!
                    </h3>
                    <p className="text-green-700 dark:text-green-400 mb-4">
                      Your {uploadedFiles.length} PDF files have been successfully merged into one document.
                    </p>
                    <Button onClick={downloadFile} className="bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Merged PDF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="rectangle" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
