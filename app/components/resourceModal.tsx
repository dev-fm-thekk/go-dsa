'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Loader2 } from "lucide-react";
import { addTaskResource } from "@/lib/task/action";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  onSuccess?: () => void;
}

export function ResourceModal({ isOpen, onClose, taskId, onSuccess }: ResourceModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    url: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.label.trim() || !formData.url.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      const result = await addTaskResource({
        task_id: taskId,
        label: formData.label.trim(),
        url: formData.url.trim()
      });

      if (result.error) {
        alert(`Failed to add resource: ${result.error}`);
      } else {
        setFormData({ label: "", url: "" });
        onSuccess?.();
        router.refresh(); // Refresh the page to show the new resource
        onClose();
      }
    } catch (error) {
      alert("An unexpected error occurred");
      console.error("Error adding resource:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ label: "", url: "" });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Add New Resource
            </DialogTitle>
            <DialogDescription>
              Add a learning resource or documentation link for this task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="label">Display Label</Label>
              <Input 
                id="label" 
                placeholder="e.g. Project Documentation" 
                value={formData.label}
                onChange={(e) => setFormData({...formData, label: e.target.value})}
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input 
                id="url" 
                type="url" 
                placeholder="https://..." 
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                required
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Resource"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}