import { Alert, Container, Stack } from "@chakra-ui/react";

type HomePageProps = {
  searchParams: Promise<{ deletedMap?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const sp = await searchParams; // <-- unwrap
  const deleteMapRes = sp.deletedMap; // "1" | "0" | undefined
  const deleteMapSuccess = deleteMapRes === "1";

  const deleteMapAlert = (deleteMapRes: boolean) => {
    const message = deleteMapRes
      ? "The map has been deleted successfully"
      : "Failure to delete map";

    const status = deleteMapRes ? "success" : "error";

    return (
      <Stack gap="4" width="full">
        <Alert.Root status={status}>
          <Alert.Indicator />
          <Alert.Title>{message}</Alert.Title>
        </Alert.Root>
      </Stack>
    );
  };

  return (
    <Container maxW={"2xl"}>
      <div>
        {deleteMapRes !== undefined ? deleteMapAlert(deleteMapSuccess) : null}
      </div>
    </Container>
  );
}
