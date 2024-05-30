const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	disable: false,
	workboxOptions: {
		disableDevLogs: true,
	},
});

module.exports = withPWA({
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
			},
		],
	},
});
