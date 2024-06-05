import { WeatherForOneDay } from "@/types/weatherAPI";
import { format, parseISO } from "date-fns";
import { FC } from "react";

interface DayAndDateProps {
	firstData?: WeatherForOneDay | null;
}

const DayAndDate: FC<DayAndDateProps> = ({ firstData }) => {
	const date = parseISO(firstData?.dt_txt ?? "");
	const weekday = isNaN(date.getTime()) ? "" : format(date, "EEEE");
	const formattedDay = isNaN(date.getTime()) ? "" : format(date, "dd.MM.yyyy");
	return (
		<div className="flex gap-1 text-2xl items-start">
			<p>{weekday}</p>
			<p className="text-lg">{formattedDay}</p>
		</div>
	);
};

export default DayAndDate;
