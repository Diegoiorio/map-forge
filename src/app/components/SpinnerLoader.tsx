import { Flex, Spinner } from "@chakra-ui/react";

type SpinnerSize = "sm" | "md" | "lg" | "xl" | "inherit" | "xs" | undefined;

type SpinnerLoaderProps = {
  size?: SpinnerSize;
};

export default function SpinnerLoader({ size = "xl" }: SpinnerLoaderProps) {
  return (
    <Flex justify="center" align="center" minH="100px">
      <Spinner color="teal.500" size={size} />
    </Flex>
  );
}
