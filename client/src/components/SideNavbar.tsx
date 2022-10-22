import { Link } from "@tanstack/react-location";
import chat from "assets/logo/animated-chat.gif";
import { useAppContext } from "contexts/AppContext";
import React from "react";
import { BiHomeAlt, BiMessageDetail, BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { toast } from "react-toastify";
import { RoutePaths } from "RoutePaths";

type SideNavbarProps = {
	onLogout: () => void;
};

export const SideNavbar = (props: SideNavbarProps) => {
	const { onLogout } = props;
	const { unAuthenticateUser } = useAppContext();

	const logoutUser = async () => {
		try {
			void onLogout();
			unAuthenticateUser();
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<aside className="w-[5rem] flex flex-col justify-between bg-gray-100 text-gray-700 shadow h-full px-3 py-6">
			<div className="flex items-center w-full">
				<Link className="h-12 w-12 mx-auto" to={RoutePaths.HOME}>
					<img className="h-full w-full" src={chat} alt="app logo" />
				</Link>
			</div>
			<ul className="flex flex-col items-center justify-center gap-5 border-t-2 border-b-2 py-5">
				<li className="hover:text-teal-700 px-3 py-2" title="Profile">
					<Link
						to={RoutePaths.PROFILE}
						getActiveProps={() => ({ className: "text-teal-700" })}
					>
						<CgProfile size={30} />
					</Link>
				</li>
				<li className="hover:text-teal-700 px-3 py-2" title="Search">
					<Link
						to={RoutePaths.SEARCH}
						getActiveProps={() => ({ className: "text-teal-700" })}
					>
						<BiSearch size={30} />
					</Link>
				</li>
				<li className="hover:text-teal-700 px-3 py-2" title="Personal Chats">
					<Link
						to={RoutePaths.PERSONAL_CHATS}
						getActiveProps={() => ({ className: "text-teal-700" })}
					>
						<BiMessageDetail size={30} />
					</Link>
				</li>
				<li className="hover:text-teal-700 px-3 py-2" title="Home">
					<Link
						to={RoutePaths.HOME}
						activeOptions={{ exact: true }}
						getActiveProps={() => ({ className: "text-teal-700" })}
					>
						<BiHomeAlt size={30} />
					</Link>
				</li>
				<li className="hover:text-teal-700 px-3 py-2" title="Group Chats">
					<Link
						to={RoutePaths.GROUP_CHATS}
						getActiveProps={() => ({ className: "text-teal-700" })}
					>
						<HiOutlineUserGroup size={30} />
					</Link>
				</li>
			</ul>
			<ul>
				<li className="cursor-pointer px-3 py-2" title="Logout" onClick={logoutUser}>
					<FiLogOut className="text-red-500" size={30} />
				</li>
			</ul>
		</aside>
	);
};
