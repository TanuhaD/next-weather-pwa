export function getDayOrNightIcon(
	iconName: string = "",
	time: string = ""
): string {
	const hours = new Date(time).getHours();
	const isDay = hours >= 6 && hours < 18;
	return isDay ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
