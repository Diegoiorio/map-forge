import { Box, FileUpload, Icon } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import TitleH1 from "../components/TitleH1";

export default function Upload() {
  return (
    <div className="m-auto text-center">
      <TitleH1>Upload your map</TitleH1>

      <div className="flex justify-center items-center h-96 mt-8">
        <FileUpload.Root
          className="m-auto"
          maxW="xl"
          alignItems="stretch"
          maxFiles={1}
        >
          <FileUpload.HiddenInput />
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
    </div>
  );
}
