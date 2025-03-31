import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Media } from "~/graphql/__generated__/graphql";
import { PaginatedAnimeCarousel } from "./PaginatedAnimeCarousel";

const animeMedias: Media[] = [
	{
		id: 1,
		title: { romaji: "Anime 1", english: "Anime One" },
		coverImage: { large: "image1.jpg" },
		description: "Description for Anime 1",
		episodes: 12,
		seasonYear: 2021,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 2,
		title: { romaji: "Anime 2", english: "Anime Two" },
		coverImage: { large: "image2.jpg" },
		description: "Description for Anime 2",
		episodes: 24,
		seasonYear: 2020,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 3,
		title: { romaji: "Anime 3", english: "Anime Three" },
		coverImage: { large: "image3.jpg" },
		description: "Description for Anime 3",
		episodes: 13,
		seasonYear: 2019,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 4,
		title: { romaji: "Anime 4", english: "Anime Four" },
		coverImage: { large: "image4.jpg" },
		description: "Description for Anime 4",
		episodes: 26,
		seasonYear: 2018,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 5,
		title: { romaji: "Anime 5", english: "Anime Five" },
		coverImage: { large: "image5.jpg" },
		description: "Description for Anime 5",
		episodes: 12,
		seasonYear: 2017,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 6,
		title: { romaji: "Anime 6", english: "Anime Six" },
		coverImage: { large: "image6.jpg" },
		description: "Description for Anime 6",
		episodes: 24,
		seasonYear: 2016,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 7,
		title: { romaji: "Anime 7", english: "Anime Seven" },
		coverImage: { large: "image7.jpg" },
		description: "Description for Anime 7",
		episodes: 13,
		seasonYear: 2015,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 8,
		title: { romaji: "Anime 8", english: "Anime Eight" },
		coverImage: { large: "image8.jpg" },
		description: "Description for Anime 8",
		episodes: 26,
		seasonYear: 2014,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 9,
		title: { romaji: "Anime 9", english: "Anime Nine" },
		coverImage: { large: "image9.jpg" },
		description: "Description for Anime 9",
		episodes: 12,
		seasonYear: 2013,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
	{
		id: 10,
		title: { romaji: "Anime 10", english: "Anime Ten" },
		coverImage: { large: "image10.jpg" },
		description: "Description for Anime 10",
		episodes: 24,
		isFavourite: false,
		isFavouriteBlocked: false,
	},
];

describe("PaginatedAnimeCarousel", () => {
	it("renders the carousel with the given anime medias", () => {
		render(
			<PaginatedAnimeCarousel
				pageSize={10}
				loading={false}
				error={""}
				animeMedias={animeMedias}
				fetchOnScrollEnd={() => {}}
			/>,
		);

		expect(screen.getByText("Anime One")).toBeTruthy();
		expect(screen.getByText("Anime Six")).toBeTruthy();
	});
	it("renders error message when has an error prop", () => {
		render(
			<PaginatedAnimeCarousel
				pageSize={10}
				loading={false}
				error={"My Custom Error message"}
				animeMedias={[]}
				fetchOnScrollEnd={() => {}}
			/>,
		);

		expect(screen.getByText("Error: My Custom Error message")).toBeTruthy();
	});
	it("renders loading message when loading prop is true", () => {
		render(
			<PaginatedAnimeCarousel
				pageSize={10}
				loading={true}
				error={""}
				animeMedias={[]}
				fetchOnScrollEnd={() => {}}
			/>,
		);

		expect(screen.getByText("Loading...")).toBeTruthy();
	});
});
