import { Route } from "@tanstack/react-location";
import { ProtectedRoute } from "components/authentication/ProtectedRoute";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import React from "react";
import { RoutePaths } from "RoutePaths";

export const Routes: Route[] = [
	{ path: RoutePaths.LOGIN, element: <Login /> },
	{ path: RoutePaths.REGISTER, element: <Register /> },
	{
		path: RoutePaths.HOME,
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
	// {
	// 	path: "posts",
	// 	element: <Posts/>,
	// 	loader: async () => {
	// 		return {
	// 			posts: await fetchPosts(),
	// 		};
	// 	},
	// 	children: [
	// 		{ path: "/", element: <PostsIndex/> },
	// 		{
	// 			path: ":postId",
	// 			element: <Post/>,
	// 			loader: async ({ params: { postId } }) => {
	// 				return {
	// 					post: await fetchPostById(postId),
	// 				};
	// 			},
	// 		},
	// 	],
	// },
];
