import { message } from "antd";
import Button from "components/Button/Button";
import DatePicker from "components/DatePicker/DatePicker";
import Label from "components/Label/Label";
import PageTitle from "components/PageTitle/PageTitle";
import Select from "components/Select/Select";
import Table from "components/Table/Table";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useGetRequestsStatusOptions, { RequestsStatus } from "hooks/options/useGetRequestsStatusOptions";
import useFilter from "hooks/useFilter";
import usePageDate from "hooks/usePageDate";
import getColumns from "pages/Requests/RequestsListForAdmin/getColumns";
import { FC, useMemo } from "react";
import { generatePath } from "react-router";
import { useNavigate } from "react-router-dom";
import { useCreateAdminRequestMutation, useGetAdminPageContentQuery } from "services/requestsServices";
import height from "staticContent/height";
import dateHelper from "utils/dateHelper";
import TopBarInfo from "../components/TobBarInfo/TobBarInfo";
import styles from "./RequestListForAdmin.module.scss";

const RequestsListForAdmin: FC = () => {
	const navigate = useNavigate();
	const { handleFilterChange, filterQuery } = useFilter();

	const [date, setDate] = usePageDate();

	const { data, isLoading, isFetching } = useGetAdminPageContentQuery({
		Date: dateHelper.toRequestDate(date),
		...filterQuery,
	});

	const [createAdminRequest, { isLoading: isLoadingCreateRequest }] = useCreateAdminRequestMutation();

	const requestsStatusOptions = useGetRequestsStatusOptions();
	const zeroCreatedRequests = useMemo(() => data?.clientRequests.every((item) => !item.isRequestCreated), [data]);

	const onRedirectToFinalRequest = () => {
		navigate(`${authUrl.Index.RequestsAdmin.FinalList.url}?date=${dateHelper.toRequestDate(date)}`);
	};

	const onRedirectToClientRequest = (id?: number) => {
		id &&
			navigate(
				`${generatePath(authUrl.Index.RequestsAdmin.EditByDate.url, { id })}?date=${dateHelper.toRequestDate(date)}`
			);
	};

	const createAdminRequestHandler = () => {
		createAdminRequest(date.unix() * 1000).then(() => {
			message.success(`Заявка сформирована`);
		});
	};

	const changeRequestStatusFilter = (value: string | number) => {
		if (value === RequestsStatus.AllRequests) handleFilterChange("IsRequestComplited", undefined);
		if (value === RequestsStatus.RequestsCreated) handleFilterChange("IsRequestComplited", true);
		if (value === RequestsStatus.RequestsIsNotCreated) handleFilterChange("IsRequestComplited", false);
	};

	return (
		<>
			<TopBar alignTop>
				<PageTitle>Заявки администратора</PageTitle>
				<TopBarInfo className={styles.toolbar}>
					<div className={styles.wrapper}>
						<div className={styles.date}>
							<Label>Дата поставки</Label>
							<DatePicker width={240} accent value={date} onChange={setDate} />
						</div>
						<div className={styles.request}>
							<Label>Статус заявок</Label>
							<Select
								onSelect={changeRequestStatusFilter}
								defaultValue="Все заявки"
								options={requestsStatusOptions}
								className={styles.request__select}
							/>
						</div>
					</div>
					<div className={styles.buttonsWrapper}>
						<Button onClick={onRedirectToFinalRequest} type={"ghost"}>
							Итоговая заявка
						</Button>
						<Button
							loading={isLoadingCreateRequest}
							onClick={createAdminRequestHandler}
							disabled={!!data?.requestCreationDate || zeroCreatedRequests}>
							Сформировать заявку
						</Button>
					</div>
				</TopBarInfo>
			</TopBar>
			<Table
				dataSource={data?.clientRequests?.map((item) => ({ ...item, key: item.clientId }))}
				scroll={{
					y: height.requestsListForAdmin,
				}}
				columns={getColumns({ onRedirectToClientRequest })}
				loading={isLoading || isFetching}
			/>
		</>
	);
};

export default RequestsListForAdmin;
