import { message, TableProps } from "antd";
import Button from "components/Button/Button";
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
import moment from "moment";
import getColumns from "pages/Requests/RequestsListFinal/getColumns";
import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useCreateAdminRequestMutation,
	useGetFinalRequestAdminPageContentQuery,
	useGetReportMutation,
} from "services/requestsServices";
import height from "staticContent/height";
import { FinalRequestTableRow } from "types/models/EntityProductCategory";
import dateHelper from "utils/dateHelper";
import fileHelper from "utils/fileHelper";
import labels from "utils/labels";
import { transformFinalCategoriesToRequestTableData } from "utils/transformCategoriesToRequestTableData";
import TopBarInfo from "../components/TobBarInfo/TobBarInfo";
import styles from "./RequestsListFinal.module.scss";

const RequestsListFinal: FC = () => {
	const navigate = useNavigate();
	const { handleFilterChange, filterQuery } = useFilter<{ provider?: string }>();

	const [date] = usePageDate();
	const [loadingTypes, { removeLoadingType, addLoadingType }] = usePrintLoading();
	const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

	const { data, isLoading, isFetching } = useGetFinalRequestAdminPageContentQuery({
		Date: dateHelper.toRequestDate(date),
		...filterQuery,
	});

	const [createAdminRequest, { isLoading: isLoadingCreateRequest }] = useCreateAdminRequestMutation();

	const dataSource = useMemo(
		() => transformFinalCategoriesToRequestTableData(data?.finalRequestCategories),
		[data?.finalRequestCategories]
	);

	const printData = useMemo(
		() =>
			transformFinalCategoriesToRequestTableData(
				data?.finalRequestCategories.map((category) => ({
					...category,
					products: (category.products as any).filter(({ product }: any) => selectedProductIds.includes(product.id)),
				}))
			),
		[data, selectedProductIds]
	);

	const [getReport] = useGetReportMutation();

	useEffect(() => {
		setSelectedProductIds(dataSource.map((product) => Number(product.id)));
	}, [dataSource]);

	const onRedirectToAdvancedFinalRequest = () => {
		navigate(`${authUrl.Index.RequestsAdmin.AdvancedFinalList.url}?date=${dateHelper.toRequestDate(date)}`);
	};

	const rowSelection: TableProps<FinalRequestTableRow>["rowSelection"] = {
		onChange: (selectedRowKeys) => setSelectedProductIds(selectedRowKeys.map(Number)),
		selectedRowKeys: selectedProductIds,
		hideSelectAll: true,
	};

	const onDownload: DownloadFn = async (type) => {
		if (selectedProductIds?.length) {
			addLoadingType(type);

			const data = await getReport({
				date: date.unix() * 1000,
				reportType: type,
				reportElements: dataSource
					?.filter((item) => selectedProductIds.includes(Number(item.id)))
					.map((item) => ({
						productId: item.id,
						totalQuantity: item.quantity,
					})) as any,
				provider: filterQuery?.provider?.toString(),
			}).unwrap();

			removeLoadingType(type);
			fileHelper.downloadBlob(data);
		}
	};

	const createAdminRequestHandler = () => {
		createAdminRequest(date.unix() * 1000).then(() => {
			message.success(`Заявка сформирована`);
		});
	};

	return (
		<>
			<TopBar alignTop>
				<PageTitle backUrl={`${authUrl.Index.RequestsAdmin.List.url}?date=${dateHelper.toRequestDate(date)}`}>
					Итоговая заявка
				</PageTitle>
				<TopBarInfo>
					<div className={styles.date}>
						<div className={styles.dateWrapper}>
							<Label noInput>Дата поставки</Label>
							<span className={styles.dateText}>{date.format("DD.MM.YYYY")}</span>
						</div>
						<div className={styles.dateWrapper}>
							<Label noInput>Дата создания</Label>
							<span className={styles.dateText}>
								{data?.creationDate ? moment(data.creationDate).format("DD.MM.YYYY HH:mm") : labels.dash}
							</span>
						</div>
					</div>
					<div className={styles.buttonsWrapper}>
						<PrintBlock
							onDownload={onDownload}
							loadingTypes={loadingTypes}
							printContent={
								<PrintContent
									data={printData}
									columns={getColumns()}
									title={`Итоговая заявка за ${date.format("DD.MM.YYYY")}`}
								/>
							}
							disabled={!dataSource?.length || !selectedProductIds?.length}
							printDate={dateHelper.toRequestDate(date)}
						/>
						<Button onClick={onRedirectToAdvancedFinalRequest}>Итоговая развернутая</Button>
						<Button
							onClick={createAdminRequestHandler}
							loading={isLoadingCreateRequest}
							disabled={!!data?.creationDate || !dataSource?.length}>
							Сформировать заявку
						</Button>
					</div>
				</TopBarInfo>
			</TopBar>
			<Table
				dataSource={dataSource}
				scroll={{ y: height.requestsListFinal }}
				columns={getColumns({ handleFilterChange })}
				loading={isLoading || isFetching}
				rowSelection={rowSelection}
			/>
		</>
	);
};

export default RequestsListFinal;
