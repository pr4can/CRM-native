import { Modal as ModalAntd, ModalProps as ModalAntdProps } from "antd";
import Button from "components/Button/Button";
import { FC } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./Modal.module.scss";

interface ModalProps extends ModalAntdProps {
	onOk: () => void;
	onCancel: () => void;
}

const Modal: FC<ModalProps> = ({ className, title, onCancel, onOk, open, ...props }) => {
	return (
		<ModalAntd
			className={concatClasses(styles.modal, className)}
			title={title}
			open={open}
			onCancel={onCancel}
			onOk={onOk}
			footer={[
				<Button key={1} onClick={onOk} className={styles.modal__btn}>
					Да
				</Button>,
				<Button key={2} onClick={onCancel} className={concatClasses(styles.modal__btn, styles.modal__btn_light)}>
					Нет
				</Button>,
			]}
			{...props}
		/>
	);
};

export default Modal;
