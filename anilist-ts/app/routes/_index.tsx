import type { MetaFunction } from "@remix-run/node";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

export const meta: MetaFunction = () => {
	return [
		{ title: "Anime List Home Page" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};
import { useQuery } from "@apollo/client";
import { GET_MOST_POPULAR_PAGE } from "~/services/anilist";

export default function Index() {
	const { loading, error, data } = useQuery(GET_MOST_POPULAR_PAGE, {
		variables: { page: 1 },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<Table>
			<TableCaption>A list of your favorite anime.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Title</TableHead>
					<TableHead>Director</TableHead>
					<TableHead>Producers</TableHead>
					<TableHead>Release Date</TableHead>
					<TableHead className="text-right">Episode</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((movie: any) => (
					<TableRow key={movie.id}>
						<TableCell className="font-medium">
							{movie.title ?? "No Title"}
						</TableCell>
						<TableCell>{movie.director ?? "No director"}</TableCell>
						<TableCell>{movie.producers ?? "No producers"}</TableCell>
						<TableCell>{movie.releaseDate ?? "No date"}</TableCell>
						<TableCell className="text-right">
							{movie.episodeID ?? "No episode"}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
