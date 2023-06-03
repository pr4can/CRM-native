import { publicUrl } from "config/path";
import { FC } from "react";
import { Navigate, Path } from "react-router-dom";

export interface RedirectProps extends Partial<Path> {}

const Redirect: FC<RedirectProps> = ({ pathname = publicUrl.NotFound.url, ...props }) => {
	return (
		<Navigate
			to={{
				pathname,
				...props,
			}}
		/>
	);
};

export default Redirect;
