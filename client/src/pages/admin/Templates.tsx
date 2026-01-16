import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { sampleTemplates } from '@/data/sampleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Upload, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function Templates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateCategory, setTemplateCategory] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const { toast } = useToast();

  const handleAddTemplate = () => {
    if (templateName.trim() && templateCategory.trim()) {
      toast({
        title: 'Template Added',
        description: `${templateName} template has been created.`,
      });
      setTemplateName('');
      setTemplateCategory('');
      setTemplateDescription('');
      setIsDialogOpen(false);
    }
  };

  return (
    <DashboardLayout role="admin" userName="Mayor Johnson">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Complaint Templates</h1>
            <p className="text-muted-foreground">
              Manage complaint templates for standardized reporting
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Road Damage Report"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Roads & Infrastructure"
                      value={templateCategory}
                      onChange={(e) => setTemplateCategory(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe when this template should be used..."
                      value={templateDescription}
                      onChange={(e) => setTemplateDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleAddTemplate} className="w-full">
                    Create Template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTemplates.map((template) => (
            <Card key={template.id} className="shadow-card hover:shadow-elevated transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{template.name}</CardTitle>
                    <span className="inline-block px-2 py-0.5 mt-1 rounded-full bg-muted text-xs text-muted-foreground">
                      {template.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(template.createdAt, 'MMM dd, yyyy')}
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
