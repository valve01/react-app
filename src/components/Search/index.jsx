import React from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
// Т.к. мы теперь будем доставать searchValue, setSearchValue из context - больше не нужно из извлекать из пропсов

// const testDebounce = () => {
// 	console.log('Написал сразу');
// 	debounce((console.log('Сделал паузу и написал это')), 1000)
// };
// testDebounce();

// const testDebounce = debounce(() => {
// 	console.log('Сделал паузу и написал это');
// },2000);
// const testDebounceStart = () => {
// 	console.log('Написал сразу');
// 	testDebounce();
// };
// testDebounceStart()

const Search = () => {
	const testDebounce = React.useCallback(
		debounce(() => {
			console.log('Сделал паузу и написал это');
		}, 2000),
		[],
	);

	const { searchValue, setSearchValue } = React.useContext(SearchContext);
	//1 Создаем переменную, которая будет хранить ссылку на дом-элемент инпута
	const inputRef = React.useRef();
	// inputRef - вернет нам объект
	// inputRef.current - сам дом-элемент
	// Значение дом элемента, если это инпут например
	// console.log(inputRef.current.value);

	// Сделаем ф-цию, которая будет одноверменно очищать и оставлять фокус на инпуте
	const clearInput = () => {
		setSearchValue('');
		inputRef.current.focus();
	};

	const onChangeInput = (event) => {
		setSearchValue(event.target.value);
		testDebounce();
	};

	return (
		<div className={styles.root}>
			<img
				className={styles.icon}
				src={searchIcon}
				alt="searcIcon"
			/>

			<input
				// 2 Теперь в нужном элементе в атрибуте ref указываю внутри {} в качестве ссылки нашу переменную
				ref={inputRef}
				// В реакте рекомендуется прописывать в домЭлементе значение инпута, которое мы изменяем. Если мы хотим как-то с этим инпутом взаимодействовать. Получается такой динамический value в html. Без этой строчки инпут не будет контролируемым и очистка по крестику не будет работать.
				value={searchValue}
				className={styles.input}
				// По событию изменения значения в инпуте - записываем это значение в с помощью хука в переменную SearchValue
				onChange={onChangeInput}
				type="text"
				placeholder="Поиск пицц..."
			/>
			{/* Добавляем кресткик и Делаем очистку инпута по клику на крестик */}
			{/* Строчка ниже позволяет отображать крестик, только если в инпуте что-то есть */}
			{searchValue && (
				<img
					// Чтобы функция не вызывалась автоматически по открытию скобок - оборачиваем ее в стрелочную функцию
					onClick={clearInput}
					className={styles.close}
					src={close}
					alt="closeIcon"
				/>
			)}
		</div>
	);
};

export default Search;
