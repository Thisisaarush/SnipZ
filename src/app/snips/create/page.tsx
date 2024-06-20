"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number()
})

const snipFormSchema = z.object({
  description: z.string().min(5).max(200),
  files: z.array(fileSchema).max(5).nonempty()
})

const CreateSnipPage = () => {
  const [fileNames, setFileNames] = useState<string[]>([])

  const form = useForm<z.infer<typeof snipFormSchema>>({
    resolver: zodResolver(snipFormSchema)
  })

  const onSubmit = (data: z.infer<typeof snipFormSchema>) => {
    console.log("Form data:", data)
  }

  return (
    <div className="m-auto flex max-w-4xl flex-col gap-10 p-6">
      <h1 className="text-xl font-medium md:text-2xl">Create a new Snip</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Snip Description..."
                    {...field}
                    className="max-h-[400px] min-h-32"
                  />
                </FormControl>
                <FormDescription>Briefly describe what this snip is doing.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="files"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Files</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept=".js, .jsx, .ts, .tsx, .java, .py, .cpp, .c, .h, .html, .css, .scss, .php, .rb, .go, .rs, .swift, .kt, .json, .xml, .yaml, .md, .txt, !image/*, !.pdf"
                    onChange={(event) => {
                      const files = event.target.files ? Array.from(event.target.files) : []
                      setFileNames(files.map((file) => file.name))
                      field.onChange(files)
                    }}
                  />
                </FormControl>
                <FormDescription>Upload code files for the snip.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ul className="mt-8 flex flex-col gap-2 text-sm">
            {fileNames?.map((name, index) => <li key={index}>{name}</li>)}
          </ul>
          <Button type="submit" className="w-full">
            Create Snip
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateSnipPage
