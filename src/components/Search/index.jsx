import React from 'react';
import styles from './Search.module.scss';
import searchLogo from '../../assets/img/search.svg';

const Search = ({ searchValue, setSearchValue }) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.icon}
				src={searchLogo}
				alt="searcLogo"
			/>

			<input
			// В реакте рекомендуется прописывать в домЭлементе значение, которое мы изменяем при помощи хуков. Получается такой динамический value в html.
				value={searchValue}
				className={styles.input}
				// По событию изменения значения в инпуте - записываем это значение в с помощью хука в переменную SearchValue
				onChange={(event) => {
					setSearchValue(event.target.value);
				}}
				type="text"
				placeholder="Поиск пицц..."
			/>
		</div>
	);
};

export default Search;
