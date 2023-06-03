import { Form } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "antd/lib/form/Form";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import InputWithMask from "components/Input/InputWithMask";
import { authUrl } from "config/path";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyLoginQuery } from "services/authService";
import { EntityUserLogin, UserRole } from "types/models/EntityUser";
import formHelper from "utils/formHelper";
import { required } from "utils/getRules";
import styles from "./Authorization.module.scss";

const Authorization: FC = () => {
	const navigate = useNavigate();
	const [form] = useForm<EntityUserLogin>();

	const [showErrors, setShowErrors] = useState<string | undefined>(undefined);

	const [auth, { isLoading }] = useLazyLoginQuery();

	const onFinish = async (values: EntityUserLogin) => {
		await auth(values)
			.unwrap()
			.then(({ user, errorDescription }) => {
				if (!user) {
					setShowErrors(errorDescription);
				} else
					navigate(
						user.role === UserRole.Admin ? authUrl.Index.RequestsAdmin.List.url : authUrl.Index.Requests.List.url
					);
			});
	};

	return (
		<Form
			form={form}
			name="Authorization"
			onFinish={onFinish}
			className={styles.form}
			autoComplete="off"
			onChange={() => setShowErrors(undefined)}>
			<Title level={1} className={styles.form__title}>
				Авторизация
			</Title>
			<Form.Item
				className={styles.form__inputItem}
				normalize={formHelper.transformPhone}
				name="phone"
				rules={[required()]}>
				<InputWithMask placeholder={"Телефон"} mask="+79999999999" textCenter />
			</Form.Item>
			<Form.Item className={styles.form__inputItem} name="password" rules={[required()]}>
				<Input type="password" placeholder="Пароль" autoComplete="off" textCenter />
			</Form.Item>
			{showErrors && <div className={styles.form__errors}>{showErrors}</div>}
			<Button htmlType="submit" className={styles.form__btn} loading={isLoading}>
				Войти
			</Button>
		</Form>
	);
};

export default Authorization;
