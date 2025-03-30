import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";

import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import type { Media } from "~/graphql/__generated__/graphql";
import { GET_SORTED_MEDIA_PAGE } from "~/services/anilist";

export default function AnimeList() {
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
		notifyOnNetworkStatusChange: true,
	});
	const [api, setApi] = useState<CarouselApi>();

	useEffect(() => {
		if (!api) {
			return;
		}

		api.on("select", () => {
			console.log(api.scrollProgress());
			if (api.scrollProgress() >= 0.7) {
				fetchMore({
					variables: {
						page: api.slideNodes().length / 10 + 1,
					},
					updateQuery: (prev, { fetchMoreResult }) => {
						return fetchMoreResult
							? {
									...fetchMoreResult,
									Page: {
										...fetchMoreResult.Page,
										media: [...prev.Page.media, ...fetchMoreResult.Page.media],
									},
								}
							: prev;
					},
				});
			}
		});
	}, [api, fetchMore]);

	if (loading && !api?.scrollProgress())
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
			setApi={setApi}
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
