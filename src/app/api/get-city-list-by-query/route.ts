"use server";
import { NextResponse } from "next/server";
import { prisma } from "../../../utils/db";
import { City } from "@/types/weatherAPI";
interface CitiesListServerResponseSuccess {
	cities: City[];
	error: null;
}

interface CitiesListServerResponseError {
	cities: null;
	error: string;
}
export type CitiesListServerResponse =
	| CitiesListServerResponseSuccess
	| CitiesListServerResponseError;

let response: CitiesListServerResponse;
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");
	if (!query) {
		response = { cities: null, error: "Query parameter is required" };
		return NextResponse.json(response, { status: 400 });
	}
	let cities;
	try {
		console.log("Querying database...");
		cities = await prisma.city.findMany({
			where: {
				name: {
					startsWith: query,
					mode: "insensitive",
				},
			},
		});
	} catch (error) {
		console.error("Database request error:", error);
		response = { cities: null, error: "DB request error" };
	}
	if (!cities) {
		response = { cities: null, error: "No cities found" };
		return NextResponse.json(response, { status: 404 });
	}
	response = { cities, error: null };
	return NextResponse.json(response, { status: 200 });
}
