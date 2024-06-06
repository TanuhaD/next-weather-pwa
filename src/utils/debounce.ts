type Callback = (...args: any[]) => void;
type Delay = number;
type Return = (...args: any[]) => void;

export const debounce = (callback: Callback, delay: Delay): Return => {
	let timeoutId: any;
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
