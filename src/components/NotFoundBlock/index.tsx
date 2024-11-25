import React from 'react';
// Используем css модули. Не нужно придумывать никакие доп классы. Вебпак сам все сделает, даже если внутри разных scss файлов будут одинаковые селекторы/классы. Просто используем все это. Вебпак добат суффиксы, хэши, подчеркивания - все что нужно чтобы уникализировать классы.
import styles from './NotFoundBlock.module.scss';
const NotFoundBlock: React.FC = () => {
	return (
		<>
			<div className={styles.root}>
				<h2 className={styles.face}>:(</h2>
				<h1>
					404
					<br /> NotFound
				</h1>
				<h2>Ничего не найдено </h2>
			</div>
		</>
	);
};

export default NotFoundBlock;
