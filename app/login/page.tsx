import { Suspense } from "react";
import { Space_Grotesk } from "next/font/google";

import { LoginView } from "./components/LoginView";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export default function LoginPage() {
	return (
		<main className={spaceGrotesk.className}>
			<Suspense fallback={null}>
				<LoginView />
			</Suspense>
		</main>
	);
}
