"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const CreateSnipPage = () => {
  return (
    <div className="m-auto flex max-w-4xl flex-col gap-10 p-6">
      <h1 className="text-xl font-medium md:text-2xl">Create a new Snip</h1>
      <div className="flex flex-col gap-4">
        <Label htmlFor="snip-description">Description</Label>
        <Textarea
          id="snip-description"
          placeholder="Snip description..."
          className="max-h-[400px] min-h-32"
        />
      </div>

      <Button variant="default" size="lg">
        Create Snip
      </Button>
    </div>
  )
}

export default CreateSnipPage
