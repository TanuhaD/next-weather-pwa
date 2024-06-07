"use client";
import { cn } from "@/utils/cn";
import { FC, useCallback, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { debounce } from "../../utils/debounce";
import { CitiesListServerResponse } from "@/app/api/get-city-list-by-query/route";
import { City } from "@/types/weatherAPI";
interface SearchBoxProps {
	query: string;
	setQuery: (query: string) => void;
	setCitiesListServerResponse: (citiesList: City[]) => void;
	handleSearchRequest: (e: React.FormEvent<HTMLFormElement>) => void;
	setShowSuggestions: (show: boolean) => void;
}

function SubmitButton() {
	return (
		<button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-500  h-full">
			<IoSearch />
		</button>
	);
}

const SearchBox: FC<SearchBoxProps> = ({
	query,
	setQuery,
	setCitiesListServerResponse,
	handleSearchRequest,
	setShowSuggestions,
}) => {
	const router = useRouter();

	// eslint-disable-next-line
	const debouncedFetchCityList: (query: string) => void = useCallback(
		debounce(async (query) => {
			if (query.length < 2) return;
			try {
				const response = await fetch(
					`/api/get-city-list-by-query?query=${query}`
				);
				const resData = (await response.json()) as CitiesListServerResponse;

				if (resData.error) {
					setCitiesListServerResponse([]);
					return;
				}
				if (resData?.cities) {
					setCitiesListServerResponse(resData.cities);
				}
			} catch (error) {
				console.log(error);
			}
		}, 500),
		[]
	);

	async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setQuery(e.target.value);
		debouncedFetchCityList(e.target.value);
		if (e.target.value.length < 2) {
			setShowSuggestions(false);
			setCitiesListServerResponse([]);
		} else {
			setShowSuggestions(true);
		}
	}

	return (
		<form
			className={cn("flex relative justify-center items-center h-10")}
			onSubmit={handleSearchRequest}>
			<input
				value={query}
				onChange={handleInputChange}
				type="text"
				className=" border border-gray-300 rounded-l-md px-4 py-2 w-[230px] focus:outline-none focus:border-blue-500 h-full"
				placeholder="Search location"
			/>
			<p className="sr-only " role="status" aria-live="polite">
				{query}
			</p>
			<SubmitButton />
		</form>
	);
};

export default SearchBox;
