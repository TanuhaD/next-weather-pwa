export function convertWindSpeed(speed: number): string {
	return `${(speed * 3.6).toFixed(0)} km/h`;
}
