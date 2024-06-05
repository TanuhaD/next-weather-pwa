import { WeatherApiResponse, WeatherForOneDay } from "@/types/weatherAPI";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { getDataForFirstDay } from "@/utils/getDataForFirstDay";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { format, fromUnixTime } from "date-fns";
import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface TodayWeatherDetailsProps {
	data?: WeatherApiResponse;
}

function TodayWeatherDetails({ data }: TodayWeatherDetailsProps) {
	const firstData = data ? getDataForFirstDay(data) : null;

	const visibility = metersToKilometers(firstData?.visibility);
	const airPressure = firstData?.main.pressure
		? `${firstData.main.pressure}hPa`
		: null;
	const humidity = firstData?.main.humidity
		? `${firstData.main.humidity}%`
		: null;
	const windSpeed = firstData?.wind.speed
		? convertWindSpeed(firstData?.wind.speed)
		: "no data";

	const currentSunrise = data?.city?.sunrise
		? format(fromUnixTime(data?.city.sunrise), "H:mm ")
		: "no data";

	const currentSunset = data?.city?.sunset
		? format(fromUnixTime(data?.city.sunset), "h:mm a")
		: "no data";

	return (
		<>
			{visibility && (
				<SingleWeatherDetails
					icon={<LuEye />}
					information="Visibility"
					value={visibility}
				/>
			)}
			{humidity && (
				<SingleWeatherDetails
					icon={<FiDroplet />}
					information="Humidity"
					value={humidity}
				/>
			)}

			<SingleWeatherDetails
				icon={<MdAir />}
				information="Wind speed"
				value={windSpeed}
			/>
			{airPressure && (
				<SingleWeatherDetails
					icon={<ImMeter />}
					information="Air Pressure"
					value={airPressure}
				/>
			)}

			{currentSunrise && (
				<SingleWeatherDetails
					icon={<LuSunrise />}
					information="Sunrise"
					value={currentSunrise}
				/>
			)}
			{currentSunset && (
				<SingleWeatherDetails
					icon={<LuSunset />}
					information="Sunset"
					value={currentSunset}
				/>
			)}
		</>
	);
}

export interface SingleWeatherDetailsProps {
	information: string;
	icon: React.ReactNode;
	value: string;
}

function SingleWeatherDetails({
	information,
	icon,
	value,
}: SingleWeatherDetailsProps) {
	return (
		<div className="flex items-center justify-between flex-col gap-2 text-xs font-semibold text-black/80">
			<p className="whitespace-nowrap">{information}</p>
			<div className="text-3xl">{icon}</div>
			<p>{value}</p>
		</div>
	);
}

export default TodayWeatherDetails;
