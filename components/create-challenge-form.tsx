"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createChallenge } from "@/lib/challenges/action"
import { redirect } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  // Use .nullable() or .optional() but keep the base type consistent
  description: z.string().optional(),
  type: z.string().optional(),
  expires_at: z.string().optional(),
  // Remove .default(false) if you are providing it in defaultValues
  published: z.boolean(), 
})

export default function CreateChallengeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "coding",
      expires_at: "",
      published: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where you'd call your API route
    const response = await createChallenge(values);
    if (response.error) console.error(response.error);
    if (response.data) redirect('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg border p-6 rounded-lg">
        
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="What is this challenge about?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Type Field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Logic, Speed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiration Date */}
          <FormField
            control={form.control}
            name="expires_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expires At</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Published Toggle */}
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Published</FormLabel>
                <FormDescription>
                  Make this challenge visible to everyone immediately.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Create Challenge</Button>
      </form>
    </Form>
  )
}