import Icons from "components/Icons/Icons";
import { FC } from "react";
import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
	return (
		<div className={styles.notFound}>
			<div className={styles.notFound__img}>
				<Icons.NotFound />
			</div>
			<h2 className={styles.notFound__title}>К сожалению данная страница не найдена</h2>
		</div>
	);
};

export default NotFound;
