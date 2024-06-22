"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { useUser } from "@clerk/nextjs"
import CloudinaryWidget from "@/components/custom/cloudinary-widget"

const snipFormSchema = z.object({
  description: z.string().min(5).max(200)
})

const CreateSnipPage = () => {
  const [fileNames, setFileNames] = useState<string[]>([])
  const [cloudinaryResult, setCloudinaryResult] = useState<{ [key: string]: any }>({})
  const [snipUrls, setSnipUrls] = useState<string[]>([])

  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress || ""

  const fileUploadSuccess = cloudinaryResult?.event === "success"

  const form = useForm<z.infer<typeof snipFormSchema>>({
    resolver: zodResolver(snipFormSchema)
  })

  useEffect(() => {
    if (cloudinaryResult?.event === "success") {
      const newFile = {
        name: cloudinaryResult.info.original_filename,
        size: cloudinaryResult.info.bytes,
        type: cloudinaryResult.info.format,
        lastModified: Date.now()
      }

      setSnipUrls((prev) => [...prev, cloudinaryResult?.info?.secure_url])
      setFileNames((prev) => [...prev, cloudinaryResult?.info?.original_filename])
    }
  }, [cloudinaryResult, form])

  const onSubmit = async (data: z.infer<typeof snipFormSchema>) => {
    if (fileUploadSuccess) {
      try {
        const res = await fetch("/api/createSnip", {
          method: "POST",
          body: JSON.stringify({
            description: data?.description,
            snipUrls: snipUrls,
            createdAt: new Date().toISOString(),
            email: email
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
      } catch (error) {
        console.error("An error occurred while creating snip:", error)
      }
    }
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
          <div className="flex flex-col gap-2">
            <CloudinaryWidget setCloudinaryResult={setCloudinaryResult} />
            {fileUploadSuccess ? (
              <p className="text-sm text-green-500">Following files are uploaded successfully</p>
            ) : (
              <p className="text-sm text-red-500">Files are Required</p>
            )}
          </div>
          {fileNames?.length > 0 && (
            <ul className="mt-8 flex w-fit flex-col gap-2 rounded-md bg-gray-50 p-2 text-sm dark:bg-gray-900">
              {fileNames?.map((name, index) => <li key={index}>{name}</li>)}
            </ul>
          )}
          <Button type="submit" disabled={!fileUploadSuccess} className="w-full">
            Create Snip
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateSnipPage
