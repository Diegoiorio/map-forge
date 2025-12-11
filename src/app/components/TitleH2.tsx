import { Heading } from "@chakra-ui/react";

export default function TitleH1(props: { children: React.ReactNode }) {
  return (
    <Heading as="h2" size="3xl">
      {props.children}
    </Heading>
  );
}
