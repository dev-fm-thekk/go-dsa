"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { FileText, Calendar, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User } from "@supabase/supabase-js"
import { uploadTask } from "@/lib/coordinator/action"

// --- Simplified Validation Schema ---
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters."),
  expires_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
})

export default function AddTaskForm({ user }: {user: User } ) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  })

  async function onSubmit(data: any) {
    toast.success("Task Details Validated", {
      description: "Ready to proceed with task creation.",
    })
    
    let response = await uploadTask(user, data)
    console.log(response);
  }

  return (
    <div className="container max-w-2xl py-10 px-4">
      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg text-primary-foreground">
              <FileText size={20} />
            </div>
            <div>
              <CardTitle className="text-2xl">Create New Task</CardTitle>
              <CardDescription>Enter the core details for the new assignment.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="px-2 py-0">Core Info</Badge>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input 
                {...form.register("title")} 
                id="title" 
                placeholder="E.g., Implementation of OAuth2" 
              />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive font-medium">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea 
                {...form.register("description")} 
                id="description" 
                placeholder="Describe the scope of this task..."
                className="min-h-[120px] resize-none"
              />
              {form.formState.errors.description && (
                <p className="text-xs text-destructive font-medium">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="grid gap-2 sm:max-w-[240px]">
              <Label htmlFor="expiresAt">Expiration Date</Label>
              <div className="relative">
                <Input 
                  {...form.register("expires_at")} 
                  id="expiresAt" 
                  type="date" 
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              {form.formState.errors.expires_at && (
                <p className="text-xs text-destructive font-medium">{form.formState.errors.expires_at.message}</p>
              )}
            </div>

          </CardContent>

          <CardFooter className="bg-muted/30 border-t flex justify-end gap-3 p-6 mt-4">
            <Button type="button" variant="ghost" onClick={() => form.reset()}>
              Reset Form
            </Button>
            <Button type="submit" className="gap-2">
              Create Task <ChevronRight size={16} />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}