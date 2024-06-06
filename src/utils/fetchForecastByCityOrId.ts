import { WeatherApiResponse } from "@/types/weatherAPI";

interface fetchForecastByCityOrIdParams {
	city?: string;
	apiCityId?: string;
}

export const fetchForecastByCityOrId = async ({
	city,
	apiCityId,
}: fetchForecastByCityOrIdParams): Promise<WeatherApiResponse | undefined> => {
	let data: WeatherApiResponse | undefined;
	if (apiCityId) {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?id=${apiCityId}&appid=${process.env.WEARTHER_API_KEY}`
			);
			data = await response.json();
		} catch (error) {
			console.log("error", error);
		}
	} else {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEARTHER_API_KEY}`
			);
			data = await response.json();
		} catch (error) {
			console.log("error", error);
		}
	}
	return data;
};
