import type { MetaFunction } from "@remix-run/node";
import AnimeList from "~/components/ui/AnimeList";

export const meta: MetaFunction = () => {
	return [
		{ title: "Anime List Home Page" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return <AnimeList />;
}
