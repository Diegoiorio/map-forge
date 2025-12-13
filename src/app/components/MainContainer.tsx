"use client";

import { Container } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { ViewModeProvider } from "../providers/ViewModeProvider";
import OpenMapPopup from "./OpenMapPopup";

export default function MainContainer(props: { children: React.ReactNode }) {
  return (
    <Container>
      <ViewModeProvider>
        <Navbar />
        <OpenMapPopup />
        {props.children}
      </ViewModeProvider>
    </Container>
  );
}
