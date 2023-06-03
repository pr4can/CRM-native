import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ButtonWithTooltip from "components/Button/ButtonWithTooltip";
import Icons from "components/Icons/Icons";
import { FC, ReactNode, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import ReactToPrint from "react-to-print";
import concatClasses from "utils/concatClasses";
import styles from "./PrintBlock.module.scss";

export enum ReportType {
	pdf,
	xls,
	print,
}

export type DownloadFn = (type: ReportType) => void;

interface PrintBlockProps {
	onDownload?: DownloadFn;
	loadingTypes?: ReportType[];
	disabled?: boolean;
	printDate?: string;
	printContent?: ReactNode | ReactNode[];
}

const disabledTooltipText = "Выберите продукты";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PrintBlock: FC<PrintBlockProps> = ({ onDownload, disabled = false, printDate, printContent, loadingTypes }) => {
	const printContentRef = useRef();

	const GetPrintTrigger = useCallback(() => {
		return (
			<ButtonWithTooltip
				onClick={() => (!disabled ? onDownload?.(ReportType.print) : false)}
				title={disabled ? disabledTooltipText : "Распечатать"}
				isIcon>
				<Icons.Printer />
			</ButtonWithTooltip>
		);
	}, []);

	const getPrintContent = useCallback(() => printContentRef?.current, []);

	return (
		<div className={concatClasses(styles.wrapper, disabled && styles.wrapper_disabled)}>
			<ButtonIcon
				onClick={() => (!disabled ? onDownload?.(ReportType.pdf) : false)}
				title={disabled ? disabledTooltipText : "Скачать PDF"}
				loading={loadingTypes.includes(ReportType.pdf)}>
				<Icons.PDF />
			</ButtonIcon>
			<ButtonIcon
				onClick={() => (!disabled ? onDownload?.(ReportType.xls) : false)}
				title={disabled ? disabledTooltipText : "Скачать XLS"}
				loading={loadingTypes.includes(ReportType.xls)}>
				<Icons.XLS />
			</ButtonIcon>
			{!disabled ? (
				<ReactToPrint
					content={getPrintContent}
					documentTitle={`Advanced report table for ${printDate}`}
					removeAfterPrint
					trigger={GetPrintTrigger}
				/>
			) : (
				<GetPrintTrigger />
			)}
			{createPortal(
				<div style={{ position: "absolute", zIndex: -1, padding: 10, minHeight: "100%" }} ref={printContentRef}>
					{printContent}
				</div>,
				document.querySelector("body")
			)}
		</div>
	);
};

export default PrintBlock;

interface ButtonIconProps {
	onClick: () => void;
	title: string;
	children?: ReactNode;
	loading?: boolean;
}

const ButtonIcon: FC<ButtonIconProps> = ({ children, title, onClick, loading }) => {
	return loading ? (
		<Spin className={styles.spin} indicator={antIcon} />
	) : (
		<ButtonWithTooltip onClick={onClick} title={title} isIcon>
			{children}
		</ButtonWithTooltip>
	);
};
