'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Link2, Loader2 } from "lucide-react";
import { addTaskLink } from "@/lib/task/action";

interface TaskLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { label: string; url: string; platform: string }) => void;
  taskId: string;
  onSuccess?: () => void;
}

export function TaskLinkModal({ isOpen, onClose, onSave, taskId, onSuccess }: TaskLinkModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    url: "",
    platform: "Leetcode"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.label.trim() || !formData.url.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      const result = await addTaskLink({
        task_id: taskId,
        label: formData.label.trim(),
        url: formData.url.trim(),
        platform: formData.platform
      });

      if (result.error) {
        console.error("Failed to add task link:", result.error);
        alert(`Failed to add link: ${result.error}`);
      } else {
        // Call optional onSave callback for parent component
        if (onSave) {
          await onSave(formData);
        }
        onSuccess?.();
        router.refresh(); // Refresh the page to show the new link
        setFormData({ label: "", url: "", platform: "other" }); // Reset
        onClose();
      }
    } catch (error) {
      console.error("Error adding task link:", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ label: "", url: "", platform: "other" });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              Add Task Link
            </DialogTitle>
            <DialogDescription>
              Attach a social or platform link to this task.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            {/* Platform Selection */}
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select 
                value={formData.platform} 
                onValueChange={(value) => setFormData({...formData, platform: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leetcode">Leetcode</SelectItem>
                  <SelectItem value="HackerRank">HackerRank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Label Input */}
            <div className="grid gap-2">
              <Label htmlFor="label">Link Label</Label>
              <Input
                id="label"
                placeholder="e.g. Join Discussion"
                value={formData.label}
                onChange={(e) => setFormData({...formData, label: e.target.value})}
                required
              />
            </div>

            {/* URL Input */}
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="url"
                  type="url"
                  className="pl-9"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Link"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}