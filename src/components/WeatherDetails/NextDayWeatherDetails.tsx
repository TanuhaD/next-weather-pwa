import { WeatherForOneDay } from "@/types/weatherAPI";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { metersToKilometers } from "@/utils/metersToKilometers";
import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface NextDayWeatherDetailsProps {
	oneDayData?: WeatherForOneDay;
}

function NextDayWeatherDetails({ oneDayData }: NextDayWeatherDetailsProps) {
	const visibility = metersToKilometers(oneDayData?.visibility);
	const airPressure = oneDayData?.main.pressure
		? `${oneDayData.main.pressure}hPa`
		: null;
	const humidity = oneDayData?.main.humidity
		? `${oneDayData.main.humidity}%`
		: null;
	const windSpeed = oneDayData?.wind.speed
		? convertWindSpeed(oneDayData?.wind.speed)
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

export default NextDayWeatherDetails;
