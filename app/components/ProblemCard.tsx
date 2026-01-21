'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Monitor, Code2, BookOpen } from "lucide-react";
import Link from "next/link";
import { Task, TaskLink, Resource } from "@/lib/types"; // Assuming types are defined in a central file

export default function ProblemCard({ task, tasklinks, resources }: { task: Task, tasklinks: TaskLink[], resources: Resource[] }) {
  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <Card className="w-full max-w-lg overflow-hidden border-border/50 shadow-xl transition-all sm:rounded-2xl">
        {/* Header: Responsive stacking */}
        <CardHeader className="bg-muted/30 pb-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <Badge variant="outline" className="w-fit bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
              {task.title}
            </Badge>
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold">{task.title}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {task.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Required Problems Section */}
          <section className="space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Code2 className="w-3 h-3" /> Required Problems
            </h4>
            
            <div className="grid grid-cols-1 gap-2">
              {tasklinks.map((prob, i) => (
                <Link 
                  key={i}
                  href={prob.url} 
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/50 transition-all active:scale-[0.98] group"
                >
                  <span className="text-sm font-semibold">{prob.label}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </section>

          {/* Learning Resources Section: Grid for better mobile use */}
          <section className="space-y-3">
            <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <BookOpen className="w-3 h-3" /> Learning Resources
            </h4>

            <div className="grid grid-cols-1 gap-2">
               {resources.map((resource, i) => (
                <Link 
                  key={i}
                  href={resource.url} 
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/30 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-blue-500/10 text-blue-600">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{resource.label}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
               ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}