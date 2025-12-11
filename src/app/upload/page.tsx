"use client";

import { useState } from "react";
import { Box, FileUpload, Flex, Icon, Input } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import TitleH1 from "../components/TitleH2";
import AppButton from "../components/AppButton";
import generatePublicMapUrl from "../../lib/generatePublicMapUrl";
import FormContainer from "../components/FormContainer";
import { saveMap } from "@/lib/mapService";

type Status = "idle" | "uploading" | "success" | "error";

interface ResponseUploadMapData {
  message: string;
  path?: string;
  error?: string;
}

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
    const mapName = formData.get("map_name") as string;

    if (!file || !(file instanceof File) || !mapName || mapName.trim() === "") {
      setStatus("error");
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      // Upload map image
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: ResponseUploadMapData = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.path) {
        setStatus("error");
        setMessage(
          data?.error || "Upload failed. Please try again in a few minutes."
        );
        return;
      }

      // Save map in the archive
      const mapUrl = await generatePublicMapUrl(data.path);
      saveMap(mapName, mapUrl);
      //console.log(mapName, mapUrl);

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
        <FormContainer>
          <Input placeholder="Map name" name="map_name" />

          <FileUpload.Root alignItems="stretch" maxFiles={1}>
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

          <AppButton type="submit" size="md" disabled={status === "uploading"}>
            {status === "uploading" ? "Uploading..." : "Load"}
          </AppButton>
        </FormContainer>
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
