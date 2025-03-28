import type { MetaFunction } from "@remix-run/node";
import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";

import { useQuery } from "@apollo/client";
import type { Media } from "~/graphql/__generated__/graphql";
import { GET_SORTED_MEDIA_PAGE } from "~/services/anilist";

export const meta: MetaFunction = () => {
	return [
		{ title: "Anime List Home Page" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	const {
		loading,
		error,
		data: mostPopularAnime,
		fetchMore,
	} = useQuery(GET_SORTED_MEDIA_PAGE, {
		variables: {
			page: 1,
			pageSize: 10,
			sortBy: "POPULARITY_DESC",
			sortType: "ANIME",
		},
	});

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Loading...</p>
			</div>
		);
	if (error)
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Error: {error.message}</p>
			</div>
		);

	return (
		<Carousel
			opts={{
				align: "start",
			}}
			className="w-full max-w-7xl mx-auto"
		>
			<CarouselContent className="flex">
				{mostPopularAnime?.Page?.media?.map((anime: Media) => (
					<CarouselItem
						key={anime?.id}
						className="md:basis-1/3 lg:basis-1/6 flex-shrink-0"
					>
						<div className="p-2">
							<Card className={`border-4 border-[${anime.coverImage?.color}]`}>
								<CardContent className="flex flex-col items-center justify-center">
									<img
										src={anime?.coverImage?.large}
										alt={anime?.title?.english || anime?.title?.romaji}
										className="h-48 rounded-md"
									/>
									<h3 className="mt-2 text-left text-sm font-semibold">
										{anime?.title?.english || anime?.title?.romaji}
									</h3>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
