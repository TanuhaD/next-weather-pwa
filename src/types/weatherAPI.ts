export interface WeatherForOneDay {
	dt: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
		temp_kf: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	clouds: {
		all: number;
	};
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	visibility: number;
	pop: number;
	sys: {
		pod: string;
	};
	dt_txt: string;
}

export interface WeatherApiResponse {
	cod: string;
	message: number;
	cnt?: number;
	list?: WeatherForOneDay[];
	city?: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
	};
}
interface CityWithCoords {
	name?: string;
	lat?: number;
	lon?: number;
	country?: string;
	state?: string;
}
interface Coordinates {
	lat: number;
	lon: number;
}

export interface City {
	apiCityId: number;
	coord: Coordinates;
	country: string;
	id: string;
	name: string;
	state: string;
}

export type GetCityWithCoordsResponse = CityWithCoords[] | undefined;
