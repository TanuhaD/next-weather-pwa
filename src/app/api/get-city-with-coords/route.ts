"use server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const lon = searchParams.get("lon");
	const lat = searchParams.get("lat");
	const response = await fetch(
		`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=3&appid=${process.env.WEARTHER_API_KEY}`
	);
	let data;
	try {
		data = await response.json();
	} catch (error) {
		console.log(error);
	}
	return NextResponse.json(data);
}
