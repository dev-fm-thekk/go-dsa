import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResourceModal({ isOpen, onClose, taskId }: { isOpen: boolean, onClose: () => void, taskId: string }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="label">Display Label</Label>
            <Input id="label" placeholder="e.g. Project Documentation" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" type="url" placeholder="https://..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Resource</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}