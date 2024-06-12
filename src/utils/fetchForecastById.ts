import { WeatherApiResponse } from "@/types/weatherAPI";

interface fetchForecastByIdParams {
	apiCityId?: string;
}

export const fetchForecastById = async ({
	apiCityId,
}: fetchForecastByIdParams): Promise<WeatherApiResponse | undefined> => {
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
	}
	return data;
};
