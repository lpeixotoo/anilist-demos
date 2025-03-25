/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

const anilistClient = new ApolloClient({
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
	uri: "https://graphql.anilist.co",
});

startTransition(() => {
	hydrateRoot(
		document,
		<ApolloProvider client={anilistClient}>
			<RemixBrowser />
		</ApolloProvider>,
	);
});
