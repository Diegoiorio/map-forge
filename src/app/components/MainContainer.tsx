"use client";

import { Container } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { ViewModeProvider } from "../providers/ViewModeProvider";
import OpenMapPopup from "./OpenMapDialog";

export default function MainContainer(props: { children: React.ReactNode }) {
  return (
    <Container maxW="100vw" p={0} m={0} minH="100vh">
      <ViewModeProvider>
        <Navbar />
        <OpenMapPopup />
        {props.children}
      </ViewModeProvider>
    </Container>
  );
}
