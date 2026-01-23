'use client';

import { useState } from "react";
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
import { Globe, Link2 } from "lucide-react";

interface TaskLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { label: string; url: string; platform: string }) => void;
  taskId: string;
}

export function TaskLinkModal({ isOpen, onClose, onSave, taskId }: TaskLinkModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    url: "",
    platform: "other"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Logic to call your Supabase action would go here
    await onSave(formData);
    
    setLoading(false);
    setFormData({ label: "", url: "", platform: "other" }); // Reset
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                  <SelectItem value="discord">Discord</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="twitter">Twitter / X</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="other">Other / Website</SelectItem>
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}