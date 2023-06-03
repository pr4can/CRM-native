import { Form, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import Button from "components/Button/Button";
import usePage from "components/Context/PageContext";
import DatePicker from "components/DatePicker/DatePicker";
import Label from "components/Label/Label";
import Modal from "components/Modal/Modal";
import PageTitle from "components/PageTitle/PageTitle";
import Table from "components/Table/Table";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useModal from "hooks/useModal";
import usePageDate from "hooks/usePageDate";
import getColumns from "pages/Requests/RequestsList/getColumns";
import QuantityCell, { getFormName } from "pages/Requests/components/QuantityCell/QuantityCell";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
	useDeleteAdminRequestMutation,
	useDeleteClientRequestMutation,
	useGetAdminRequestsByClientQuery,
	useGetClientPageContentQuery,
	useSubmitClientRequestMutation,
	useUpdateClientRequestMutation,
} from "services/requestsServices";
import height from "staticContent/height";
import { RequestItem } from "types/models/EntityRequest";
import areEqual from "utils/areEqual";
import dateHelper from "utils/dateHelper";
import labels from "utils/labels";
import transformCategoriesToRequestTableData, {
	transformCategoriesToRequestMobileTableData,
} from "utils/transformCategoriesToRequestTableData";
import { VList } from "virtuallist-antd";
import TopBarInfo from "../components/TobBarInfo/TobBarInfo";
import styles from "./RequestList.module.scss";

const RequestsList: FC = () => {
	const [form] = useForm();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { windowSize } = usePage();
	const { open, isOpen, close } = useModal();

	const [date, setDate] = usePageDate();
	const [initialValues, setInitialValues] = useState<Record<string, number>>({});
	const [disabledKeys, setDisabledKeys] = useState<string[]>([]);

	const {
		data: dataForUser,
		isLoading: loadingForUser,
		isFetching: fetchingForUser,
	} = useGetClientPageContentQuery({ DeliveryDate: dateHelper.toRequestDate(date) }, { skip: !!id });
	const {
		data: dataByClient,
		isLoading: loadingByClient,
		isFetching: fetchingByClient,
	} = useGetAdminRequestsByClientQuery(
		{
			Date: dateHelper.toRequestDate(date),
			UserId: id,
		},
		{ skip: !id }
	);

	const { data, isLoading, isFetching } = useMemo(() => {
		return !id
			? { data: dataForUser, isLoading: loadingForUser, isFetching: fetchingForUser }
			: {
					data: dataByClient,
					isLoading: loadingByClient,
					isFetching: fetchingByClient,
			  };
	}, [dataByClient, dataForUser, id, loadingForUser, fetchingForUser, loadingByClient, fetchingByClient]);

	const [submitClientRequest, { isLoading: loadSubmit }] = useSubmitClientRequestMutation();
	const [changeClientRequest, { isLoading: loadChange }] = useUpdateClientRequestMutation();
	const [deleteAdminRequest, { isLoading: loadDeleteAdminRequest }] = useDeleteAdminRequestMutation();
	const [deleteClientRequest, { isLoading: loadDeleteClientRequest }] = useDeleteClientRequestMutation();

	const dataSource = useMemo(
		() =>
			windowSize.width < 475
				? transformCategoriesToRequestMobileTableData(data?.categories)
				: transformCategoriesToRequestTableData(data?.categories),
		[data?.categories, windowSize.width]
	);

	const mobileSize = useMemo(() => windowSize.width < 475, [windowSize.width]);
	const disabled = dataForUser?.isRequestCompleted;
	const disabledSubmit = useMemo(() => {
		const initialValuesWithoutCategory = Object.fromEntries(
			Object.entries(initialValues).filter(([key]) => !key?.includes("category"))
		);

		return areEqual(
			initialValuesWithoutCategory,
			form.getFieldsValue() || (id ? dataForUser?.isRequestCompleted : false)
		);
	}, [initialValues, form.getFieldsValue()]);

	useEffect(() => {
		const initialValues = dataSource.reduce((result, product) => {
			return {
				...result,
				[getFormName(product.id)]: product.quantity,
			};
		}, {});

		setInitialValues(initialValues);
		form.setFieldsValue(initialValues);
	}, [dataSource]);

	const vComponent = useMemo(() => {
		const list = VList({
			height: windowSize.width > 475 ? height.requestsList.desktop : height.requestsList.mobile,
		});

		return {
			...list,
			body: {
				...list.body,
				cell: QuantityCell,
			},
		};
	}, [windowSize.width]);

	const onAddDisabledKey = (key: string) => {
		setDisabledKeys((prev) => Array.from(new Set([...prev, key])));
	};

	const onRemoveDisabledKey = (key: string) => {
		setDisabledKeys((prev) => prev.filter((k) => k !== key));
	};

	const onFinish = async (data: Record<string, number>) => {
		const requestItems = Object.entries(data).reduce<RequestItem[]>((result, [key, quantity]) => {
			return [
				...result,
				{
					productId: Number(key.replace("product-id-", "")),
					quantity,
				},
			];
		}, []);

		if (id) {
			await changeClientRequest({
				clientId: Number(id),
				deliveryDate: date.unix() * 1000,
				requestItems,
			}).then(() => {
				message.success(`Заявка клиента ${dataByClient?.clientName} сохранена`);
			});
		} else {
			await submitClientRequest({
				deliveryDate: date.unix() * 1000,
				requestItems,
			}).then(() => {
				message.success("Заявка отправлена");
			});
		}
	};

	const onClear = async () => {
		if (!id && dataForUser?.isRequestCompleted) {
			await deleteClientRequest(dateHelper.toRequestDate(date)).then(() => {
				message.success(`Заявка на ${date.format("DD.MM.YYYY")} удалена`);
			});
		}

		if (!!id && dataByClient?.isRequestCompleted)
			await deleteAdminRequest(dateHelper.toRequestDate(date)).then(() => {
				message.success(`Заявка от клиента ${dataByClient.clientName} на ${date.format("DD.MM.YYYY")} удалена`);
				navigate(`${authUrl.Index.RequestsAdmin.List.url}?date=${dateHelper.toRequestDate(date)}`);
			});
	};

	return (
		<>
			<Form name={"Requests"} form={form} onFinish={onFinish}>
				<TopBar alignTop>
					<PageTitle
						backUrl={!!id ? `${authUrl.Index.RequestsAdmin.List.url}?date=${dateHelper.toRequestDate(date)}` : false}>
						{[data?.clientName, data?.clientOrganization].join(" ").trim() || labels.dash}
					</PageTitle>
					<TopBarInfo>
						<div className={styles.date}>
							<div className={styles.datePickerWrapper}>
								<Label>Дата поставки</Label>
								<DatePicker width={240} minWidth accent value={date} onChange={setDate} />
							</div>
						</div>
						<div className={styles.buttons}>
							<Button
								type={"ghost"}
								onClick={open}
								disabled={!!id ? !dataByClient?.isRequestCompleted : !dataForUser?.isRequestCompleted}
								loading={loadDeleteClientRequest || loadDeleteAdminRequest}>
								Сбросить
							</Button>
							<Button htmlType={"submit"} disabled={disabledSubmit} loading={loadSubmit || loadChange}>
								{id || dataForUser?.isRequestCompleted ? "Сохранить заявку" : "Отправить заявку"}
							</Button>
						</div>
					</TopBarInfo>
				</TopBar>

				<Table
					showHeader={!mobileSize}
					dataSource={dataSource}
					scroll={{
						y: windowSize.width > 475 ? height.requestsList.desktop : height.requestsList.mobile,
					}}
					components={vComponent}
					columns={getColumns({
						form,
						disabledKeys,
						onAddDisabledKey,
						onRemoveDisabledKey,
						disabled,
						mobileSize,
					})}
					loading={isLoading || isFetching}
				/>
			</Form>
			<Modal
				title={`Сбросить заявку на ${date.format("DD.MM.YYYY")}`}
				open={isOpen}
				onCancel={close}
				onOk={() => {
					onClear();
					close();
				}}
			/>
		</>
	);
};

export default RequestsList;
