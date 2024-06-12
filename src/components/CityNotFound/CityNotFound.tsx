"use client";
import { deleteCookie } from "@/utils/cookies";
import React, { FC } from "react";

interface CityNotFoundProps {
	city: string;
}

const CityNotFound: FC<CityNotFoundProps> = ({ city }) => {
	deleteCookie({ name: "city" });
	return (
		<div>
			<p>City &#34;{city}&#34; not found</p>
		</div>
	);
};

export default CityNotFound;
