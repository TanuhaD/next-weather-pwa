export function convertKelvinToCelsius(tempInKelvin: number = 0): number {
	const tempInCelsius = tempInKelvin - 273.15;
	return Math.floor(tempInCelsius);
}
