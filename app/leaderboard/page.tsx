import { Lexend } from "next/font/google";

import { LeaderboardView } from "./components/LeaderboardView";

const lexend = Lexend({
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
});

export default function LeaderboardPage() {
	return (
		<main className={lexend.className}>
			<LeaderboardView />
		</main>
	);
}
