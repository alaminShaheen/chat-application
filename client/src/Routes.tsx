import { Route } from "@tanstack/react-location";
import { GroupChat } from "pages/GroupChat";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { PersonalChat } from "pages/PersonalChat";
import { Profile } from "pages/Profile";
import { ProtectedRoutes } from "pages/ProtectedRoutes";
import { Register } from "pages/Register";
import { Search } from "pages/Search";
import React from "react";
import { RoutePaths } from "RoutePaths";

export const Routes: Route[] = [
	{ path: RoutePaths.LOGIN, element: <Login /> },
	{ path: RoutePaths.REGISTER, element: <Register /> },
	{
		path: RoutePaths.PROTECTED_ROUTES,
		element: <ProtectedRoutes />,
		children: [
			{
				path: RoutePaths.HOME,
				element: <Home />,
			},
			{
				path: RoutePaths.PROFILE,
				element: <Profile />,
			},
			{
				path: RoutePaths.SEARCH,
				element: <Search />,
			},
			{
				path: RoutePaths.GROUP_CHATS,
				element: <GroupChat />,
			},
			{
				path: RoutePaths.PERSONAL_CHATS,
				element: <PersonalChat />,
			},
		],
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
