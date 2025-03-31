import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";

import { useEffect, useState } from "react";
import type { Media } from "~/graphql/__generated__/graphql";

type PaginatedAnimeCarouselProps = {
	pageSize: number;
	loading: boolean;
	error: string | undefined;
	animeMedias: Media[];
	fetchOnScrollEnd: (page: number) => void;
};

export function PaginatedAnimeCarousel({
	pageSize,
	loading,
	error,
	animeMedias,
	fetchOnScrollEnd,
}: PaginatedAnimeCarouselProps) {
	const [api, setApi] = useState<CarouselApi>();

	useEffect(() => {
		if (!api) {
			return;
		}

		const handleSelect = () => {
			if (!api) return;

			if (api.scrollProgress() >= 0.7) {
				const nextPage = Math.ceil(api.slideNodes().length / pageSize) + 1;
				fetchOnScrollEnd(nextPage);
			}
		};

		api.on("settle", handleSelect);

		return () => {
			api.off("settle", handleSelect);
		};
	}, [api, fetchOnScrollEnd, pageSize]);

	if (loading && !api?.scrollProgress())
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Loading...</p>
			</div>
		);
	if (error)
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Error: {error}</p>
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
				{animeMedias?.map((anime) => (
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
