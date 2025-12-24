import {
  Alert,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

type HomePageProps = {
  searchParams: Promise<{ deletedMap?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  const deleteMapRes = sp.deletedMap; // "1" | "0" | undefined
  const deleteMapSuccess = deleteMapRes === "1";

  const deleteMapAlert = (success: boolean) => {
    const message = success
      ? "The map has been deleted successfully"
      : "Failure to delete map";

    const status = success ? "success" : "error";

    return (
      <Stack gap="4" width="full" mb="6">
        <Alert.Root status={status} borderRadius="2xl">
          <Alert.Indicator />
          <Alert.Title>{message}</Alert.Title>
        </Alert.Root>
      </Stack>
    );
  };

  return (
    <Container maxW="4xl" py={{ base: 8, md: 14 }}>
      {deleteMapRes !== undefined ? deleteMapAlert(deleteMapSuccess) : null}

      {/* HERO */}
      <Box
        borderWidth="1px"
        borderRadius="3xl"
        overflow="hidden"
        boxShadow="sm"
      >
        <Box
          px={{ base: 6, md: 10 }}
          py={{ base: 8, md: 12 }}
          bgGradient="linear(to-br, gray.50, gray.100)"
        >
          <Stack gap="5">
            <HStack gap="2" flexWrap="wrap">
              <Badge borderRadius="full" px="3" py="1">
                Next.js
              </Badge>
              <Badge borderRadius="full" px="3" py="1">
                Chakra UI
              </Badge>
              <Badge borderRadius="full" px="3" py="1">
                Maps + Markers
              </Badge>
              <Badge borderRadius="full" px="3" py="1">
                PDF export
              </Badge>
            </HStack>

            <Heading size={{ base: "xl", md: "2xl" }} letterSpacing="-0.02em">
              MapForge
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} maxW="2xl">
              Upload a map image, drop custom markers, write notes and lore, and
              keep a searchable archive of your worlds. When you’re ready,
              export everything as a neat PDF.
            </Text>

            <Flex gap="3" flexWrap="wrap">
              <Button asChild size="lg" variant="outline" borderRadius="2xl">
                <Link href="/upload">Upload a map</Link>
              </Button>

              <Button asChild size="lg" variant="outline" borderRadius="2xl">
                <Link href="/open">Open archive</Link>
              </Button>
            </Flex>

            <Text fontSize="sm" opacity={0.8}>
              Tip: use short marker titles (e.g. “Old Well”, “Broken Gate”) and
              put the story in the description.
            </Text>
          </Stack>
        </Box>

        {/* FEATURE CARDS */}
        <Box px={{ base: 6, md: 10 }} py={{ base: 8, md: 10 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            <FeatureCard
              title="1) Upload your map"
              description="PNG/JPG/JPEG — perfect for dungeons, regions, city plans, or campaign worlds."
              badge="Images"
            />
            <FeatureCard
              title="2) Place markers"
              description="Click to add points of interest. Move, edit, or delete them anytime."
              badge="Markers"
            />
            <FeatureCard
              title="3) Write details"
              description="Give each marker a title + description: lore, NPCs, treasure, traps, clues."
              badge="Notes"
            />
            <FeatureCard
              title="4) Export to PDF"
              description="Download a printable PDF with the map and a clean list of marker descriptions."
              badge="PDF"
            />
          </SimpleGrid>

          {/* BACKLOG / SMALL FOOTER */}
          <Box mt="8" borderTopWidth="1px" pt="6">
            <Stack gap="2">
              <Text fontWeight="semibold">Backlog (next ideas)</Text>
              <Text fontSize="sm" opacity={0.8}>
                • Add a link to navigate to the map view after upload
                <br />
                • Display marker titles directly on the map in exported PDFs
                <br />• Improve the home page with a short introduction and
                usage explanation
              </Text>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function FeatureCard(props: {
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      p="5"
      _hover={{ transform: "translateY(-1px)" }}
      transition="transform 0.15s ease"
      bg="white"
      color={"black"}
    >
      <Stack gap="3">
        <HStack justify="space-between" align="start">
          <Text fontWeight="semibold">{props.title}</Text>
          <Badge borderRadius="full" px="3" py="1" variant="subtle">
            {props.badge}
          </Badge>
        </HStack>
        <Text opacity={0.8}>{props.description}</Text>
      </Stack>
    </Box>
  );
}
