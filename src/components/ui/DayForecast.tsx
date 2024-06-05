import { FC } from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { convertKelvinToCelsius } from "@/utils/convertkelvinToCelsius";
import { format, parseISO } from "date-fns";
import { WeatherApiResponse } from "@/types/weatherAPI";

interface DayForecastProps {
	data?: WeatherApiResponse;
}

const DayForecast: FC<DayForecastProps> = ({ data }) => {
	return (
		<ul className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
			{data?.list?.map((weather) => {
				return (
					<li
						key={weather.dt}
						className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
						<p className="whitespace-nowrap">
							{format(parseISO(weather.dt_txt), "h:mm a")}
						</p>
						<WeatherIcon
							iconName={getDayOrNightIcon(
								weather.weather[0].icon,
								weather.dt_txt
							)}
						/>
						<p>{convertKelvinToCelsius(weather.main.temp)}°</p>
					</li>
				);
			})}
		</ul>
	);
};

export default DayForecast;
