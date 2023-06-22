import React from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';
import { SearchContext } from '../../App';
// Т.к. мы теперь будем доставать searchValue, setSearchValue из context - больше не нужно из извлекать из пропсов
const Search = () => {
	const { searchValue, setSearchValue } = React.useContext(SearchContext);
	return (
		<div className={styles.root}>
			<img
				className={styles.icon}
				src={searchIcon}
				alt="searcIcon"
			/>

			<input
				// В реакте рекомендуется прописывать в домЭлементе значение инпута, которое мы изменяем. Если мы хотим как-то с этим инпутом взаимодействовать. Получается такой динамический value в html. Без этой строчки инпут не будет контролируемым и очистка по крестику не будет работать.
				value={searchValue}
				className={styles.input}
				// По событию изменения значения в инпуте - записываем это значение в с помощью хука в переменную SearchValue
				onChange={(event) => {
					setSearchValue(event.target.value);
				}}
				type="text"
				placeholder="Поиск пицц..."
			/>
			{/* Добавляем кресткик и Делаем очистку инпута по клику на крестик */}
			{/* Строчка ниже позволяет отображать крестик, только если в инпуте что-то есть */}
			{searchValue && (
				<img
					// Чтобы функция не вызывалась автоматически по открытию скобок - оборачиваем ее в стрелочную функцию
					onClick={() => setSearchValue('')}
					className={styles.close}
					src={close}
					alt="closeIcon"
				/>
			)}
		</div>
	);
};

export default Search;
