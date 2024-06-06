export function metersToKilometers(meters: number | undefined): string | null {
	if (!meters) return null;
	const metersInKilometers = meters / 1000;
	return `${metersInKilometers.toFixed(0)} km`;
}
