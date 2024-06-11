"use client";

import { City, GetCityWithCoordsResponse } from "@/types/weatherAPI";
import { getCoords } from "@/utils/getCoords";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { Bounce, ToastContainer, toast } from "react-toastify";
import SuggetionBox from "../../components/SuggetionBox/SuggetionBox";
import SearchBox from "../SearchBox/SearchBox";
import "react-toastify/dist/ReactToastify.css";

interface NavBarProps {
	city?: string;
}

const NavBar = ({ city }: NavBarProps) => {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [citiesListServerResponse, setCitiesListServerResponse] = useState<
		City[]
	>([]);

	useEffect(() => {
		const isVisited = localStorage.getItem("isVisited");
		if (!isVisited) {
			toast("🦄 Hello!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
			});
			localStorage.setItem("isVisited", "true");
		}
	}, []);
	const [showSuggestions, setShowSuggestions] = useState(true);
	const handleGetCoordsClick = async () => {
		const coords = await getCoords();
		if (coords.error) {
			alert(coords.error);
			return;
		}
		const res = await fetch(
			`/api/get-city-with-coords?lat=${coords.lat}&lon=${coords.lon}`
		);
		const data: GetCityWithCoordsResponse = await res.json();
		if (data?.[0]?.state) {
			router.push(`/?city=${data[0].state}`);
		} else if (data?.[0]?.name) {
			router.push(`/?city=${data[0].name}`);
		}
	};

	const handleSearchRequest = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// const res = fetch(`/api/get-forecast?query=${query}`);
		router.push(`/?city=${query}`);
		setQuery("");
		setShowSuggestions(false);
	};
	return (
		<nav className="shadow-sm sticky top-0 left-0 z-50 bg-white flex ">
			<div className="min-h-[80px] w-full flex justify-center md:justify-between p-3  items-center max-w-7xl px-3 mx-auto  flex-col md:flex-row">
				<div className="flex items-center justify-center gap-2 ">
					<h2 className="text-gray-500 text-3xl">Weather</h2>
					<MdWbSunny className="mt-1 text-3xl text-yellow-300" />
				</div>
				<section className="flex gap-2 items-center">
					<button
						className="px-4 py-2 rounded-md focus:outline-none hover:bg-transparent"
						onClick={handleGetCoordsClick}>
						<MdMyLocation className="text-2xl text-gray-400 cursor-pointer hover:text-blue-500" />
					</button>

					<MdOutlineLocationOn className="text-3xl" />
					<p className="text-slate-900/80 text-sm">{city}</p>
				</section>
				<div className="relative">
					<SearchBox
						query={query}
						setQuery={setQuery}
						setCitiesListServerResponse={setCitiesListServerResponse}
						handleSearchRequest={handleSearchRequest}
						setShowSuggestions={setShowSuggestions}
					/>
					{showSuggestions && citiesListServerResponse.length >= 1 && (
						<SuggetionBox
							citiesListServerResponse={citiesListServerResponse}
							query={query}
							setQuery={setQuery}
							setShowSuggestions={setShowSuggestions}
						/>
					)}
				</div>
			</div>
			<ToastContainer />
		</nav>
	);
};

export default NavBar;
