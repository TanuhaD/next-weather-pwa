import { WeatherForOneDay } from "@/types/weatherAPI";
import { convertKelvinToCelsius } from "@/utils/convertkelvinToCelsius";
import { FC } from "react";

interface TemperatureForDayProps {
	firstData?: WeatherForOneDay | null;
}

const TemperatureForDay: FC<TemperatureForDayProps> = ({ firstData }) => {
	return (
		<div className="flex flex-col px-4">
			<p className="text-5xl">
				{convertKelvinToCelsius(firstData?.main.temp)}°C
			</p>
			<p className="text-xs space-x-1 whitespace-nowrap">Feels like</p>
			<p className="text-xs space-x-2">
				<span>{convertKelvinToCelsius(firstData?.main.temp_min)}°</span>
				<span>{convertKelvinToCelsius(firstData?.main.temp_max)}°</span>
			</p>
		</div>
	);
};

export default TemperatureForDay;
