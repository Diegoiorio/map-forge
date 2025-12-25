"use client";

import { useState } from "react";
import { Button, Input, Box, Text } from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function UnlockClient() {
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/";

  async function submit() {
    setLoading(true);
    setErr("");

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) {
        setErr("Codice non valido.");
        return;
      }

      router.replace(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box maxW="sm" mx="auto" mt="24" p="6" borderWidth="1px" borderRadius="xl">
      <Text fontSize="lg" fontWeight="bold" mb="3">
        Accesso riservato
      </Text>

      <Input
        placeholder="Inserisci ACCESS_KEY"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        mb="3"
      />

      {err && (
        <Text color="red.500" mb="3">
          {err}
        </Text>
      )}

      <Button onClick={submit} loading={loading} width="100%">
        Entra
      </Button>
    </Box>
  );
}
