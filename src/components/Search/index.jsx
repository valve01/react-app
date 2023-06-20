import React from 'react';
import styles from './Search.module.scss';
import searchLogo from '../../assets/img/search.svg';

const Search = () => {
	return (
		<div className={styles.root}>
			<img
				className={styles.icon}
				src={searchLogo}
				alt="searcLogo"
			/>

			<input
				className={styles.input}
				type="text"
				placeholder="Поиск пицц..."
			/>
		</div>
	);
};

export default Search;
