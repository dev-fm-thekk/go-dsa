'use client';

import { Calendar, Link as LinkIcon, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "./TaskTable";

export type TaskResource = { id: string; label: string; url: string; };
export type TaskLink = { id: string; label: string; url: string; platform: string; };

interface PublicTaskCardProps {
  task: Task;
  resources?: TaskResource[];
  links?: TaskLink[];
}

export function PublicTaskCard({ task, resources = [], links = [] }: PublicTaskCardProps) {
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
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground">{task.title}</h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-5 px-5 pb-5">
        {/* Description Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description</label>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="grid gap-4">
          {/* Resources Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resources</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {resources.length > 0 ? resources.map(res => (
                 <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-muted/40 text-[11px] text-foreground transition-colors hover:border-primary/40 hover:bg-accent">
                    <FileText className="h-3.5 w-3.5 text-primary" /> {res.label}
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
              )) : <span className="text-[11px] text-muted-foreground/60 italic px-1">No resources linked</span>}
            </div>
          </div>

          {/* Task Links Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Task Links</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {links.length > 0 ? links.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-muted/40 text-[11px] text-foreground transition-colors hover:border-primary/40 hover:bg-accent">
                  <LinkIcon className="h-3.5 w-3.5 text-primary" /> 
                  <span className="font-semibold opacity-70 uppercase text-[9px]">{link.platform}:</span> {link.label}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
              )) : <span className="text-[11px] text-muted-foreground/60 italic px-1">No links available</span>}
            </div>
          </div>
        </div>

        {/* Expiry Date Section */}
        <div className="space-y-2 pt-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Due Date</label>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className={isExpired ? "text-destructive font-medium" : ""}>
              {new Date(task.expires_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
