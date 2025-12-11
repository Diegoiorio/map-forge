import { Box, Flex } from "@chakra-ui/react";

export default function FormContainer(props: { children: React.ReactNode }) {
  return (
    <Box
      maxW="lg"
      m="auto"
      mt="8"
      mb="4"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Flex gap="4" direction="column" align={"center"}>
        {props.children}
      </Flex>
    </Box>
  );
}
