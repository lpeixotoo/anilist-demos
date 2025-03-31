import { useQuery } from "@apollo/client";
import type { MetaFunction } from "@remix-run/node";
import { PaginatedAnimeCarousel } from "~/components/ui/PaginatedAnimeCarousel";
import { GET_SORTED_MEDIA_PAGE } from "~/services/anilist";

export const meta: MetaFunction = () => {
	return [
		{ title: "Anime List Home Page" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

const PAGE_SIZE = 10;

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
		notifyOnNetworkStatusChange: true,
	});

	const handleFetchMore = (page: number) => {
		fetchMore({
			variables: {
				page,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return {
					...fetchMoreResult,
					Page: {
						...fetchMoreResult.Page,
						media: [...prev.Page.media, ...fetchMoreResult.Page.media],
					},
				};
			},
		});
	};

	return (
		<PaginatedAnimeCarousel
			pageSize={PAGE_SIZE}
			loading={loading}
			error={error?.message}
			animeMedias={mostPopularAnime?.Page?.media ?? []}
			fetchOnScrollEnd={handleFetchMore}
		/>
	);
}
