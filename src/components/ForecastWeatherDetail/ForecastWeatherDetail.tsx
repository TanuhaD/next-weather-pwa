import { WeatherForOneDay } from "@/types/weatherAPI";
import { convertKelvinToCelsius } from "@/utils/convertkelvinToCelsius";
import { format, parseISO } from "date-fns";
import Container from "../Container/Container";
import NextDayWeatherDetails from "../WeatherDetails/NextDayWeatherDetails";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

export interface ForecastWeatherDetailProps {
	oneDayForecast: WeatherForOneDay;
}

function ForecastWeatherDetail({
	oneDayForecast,
}: ForecastWeatherDetailProps): JSX.Element {
	const weatherIcon = oneDayForecast.weather[0].icon;
	const day = format(parseISO(oneDayForecast.dt_txt), "dd.MM") || "";
	const temp = oneDayForecast.main.temp ?? 0;
	const feels_like = oneDayForecast.main.feels_like ?? 0;
	const description = oneDayForecast.weather[0].description || "";

	return (
		<Container className="gap-4">
			<section className="flex items-center px-4 gap-4">
				<div>
					<WeatherIcon iconName={weatherIcon} />

					<p className="text-sm">{day} </p>
				</div>

				<div className="flex flex-col px-4">
					<p className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}°C</p>
					<p className="text-xs space-x-1 whitespace-nowrap">Feels like</p>
					<p className="text-xs space-x-2">
						<span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
					</p>
					<p className="capitalize">{description}</p>
				</div>
			</section>

			<section className="overflow-x-auto  flex justify-between gap-4 px-4 w-full pr-10 custom-scrollbar">
				<NextDayWeatherDetails oneDayData={oneDayForecast} />
			</section>
		</Container>
	);
}

export default ForecastWeatherDetail;
