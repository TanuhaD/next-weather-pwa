import { FC } from "react";

interface FetchErrorProps {
	error: Error;
}

const FetchError: FC<FetchErrorProps> = ({ error }) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<p>An error has occurred: {error.message}</p>
		</div>
	);
};

export default FetchError;
