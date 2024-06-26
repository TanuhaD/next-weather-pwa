import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	manifest: "/manifest.json",
	title: "Wearther forecast",
	description: "Created by Tetiana  Demchenko ",
};

export const viewport: Viewport = {
	themeColor: " rgb(253 224 71 / 0.8)",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
