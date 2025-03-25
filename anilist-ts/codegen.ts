import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "https://graphql.anilist.co",
	documents: ["src/**/*.tsx"],
	generates: {
		"./app/graphql/__generated__/": {
			preset: "client",
			plugins: [],
			presetConfig: {
				gqlTagName: "gql",
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
