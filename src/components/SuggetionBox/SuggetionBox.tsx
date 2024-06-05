import { City } from "@/types/weatherAPI";
import { useRouter } from "next/navigation";
import { FC } from "react";
import css from "./SuggestionBox.module.css";

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

	return (
		<ul
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
