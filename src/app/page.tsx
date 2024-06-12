import CityNotFound from "@/components/CityNotFound/CityNotFound";
import Container from "@/components/Container/Container";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail/ForecastWeatherDetail";
import NavBar from "@/components/NavBar/NavBar";
import TodayWeatherDetails from "@/components/WeatherDetails/TodayWeatherDetails";
import WeatherIcon from "@/components/WeatherIcon/WeatherIcon";
import DayAndDate from "@/components/ui/DayAndDate";
import DayForecast from "@/components/ui/DayForecast";
import TemperatureForDay from "@/components/ui/TemperatureForDay";
import { createListOfDatesOnePerDay } from "@/utils/createListOfDatesOnePerDay";
import { fetchForecastByCity } from "@/utils/fetchForecastByCity";
import { fetchForecastById } from "@/utils/fetchForecastById";
import { getDataForFirstDay } from "@utils/getDataForFirstDay";
import { getDayOrNightIcon } from "@utils/getDayOrNightIcon";
import { cookies } from "next/headers";

export default async function Page(params: any) {
	const cookiesCity = cookies().get("city");
	const paramsCity = params.searchParams.city;
	const city = paramsCity || cookiesCity?.value;

	let data;
	if (city) {
		data = await fetchForecastByCity({ city });
	} else {
		const paramsApiCityId = params.searchParams.apiCityId;
		const cookiesApiCityId = cookies().get("apiCityId");
		const apiCityId = paramsApiCityId || cookiesApiCityId?.value;
		if (apiCityId) {
			data = await fetchForecastById({ apiCityId });
		}
	}
	if (!data) {
		data = await fetchForecastByCity({ city: "Sofia" });
	}
	const firstData =
		data && data.cod === "200" ? getDataForFirstDay(data) : null;

	const listOfDatesOnePerDay = createListOfDatesOnePerDay(data!);

	return (
		<div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
			<NavBar city={data?.city?.name} />
			{(!data || data.cod !== "200") && <CityNotFound city={city} />}
			{data && data.cod === "200" && (
				<main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
					<section className="space-y-4">
						<div className="space-y-2">
							<DayAndDate firstData={firstData} />
							<Container className=" gap-10 px-6 items-center">
								<TemperatureForDay firstData={firstData} />
								<DayForecast data={data} />
							</Container>
						</div>
						<div className="777 flex gap-4 flex-col md:flex-row pt-3">
							{/* left */}
							<Container className=" w-fit justify-center flex-col px-4 items-center">
								<p className="capitalize text-center">
									{firstData?.weather[0].description}
								</p>
								<WeatherIcon
									iconName={getDayOrNightIcon(
										firstData?.weather[0].icon,
										firstData?.dt_txt
									)}
								/>
							</Container>
							<Container className="bg-yellow-300/80 px-6 gap-4 overflow-x-auto flex justify-start md:justify-between flex-row flex-wrap">
								<TodayWeatherDetails data={data} />
							</Container>
							{/* right */}
						</div>
					</section>
					<section className="flex flex-col w-full gap-4">
						<p className="text-2xl">Forecast (7 days)</p>
						{listOfDatesOnePerDay.map((oneDayForecast) => {
							return (
								<ForecastWeatherDetail
									oneDayForecast={oneDayForecast!}
									key={oneDayForecast?.dt}
								/>
							);
						})}
					</section>
				</main>
			)}
		</div>
	);
}
