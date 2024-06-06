import { WeatherApiResponse } from "@/types/weatherAPI";

export const createListOfDatesOnePerDay = (data: WeatherApiResponse) => {
	const listOfAllDates = data?.list?.map((entry) => entry.dt_txt.split(" ")[0]);
	const uniqueDatesSet = new Set(listOfAllDates);
	const uniqueDates = Array.from(uniqueDatesSet);

	const listOfDatesOnePerDay = uniqueDates.map((date) => {
		const entryAfter12 = data?.list?.find((entry) => {
			const entryDate = entry.dt_txt.split(" ")[0];
			const entryTime = new Date(entry.dt * 1000).getHours();
			return entryDate === date && entryTime >= 12;
		});
		return entryAfter12;
	});

	listOfDatesOnePerDay.forEach((entry, i) => {
		if (!entry) {
			listOfDatesOnePerDay.splice(i, 1);
		}
	});

	return listOfDatesOnePerDay;
};
