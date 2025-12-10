"use client";

import { useState } from "react";
import { Box, FileUpload, Icon } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import TitleH1 from "../components/TitleH1";
import AppButton from "../components/AppButton";

type Status = "idle" | "uploading" | "success" | "error";

export default function Upload() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("uploading");
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      setStatus("error");
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setMessage(
          data?.error || "Upload failed. Please try again in a few minutes."
        );
        return;
      }

      setStatus("success");
      setMessage("Upload successful!");

      // Optional: clear the file input / list
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Unexpected error while uploading. Please try again.");
    }
  };

  return (
    <div className="m-auto text-center">
      <TitleH1>Upload your map</TitleH1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-center items-center !mb-4 mt-4">
          <FileUpload.Root
            className="m-auto"
            maxW="xl"
            alignItems="stretch"
            maxFiles={1}
          >
            <FileUpload.HiddenInput name="file" />
            <FileUpload.Dropzone>
              <Icon size="md" color="fg.muted">
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop your map here</Box>
                <Box color="fg.muted">.png, .jpg</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List />
          </FileUpload.Root>
        </div>
        <AppButton type="submit" size="md" disabled={status === "uploading"}>
          {status === "uploading" ? "Uploading..." : "Load"}
        </AppButton>
      </form>

      {message && (
        <p
          className={`mt-4 ${
            status === "success" ? "text-green-500" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
