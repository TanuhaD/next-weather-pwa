import { WeatherForOneDay } from "@/types/weatherAPI";

export const getUniqueDate = (dt: number) => {
	return new Date(dt * 1000).toISOString().split("T")[0];
};

export const getUniqueDatesFromList = (list: WeatherForOneDay[]): string[] => {
	const dates = list.map((item: WeatherForOneDay) => getUniqueDate(item.dt));
	const uniqueDates: string[] = [];
	new Set(dates).forEach((date) => uniqueDates.push(date));
	return uniqueDates;
};
