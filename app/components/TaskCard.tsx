'use client';

import { useState } from "react";
import { 
  Calendar, Pencil, Send, Trash2, Link as LinkIcon, 
  FileText, Plus, ExternalLink, Check, X, Loader2 
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "./TaskTable";
import { ResourceModal } from "./resourceModal";
import { TaskLinkModal } from "./taskLinkModal";

export type TaskResource = { id: string; label: string; url: string; };
export type TaskLink = { id: string; label: string; url: string; platform: string; };

interface TaskCardProps {
  task: Task;
  resources?: TaskResource[];
  links?: TaskLink[];
  onUpdate?: (id: string, data: Partial<Task>) => Promise<void>;
}

export function TaskCard({ task, resources = [], links = [], onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const initialDate = task.expires_at 
    ? new Date(task.expires_at).toISOString().split('T')[0] 
    : "";

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    expires_at: initialDate
  });

  const [isResourceModalOpen, setResourceModalOpen] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);

  // Logic to handle saving links from the modal
  const handleSaveLink = async (data: any) => {
    console.log("Saving Link for Task:", task.id, data);
    // The modal now handles the API call, this is just for any additional logic
  };

  // Handle successful resource/link addition - refresh data if needed
  const handleResourceSuccess = () => {
    // You can add logic here to refresh resources list
    // For now, the parent component should handle data refresh
    console.log("Resource added successfully");
  };

  const handleLinkSuccess = () => {
    // You can add logic here to refresh links list
    // For now, the parent component should handle data refresh
    console.log("Task link added successfully");
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (onUpdate) {
      // Convert expires_at string to Date object
      const updateData: Partial<Task> = {
        title: editData.title,
        description: editData.description,
        expires_at: editData.expires_at ? new Date(editData.expires_at) : undefined
      };
      await onUpdate(task.id, updateData);
    }
    setIsSaving(false);
    setIsEditing(false);
  };

  const isExpired = new Date(task.expires_at) < new Date();

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden transition-all duration-200 border-border bg-card text-card-foreground hover:border-primary/50">
      <CardHeader className="space-y-3 p-5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={task.published 
                ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10" 
                : "text-muted-foreground border-border bg-muted/50"}
            >
              {task.published ? "Published" : "Draft"}
            </Badge>
            {isExpired && (
              <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10">
                Expired
              </Badge>
            )}
          </div>
          
          {!isEditing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </Button>
          )}
        </div>

        {isEditing ? (
          <Input 
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="text-lg font-bold h-9 bg-background border-input focus-visible:ring-primary"
          />
        ) : (
          <h3 className="text-xl font-bold tracking-tight text-foreground">{task.title}</h3>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-5 px-5 pb-5">
        {/* Description Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description</label>
          {isEditing ? (
            <Textarea 
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="min-h-[100px] resize-none text-sm bg-background border-input"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {task.description || "No description provided."}
            </p>
          )}
        </div>

        <div className="grid gap-4">
          {/* Resources Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resources</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 rounded-md hover:bg-accent hover:text-primary" 
                onClick={() => setResourceModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resources.length > 0 ? resources.map(res => (
                <div key={res.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-muted/40 text-[11px] text-foreground transition-colors hover:border-primary/40">
                  <FileText className="h-3.5 w-3.5 text-primary" /> {res.label}
                </div>
              )) : <span className="text-[11px] text-muted-foreground/60 italic px-1">No resources linked</span>}
            </div>
          </div>

          {/* Task Links Section (Added Here) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Task Links</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 rounded-md hover:bg-accent hover:text-primary" 
                onClick={() => setLinkModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {links.length > 0 ? links.map(link => (
                <div key={link.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-muted/40 text-[11px] text-foreground transition-colors hover:border-primary/40">
                  <LinkIcon className="h-3.5 w-3.5 text-primary" /> 
                  <span className="font-semibold opacity-70 uppercase text-[9px]">{link.platform}:</span> {link.label}
                </div>
              )) : <span className="text-[11px] text-muted-foreground/60 italic px-1">No links available</span>}
            </div>
          </div>
        </div>

        {/* Expiry Date Section */}
        <div className="space-y-2 pt-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Due Date</label>
          {isEditing ? (
            <Input 
              type="date"
              value={editData.expires_at}
              onChange={(e) => setEditData({...editData, expires_at: e.target.value})}
              className="h-9 text-sm bg-background border-input"
            />
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className={isExpired ? "text-destructive font-medium" : ""}>
                {new Date(task.expires_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t border-border bg-muted/10 p-5">
        {isEditing ? (
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditing(false)} disabled={isSaving}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="mr-2 h-4 w-4" /> Save</>}
            </Button>
          </div>
        ) : (
          <div className="flex w-full gap-2">
            <Button className="flex-1 font-medium" variant={task.published ? "outline" : "default"} disabled={task.published}>
              {task.published ? <><ExternalLink className="mr-2 h-4 w-4" /> Live</> : <><Send className="mr-2 h-4 w-4" /> Publish</>}
            </Button>
            <Button variant="outline" size="icon" className="text-muted-foreground hover:text-destructive hover:border-destructive/50 bg-transparent">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>

      {/* Modals */}
      <ResourceModal 
        isOpen={isResourceModalOpen} 
        onClose={() => setResourceModalOpen(false)} 
        taskId={task.id}
        onSuccess={handleResourceSuccess}
      />
      <TaskLinkModal 
        isOpen={isLinkModalOpen} 
        onClose={() => setLinkModalOpen(false)} 
        onSave={handleSaveLink} 
        taskId={task.id}
        onSuccess={handleLinkSuccess}
      />
    </Card>
  );
}
