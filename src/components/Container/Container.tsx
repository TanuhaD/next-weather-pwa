import { cn } from "@/utils/cn";
import React from "react";

function Container(props: React.HTMLProps<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				"w-full bg-white border rounded-xl flex py-4 shadow-sm flex-col md:flex-row",
				props.className
			)}
		/>
	);
}

export default Container;
