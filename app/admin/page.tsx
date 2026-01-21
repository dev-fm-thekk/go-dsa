'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Terminal, 
  Calendar, 
  Trash2, 
  ChevronRight, 
  ExternalLink,
  Users
} from "lucide-react";

// Mock data structure - replace with your actual data fetching logic
const tasks = [
  {
    id: "TASK-1024",
    title: "Graph Theory: Dijkstra's Protocol",
    description: "Master shortest path algorithms in weighted directed graphs.",
    status: "Active",
    expires_at: "2026-02-15T23:59",
    submissions: 42,
    platform: "LeetCode"
  },
  {
    id: "TASK-1025",
    title: "Dynamic Programming: Knapsack Mastery",
    description: "Optimization challenges using 0/1 Knapsack variations.",
    status: "Expiring",
    expires_at: "2026-01-22T10:00",
    submissions: 128,
    platform: "HackerRank"
  }
];

export default function TaskList() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:bg-muted/20 transition-all hover:border-primary/50"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Mission Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  {task.id}
                </span>
                <Badge variant={task.status === "Expiring" ? "destructive" : "secondary"} className="text-[10px] uppercase font-black tracking-tighter">
                  {task.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-black tracking-tight flex items-center gap-2 group-hover:text-primary transition-colors">
                  {task.title}
                  <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="font-mono">{new Date(task.expires_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{task.submissions} Submissions</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Code2 className="h-3.5 w-3.5" />
                  <span>{task.platform}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl">
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button className="ml-2 bg-foreground text-background font-bold hover:bg-primary hover:text-primary-foreground transition-all rounded-xl px-6">
                Edit Protocol
              </Button>
            </div>
          </div>

          {/* Progress Bar (Visual Flair) */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full overflow-hidden rounded-b-2xl">
            <div 
              className={`h-full transition-all duration-1000 ${task.status === 'Expiring' ? 'bg-destructive' : 'bg-primary'}`}
              style={{ width: `${Math.random() * 100}%` }} 
            />
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-3xl">
          <Terminal className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">No active protocols found.</p>
        </div>
      )}
    </div>
  );
}