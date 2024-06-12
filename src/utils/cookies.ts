interface setCookiesParams {
	name: string;
	value: string;
	days: number;
}
interface deleteCookieParams {
	name: string;
}
export function setCookie({ name, value, days }: setCookiesParams) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function deleteCookie({ name }: deleteCookieParams) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
