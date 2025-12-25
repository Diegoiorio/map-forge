import { Suspense } from "react";
import UnlockClient from "../components/UnlockClient";

export default function UnlockPage() {
  return (
    <Suspense fallback={null}>
      <UnlockClient />
    </Suspense>
  );
}
