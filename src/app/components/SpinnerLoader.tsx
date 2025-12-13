import { Flex, Spinner } from "@chakra-ui/react";

export default function SpinnerLoader() {
  return (
    <Flex justify="center" align="center" minH="100px">
      <Spinner color="teal.500" size="xl" />
    </Flex>
  );
}
