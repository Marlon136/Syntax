import { Lexend } from "next/font/google";

import { LearningPathView } from "./components/LearningPathView";

const lexend = Lexend({
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
});

export default function LearningPathPage() {
	return (
		<main className={lexend.className}>
			<LearningPathView />
		</main>
	);
}
