import { WeatherApiResponse } from "@/types/weatherAPI";

export const getDataForFirstDay = (data: WeatherApiResponse) => {
	let returnData = null;
	if (data && data?.list?.[0]) {
		returnData = data.list[0];
	}
	return returnData;
};
