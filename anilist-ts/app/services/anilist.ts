import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	gql,
} from "@apollo/client";

// Initialize Apollo client
export const anilistServerClient = new ApolloClient({
	ssrMode: true, // Indicates that we want to use server side rendering
	link: createHttpLink({
		// Use createHttpLink instead of uri
		uri: "https://graphql.anilist.co",
		headers: {
			"Access-Control-Allow-Origin": "*", //Cors management
		},
	}),
	cache: new InMemoryCache(), // Cache management
});

export const GET_MOST_POPULAR_PAGE = gql`
  query($page: Int) {
    Page(page: $page, perPage: 10) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        title {
          english
        }
        description
        coverImage {
          medium
          color
        }
      }
    }
  }`;
