import Redirect, { RedirectProps } from "components/Redirect/Redirect";
import { authUrl } from "config/path";
import useSearchParams from "hooks/useSearchParams";
import { FC } from "react";

interface RedirectToReturnUrlProps extends Omit<RedirectProps, "setReturnUrl" | "pathname"> {}

const RedirectToReturnUrl: FC<RedirectToReturnUrlProps> = ({ ...props }) => {
	const { returnUrl = authUrl.Index.url } = useSearchParams();

	return <Redirect pathname={returnUrl} {...props} />;
};

export default RedirectToReturnUrl;
