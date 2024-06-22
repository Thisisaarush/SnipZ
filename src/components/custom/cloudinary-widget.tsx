import React from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"

interface CloudinaryWidgetProps {
  setCloudinaryResult: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any
    }>
  >
}

const CloudinaryWidget: React.FC<CloudinaryWidgetProps> = ({ setCloudinaryResult }) => {
  return (
    <CldUploadWidget
      options={{
        sources: ["local", "url"],
        multiple: true,
        maxFiles: 5,
        maxFileSize: 200 * 1024,
        folder: "snipz"
      }}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result, { widget }) => {
        console.log("Cloudinary result:", result)
        setCloudinaryResult(result)
        widget.close()
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setCloudinaryResult({})
          open()
        }
        return (
          <Button variant={"outline"} onClick={handleOnClick}>
            Upload your code files
          </Button>
        )
      }}
    </CldUploadWidget>
  )
}

export default CloudinaryWidget
