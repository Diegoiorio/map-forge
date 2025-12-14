import { Box } from "@chakra-ui/react";

export default function MapNameLabel(props: { imageName: string }) {
  return (
    <Box
      fontSize="sm"
      opacity={0.8}
      position={"absolute"}
      top={5}
      left={10}
      zIndex={500}
      pl={3}
      pr={3}
      backgroundColor="blackAlpha.900"
      borderRadius={"lg"}
    >
      {props.imageName}
    </Box>
  );
}
