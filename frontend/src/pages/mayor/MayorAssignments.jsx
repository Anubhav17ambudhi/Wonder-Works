import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';
import { FileDown, FileUp, UploadCloud, CheckCircle2 } from 'lucide-react';

export default function MayorAssignments() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownloadTemplate = () => {
    // We direct the browser to the authenticated endpoint if it supports cookies,
    // or fetch the blob using axios and trigger download.
    api.get('/admin/template/download', { responseType: 'blob' })
      .then(res => {
         const url = window.URL.createObjectURL(new Blob([res.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', 'Supervisor_Assignment_Template.csv');
         document.body.appendChild(link);
         link.click();
         link.parentNode.removeChild(link);
      })
      .catch(err => {
         console.error("Failed to download template", err);
         alert("Failed to download template.");
      });
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResultMsg('');

    const formData = new FormData();
    formData.append('assign_csv', file); // Backend expects 'assign_csv'

    try {
      const res = await api.post('/admin/assignments/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setIsSuccess(true);
      setResultMsg(res.data?.message || "File uploaded and assignments processed successfully.");
      setFile(null);
    } catch (err) {
      setIsSuccess(false);
      setResultMsg(err.response?.data?.message || "Error processing upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Supervisor Assignments</h2>
        <p className="text-muted-foreground">Bulk assign areas to supervisors using the official CSV template.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>1. Download Template</CardTitle>
          <CardDescription>Get the structured CSV template. Do not change the headers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleDownloadTemplate} className="w-full flex items-center justify-center gap-2">
             <FileDown className="h-4 w-4" /> Download the CSV
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Upload Filled Assignments</CardTitle>
          <CardDescription>Upload the filled CSV file to apply supervisor assignments system wide.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors">
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
            <input 
               type="file" 
               accept=".csv"
               id="csv-upload"
               className="hidden"
               onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="csv-upload" className="cursor-pointer text-sm font-medium text-primary hover:underline">
               {file ? file.name : "Click to select a CSV file"}
            </label>
            <p className="text-xs text-muted-foreground mt-2">Maximum file size 5MB</p>
          </div>

          {resultMsg && (
             <div className={`mt-4 p-3 rounded text-sm font-medium flex items-center gap-2 ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isSuccess && <CheckCircle2 className="h-4 w-4" />}
                {resultMsg}
             </div>
          )}
        </CardContent>
        <CardFooter>
            <Button onClick={handleUpload} disabled={!file || loading} className="w-full text-foreground gap-2">
               {loading ? "Uploading..." : <><FileUp className="h-4 w-4" /> Finalize Assignments</>}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
