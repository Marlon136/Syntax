import { Suspense } from "react";
import { Space_Grotesk } from "next/font/google";

import { RegisterView } from "./components/RegisterView";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RegisterPage() {
  return (
    <main className={spaceGrotesk.className}>
      <Suspense fallback={null}>
        <RegisterView />
      </Suspense>
    </main>
  );
}
