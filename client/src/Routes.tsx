import { Route } from "@tanstack/react-location";
import { Login } from "pages/Login";
import { Register } from "pages/Register";
import React from "react";

export const Routes: Route[] = [
	{ path: "/", element: <Login /> },
	{ path: "register", element: <Register /> },
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
