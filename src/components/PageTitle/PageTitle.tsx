import { DoubleLeftOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { authUrl } from "config/path";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router";
import concatClasses from "utils/concatClasses";
import styles from "./PageTitle.module.scss";

interface PageTitleProps {
	children: ReactNode;
	backUrl?: boolean | string;
	className?: string;
}

const PageTitle: FC<PageTitleProps> = ({ children, backUrl = false, className, ...props }) => {
	const isFirstPage = window.history.state.idx === 0;
	const navigate = useNavigate();

	const onBack = () => {
		if (typeof backUrl === "string") navigate(backUrl);
		else isFirstPage ? navigate(authUrl.Index.Requests.List.url) : navigate(-1);
	};

	return (
		<>
			<Title level={2} className={concatClasses(styles.title, className)} {...props}>
				{backUrl && <DoubleLeftOutlined onClick={onBack} />}
				{children}
			</Title>
		</>
	);
};

export default PageTitle;
