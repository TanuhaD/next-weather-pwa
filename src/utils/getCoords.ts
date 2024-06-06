interface getCoordsReturn {
	lat: number | null;
	lon: number | null;
	error: string | null;
}
export async function getCoords(): Promise<getCoordsReturn> {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					error: null,
				});
			},
			(locationError) => {
				let message = "";
				switch (locationError.code) {
					case locationError.PERMISSION_DENIED:
						message = "You have prohibited the geolocation request.";
						break;
					case locationError.POSITION_UNAVAILABLE:
						message = "Information about the location unavailable.";
						break;
					case locationError.TIMEOUT:
						message = "The location request has timed out.";
						break;
				}
				resolve({
					lat: null,
					lon: null,
					error: message,
				});
			}
		);
	});
}
