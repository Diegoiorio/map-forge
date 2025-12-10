"use client";

import React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@/components/ui/color-mode";

export function ClientChakraProvider({
  children,
  ...props
}: React.PropsWithChildren<ColorModeProviderProps>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props}>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
