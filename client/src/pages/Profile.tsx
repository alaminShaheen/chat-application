import { useAppContext } from "contexts/AppContext";

export const Profile = () => {
	const { userAuthenticationData } = useAppContext();
	return (
		<section className="w-full overflow-y-auto">
			{/*<div className="bg-gray-200 font-sans w-full flex flex-row justify-center items-center">*/}
			{/*	<div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">*/}
			{/*		<img*/}
			{/*			className="w-32 mx-auto rounded-full border-8 border-white"*/}
			{/*			src="https://avatars.githubusercontent.com/u/67946056?v=4"*/}
			{/*			alt=""*/}
			{/*		/>*/}
			{/*		<div className="text-center mt-2 text-3xl font-medium">Ajo Alex</div>*/}
			{/*		<div className="text-center mt-2 font-light text-sm">@devpenzil</div>*/}
			{/*		<div className="text-center font-normal text-lg">Kerala</div>*/}
			{/*		<div className="px-6 text-center mt-2 font-light text-sm">*/}
			{/*			<p>Front end Developer, avid reader. Love to take a long walk, swim</p>*/}
			{/*		</div>*/}
			{/*		<hr className="mt-8" />*/}
			{/*		<div className="flex p-4">*/}
			{/*			<div className="mx-auto text-center">*/}
			{/*				<span className="font-bold">1.8 k</span> Friends*/}
			{/*			</div>*/}
			{/*			/!*<div className="w-0 border border-gray-300"></div>*!/*/}
			{/*			/!*<div className="w-1/2 text-center">*!/*/}
			{/*			/!*	<span className="font-bold">2.0 k</span> Following*!/*/}
			{/*			/!*</div>*!/*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}

			<div className="sm:mx-32 lg:mx-32 xl:mx-72 px-40 py-10 ">
				<div className="flex justify-between container mx-auto">
					<div className="w-full">
						<div className="mt-4 px-4">
							<h1 className="text-3xl font-semibold py-7 px-5">My Profile</h1>
							<h1 className="font-thinner flex text-2xl pt-10 px-5">
								@<span>{userAuthenticationData.user.username}</span>
							</h1>

							<form className="mx-5 my-5">
								<label
									className="relative block p-3 border-2 border-black rounded"
									htmlFor="name"
								>
									<span className="text-md font-semibold text-zinc-900">
										Name
									</span>
									<input
										className="w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none"
										id="name"
										type="text"
										placeholder="Your name"
									/>
								</label>
								<div className="mt-5">
									<label className="input-field inline-flex items-baseline border-2 border-black rounded  p-4">
										<span className="flex-none text-dusty-blue-darker select-none leading-none">
											addby.me/
										</span>
										<div className="flex-1 leading-none">
											<input
												id="handle"
												type="text"
												className="w-full pl-1 bg-transparent focus:outline-none"
												name="handle"
												placeholder="username"
											/>
										</div>
									</label>
								</div>

								<div className="shrink-0 mt-5">
									<img
										className="h-20 w-20 object-cover rounded-full"
										src="https://sahilnetic.xyz/sahilnetic.png"
										alt="Current profile photo"
									/>
								</div>
								<label className="block pt-2">
									<span className="sr-only t-2">Choose profile photo</span>
									<input
										type="file"
										className="w-full text-sm text-slate-500 mr-4 py-2 px-4 rounded-full border-0 text-sm font-semibold bg-pink-300 text-zinc-900 hover:bg-rose-300"
									/>
								</label>

								<label
									className="relative block p-3 border-2 mt-5 border-black rounded"
									htmlFor="name"
								>
									<span className="text-md font-semibold text-zinc-900">Bio</span>
									<input
										className="w-full   p-0 text-sm border-none bg-transparent text-gray-500 focus:outline-none"
										id="name"
										type="text"
										placeholder="Write Your Bio"
									/>
								</label>

								<label
									className="relative block p-3 border-2  mt-5 border-black rounded"
									htmlFor="name"
								>
									<span className="text-md font-semibold  text-zinc-900">
										Upi Id
									</span>

									<input
										className="w-full read-only:bg-zinc-800  p-0 text-sm bg-transparent text-gray-500 focus:outline-none"
										id="name"
										type="text"
										placeholder="ie : lisa859sh@okaxis"
									/>
									<button className="font-medium bg-blue-500 px-2 text-white text-sm rounded-md">
										learn more
									</button>
								</label>

								<label
									className="relative block p-3 border-2 mt-5 border-black rounded"
									htmlFor="name"
								>
									<span className="text-md font-semibold  text-zinc-900">
										Paypal Me
									</span>

									<input
										className="w-full read-only:bg-zinc-800  p-0 text-sm bg-transparent text-gray-500 focus:outline-none"
										id="name"
										type="text"
										placeholder="ie : paypal.me/yubashika"
									/>
									<button className="font-medium bg-blue-500 px-2 text-white text-sm rounded-md">
										learn more
									</button>
								</label>

								<h1 className="text-2xl font-semibold mt-5">Category :</h1>
								<p className="text-black text-sm font-normal flex gap gap-2 pt-2">
									<button className="border-2 border-black rounded-md border-b-4 border-l-4 font-black px-2">
										Business
									</button>
									<button className="border-2 border-black rounded-md border-b-4 border-l-4 font-black px-2">
										Creative
									</button>
									<button className="border-2 border-black rounded-md border-b-4 border-l-4 font-black px-2">
										Education
									</button>
								</p>

								<p className="text-black text-sm font-normal flex gap gap-2 pt-2">
									<button className="border-2 border-black rounded-md border-b-4 border-l-4 font-black px-2">
										Tech
									</button>
									<button className="border-2 border-black rounded-md border-b-4 border-l-4 font-black px-2">
										Entertainment
									</button>
									<button className="border-2 border-black rounded-md border-b-4 border-l-4 font-black px-2">
										Other
									</button>
								</p>

								<button className="mt-5 border-2 px-5 py-2 rounded-lg border-black border-b-4 font-black translate-y-2 border-l-4">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
