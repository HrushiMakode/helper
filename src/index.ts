import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Query {
		books: [Book]
	}
`;

const books = [
	{
		title: "The Awakening",
		author: "Kate Chopin",
	},
	{
		title: "City of Glass",
		author: "Paul Auster",
	},
];

const resolvers = {
	Query: {
		books: () => books,
	},
};

const PORT = process.env.PORT || "4000";
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then((res) => {
    server.applyMiddleware({ app });
	app.listen({ port: PORT }, () => {
		console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
