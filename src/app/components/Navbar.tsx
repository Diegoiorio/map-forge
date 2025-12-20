"use client";

import { Box, Flex, Icon, Collapsible } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useViewMode } from "../providers/ViewModeProvider";

interface NavLink {
  href: string;
  label: string;
  behavior?: "link" | "openPopup";
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", behavior: "link" },
  { href: "/open", label: "Open maps", behavior: "openPopup" },
  { href: "/upload", label: "New map", behavior: "link" },
];

export default function Navbar() {
  const [open, setOpen] = useState(true);
  const { resetViewMode } = useViewMode();

  return (
    <Box mb="4" position={"relative"} zIndex={1000}>
      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Collapsible.Content>
          <Box
            maxW="xl"
            m="auto"
            mt="1"
            p="3"
            borderWidth="1px"
            borderBottomEndRadius={"3xl"}
            borderTopLeftRadius={"3xl"}
            backgroundColor="blackAlpha.900"
          >
            <Flex
              gap="0"
              direction="row"
              justify={"space-around"}
              align={"center"}
            >
              {NAV_LINKS.map((link) => {
                if (link.behavior === "openPopup") {
                  return (
                    <Box
                      key={link.href}
                      as="button"
                      onClick={() => resetViewMode("mapList")}
                      _hover={{ textDecoration: "none", opacity: 0.7 }}
                      style={{ marginRight: 16 }}
                    >
                      {link.label}
                    </Box>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ marginRight: 16 }}
                    _hover={{ textDecoration: "none", opacity: 0.7 }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </Flex>
          </Box>
        </Collapsible.Content>
        <Flex direction="row" justify={"center"} align={"center"}>
          <Collapsible.Trigger>
            <Box
              borderWidth="1px"
              pl="12"
              pr="12"
              m="auto"
              maxH={"4"}
              borderBottomRadius={"4xl"}
              cursor={"pointer"}
              backgroundColor="blackAlpha.900"
            >
              <Icon size="sm" mt="-3">
                {open ? <LuChevronUp /> : <LuChevronDown />}
              </Icon>
            </Box>
          </Collapsible.Trigger>
        </Flex>
      </Collapsible.Root>
    </Box>
  );
}
