import { WeatherApiResponse } from "@/types/weatherAPI";

interface fetchForecastByCityOrIdParams {
	city?: string;
}

export const fetchForecastByCity = async ({
	city,
}: fetchForecastByCityOrIdParams): Promise<WeatherApiResponse | undefined> => {
	let data: WeatherApiResponse | undefined;
	if (city) {
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
