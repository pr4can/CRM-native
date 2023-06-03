import DatePicker from "components/DatePicker/DatePicker";
import Label from "components/Label/Label";
import PageTitle from "components/PageTitle/PageTitle";
import PrintBlock, { DownloadFn } from "components/PrintBlock/PrintBlock";
import PrintContent from "components/PrintContent/PrintContent";
import Table from "components/Table/Table";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useFilter from "hooks/useFilter";
import usePageDate from "hooks/usePageDate";
import usePrintLoading from "hooks/usePrintLoading";
import getColumns from "pages/Requests/RequestsListFinalAdvanced/getColumns";
import { FC, useMemo } from "react";
import {
	useGetAdvancedFinalRequestAdminPageContentQuery,
	useLazyGetExtendedReportQuery,
} from "services/requestsServices";
import height from "staticContent/height";
import dateHelper from "utils/dateHelper";
import fileHelper from "utils/fileHelper";
import { transformAdvancedFinalCategoriesToRequestTableData } from "utils/transformCategoriesToRequestTableData";
import TopBarInfo from "../components/TobBarInfo/TobBarInfo";
import styles from "./RequestsListFinalAdvanced.module.scss";

const RequestsListFinalAdvanced: FC = () => {
	const [loadingTypes, { removeLoadingType, addLoadingType }] = usePrintLoading();
	const [date, setDate] = usePageDate();
	const { handleFilterChange, filterQuery } = useFilter<{ Provider?: string }>();

	const { data, isLoading, isFetching } = useGetAdvancedFinalRequestAdminPageContentQuery({
		Date: dateHelper.toRequestDate(date),
		...filterQuery,
	});

	const dataSource = useMemo(
		() => transformAdvancedFinalCategoriesToRequestTableData(data?.advancedFinalRequestCategories),
		[data?.advancedFinalRequestCategories]
	);

	const [getExtendedReport] = useLazyGetExtendedReportQuery();

	const onDownload: DownloadFn = async (type) => {
		addLoadingType(type);

		const data = await getExtendedReport({
			Date: dateHelper.toRequestDate(date),
			ReportType: type,
			Provider: filterQuery?.Provider?.toString(),
		}).unwrap();

		removeLoadingType(type);
		fileHelper.downloadBlob(data);
	};

	return (
		<>
			<TopBar alignTop>
				<PageTitle backUrl={`${authUrl.Index.RequestsAdmin.FinalList.url}?date=${dateHelper.toRequestDate(date)}`}>
					Итоговая заявка развернутая
				</PageTitle>
				<TopBarInfo>
					<div className={styles.date}>
						<div className={styles.datePickerWrapper}>
							<Label>Дата поставки</Label>
							<DatePicker width={240} accent value={date} onChange={setDate} />
						</div>
						<div className={styles.buttonsWrapper}>
							<PrintBlock
								onDownload={onDownload}
								loadingTypes={loadingTypes}
								disabled={!dataSource?.length}
								printContent={
									<PrintContent
										data={dataSource}
										columns={getColumns()}
										title={`Итоговая развернутая заявка за ${date.format("DD.MM.YYYY")}`}
									/>
								}
								printDate={date.format("DD.MM.YYYY")}
							/>
						</div>
					</div>
				</TopBarInfo>
			</TopBar>
			<Table
				dataSource={dataSource}
				scroll={{ y: height.requestsListFinalAdvanced }}
				columns={getColumns({ handleFilterChange })}
				loading={isLoading || isFetching}
			/>
		</>
	);
};

export default RequestsListFinalAdvanced;
