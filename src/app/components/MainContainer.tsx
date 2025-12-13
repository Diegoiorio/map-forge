"use client";

import { Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function MainContainer(props: { children: React.ReactNode }) {
  return (
    <Container>
      <Navbar />
      {props.children}
    </Container>
  );
}
