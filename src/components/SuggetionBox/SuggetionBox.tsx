import { City } from "@/types/weatherAPI";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import css from "./SuggestionBox.module.css";
import { deleteCookie, setCookie } from "@/utils/cookies";

interface SuggetionBoxProps {
	citiesListServerResponse: City[];
	query: string;
	setQuery: (query: string) => void;
	setShowSuggestions: (show: boolean) => void;
}

const SuggetionBox: FC<SuggetionBoxProps> = ({
	citiesListServerResponse,
	query,
	setQuery,
	setShowSuggestions,
}) => {
	const router = useRouter();
	const sortAtSitiesListServerResponse = citiesListServerResponse.sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isClickInside = target?.closest("#suggestion-box");
			if (!isClickInside) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [setShowSuggestions]);

	return (
		<ul
			id="suggestion-box"
			className={`h-[400px] overflow-y-auto mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2 ${css.heightControl}`}>
			{sortAtSitiesListServerResponse.length < 1 && (
				<li className="text-red-500 p-1 "> Error</li>
			)}

			{sortAtSitiesListServerResponse.map(
				({ apiCityId, name, country, state }) => (
					<li
						key={apiCityId}
						onClick={() => {
							setQuery(name);
							setShowSuggestions(false);
							deleteCookie({ name: "city" });
							setCookie({
								name: "apiCityId",
								value: apiCityId.toString(),
								days: 7,
							});
							router.push(`/?apiCityId=${apiCityId}`);
						}}
						className="cursor-pointer p-1 rounded   hover:bg-gray-200">
						{name}, {country}
						{state ? `, ${state}` : ""}
					</li>
				)
			)}
		</ul>
	);
};

export default SuggetionBox;
