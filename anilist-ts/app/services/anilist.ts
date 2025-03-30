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

export const GET_SORTED_MEDIA_PAGE = gql`
  query MostPopular ($page: Int, $pageSize: Int, $sortBy: [MediaSort], $sortType: MediaType) {
    Page(page: $page, perPage: $pageSize) {
      media(sort: $sortBy, type: $sortType) {
        title {
          english
        }
        description
        id
        coverImage {
          large
          color
        }
      }
      pageInfo {
        hasNextPage
        lastPage
        currentPage
      }
    }
  }`;
