'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Recommended for Status
import Link from "next/link";
import { Pencil, Trash2, Send } from "lucide-react"; // Icons for better sizing

export type Task = {
  id: string;
  title: string;
  description: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
  published: boolean;
};

interface TaskTableProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onPublish: (taskId: string) => void;
}

export function TaskTable({ tasks, onDelete, onPublish }: TaskTableProps) {
   return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[40%]">Task Title</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                No tasks found. Create one to get started.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id} className="group">
                <TableCell className="font-medium py-4">
                  <div className="flex flex-col">
                    <span>{task.title}</span>
                    <span className="text-xs text-muted-foreground font-normal sm:hidden">
                      Expires: {new Date(task.expires_at).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {new Date(task.expires_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={task.published ? "default" : "secondary"}>
                    {task.published ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    {/* Edit Link Styled as Button */}
                    <Link 
                      href={`/admin/task/${task.id}/edit/`} 
                      className={buttonVariants({ variant: "ghost", size: "icon" })}
                      title="Edit Task"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>

                    {/* Publish Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onPublish(task.id)}
                      disabled={task.published}
                      title="Publish Task"
                    >
                      <Send className="h-4 w-4" />
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete(task.id)}
                      title="Delete Task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}