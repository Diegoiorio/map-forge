import { Container } from "@chakra-ui/react";

export default function MainContainer(props: { children: React.ReactNode }) {
  return <Container>{props.children}</Container>;
}
