"use client"

import { useCallback, useEffect, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"

import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"
import { Card, CardContent } from "../ui/card"
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState"

interface UploaderState {
  id: string | null
  file: File | null
  uploading: boolean
  progress: number
  key?: string
  isDeleting: boolean
  error: boolean
  objectUrl?: string
  fileType: "image" | "video"
}
const Uploader = () => {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
  })

  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }))

    try {
      //1. Get presigned URL
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      })
      if (!presignedResponse.ok) {
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }))
        toast.error("Failed to get presigned URL")
        return
      }
      const { presignedUrl, key } = await presignedResponse.json()

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }))
          }
        }
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key: key,
            }))
            toast.success("File uploaded successfully")
            resolve()
          } else {
            reject(new Error("Upload failed..."))
          }
        }
        xhr.onerror = () => {
          reject(new Error("Upload failed."))
        }
        xhr.open("PUT", presignedUrl)
        xhr.setRequestHeader("Content-Type", file.type)
        xhr.send(file)
      })
    } catch (error) {
      console.error("Upload Error:", error)
      toast.error("Something went wrong 02")
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error: true,
        uploading: false,
      }))
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl)
        }
        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
        })
        uploadFile(file)
      }
    },
    [fileState.objectUrl]
  )
  const handleRemoveFile = async () => {
    if (fileState.isDeleting || !fileState.objectUrl) return
    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }))
      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: fileState.key,
        }),
      })
      if (!response.ok) {
        toast.error("Failed to remove file form storage")
        setFileState((prev) => ({
          ...prev,
          isDeleting: true,
          error: true,
        }))
        return
      }
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl)
      }
      setFileState(() => ({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: "image",
        id: null,
        isDeleting: false,
      }))
      toast.success("File removed successfully")
    } catch {
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }))
      toast.error("Error removing file , Please try again")
    }
  }
  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      )
      if (tooManyFiles) {
        toast.error("Too many files selection, max is 1")
      }
      const fileSizeToBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      )
      if (fileSizeToBig) {
        toast.error("File Size exceeds the limit 5mb")
      }
    }
  }
  const renderContent = () => {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          file={fileState.file as File}
          progress={fileState.progress}
        />
      )
    }
    if (fileState.error) {
      return <RenderErrorState />
    }
    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          handleRemoveFile={handleRemoveFile}
          isDeleting={fileState.isDeleting}
        />
      )
    }
    return <RenderEmptyState isDragActive={isDragActive} />
  }
  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl)
      }
    }
  }, [fileState.objectUrl])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5mb
    onDropRejected: rejectedFiles,
    disabled: fileState.uploading || !!fileState.objectUrl
  })

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-60 cursor-pointer border-2 border-dashed p-10 text-center transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/25"
      )}
    >
      <input {...getInputProps()} />

      <CardContent className="flex items-center justify-center p-0">
        {renderContent()}
      </CardContent>
    </Card>
  )
}

export default Uploader
