import React from 'react';
import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState('');
	// eslint-disable-next-line
	const updateSearchValue = React.useCallback(
		debounce((value: string) => {
			dispatch(setSearchValue(value));
		}, 500),

		[],
	);
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Чтобы типизировать event для реакта пишем для onChange : React.ChangeEvent<...>, где в <...> указываем элемент, (в котором произошло событие) который отправляет event (в нашем случае это HTMLInputElement)(чтобы узнать какой это элемент наводим в разметке на onChange в месте вызова функции использующей event)
		// Для event на события мыши (onClick) пишем :React.MouseEvent<...>, где в <...> указываем элемент, который отправляет event
		// например
		// 	const clearInput = (event: React.MouseEvent<HTMLImageElement>) => {
		// Для JS пишем просто Event
		setValue(event.target.value);

		updateSearchValue(event.target.value);
	};

	const inputRef = React.useRef<HTMLInputElement>(null);

	const clearInput = (event: React.MouseEvent<HTMLImageElement>) => {
		// console.log(event)
		dispatch(setSearchValue(''));
		setValue('');

		inputRef.current?.focus();
	};

	return (
		<div className={styles.root}>
			<img
				className={styles.icon}
				src={searchIcon}
				alt="searcIcon"
			/>

			<input
				ref={inputRef}
				value={value}
				className={styles.input}
				onChange={onChangeInput}
				type="text"
				placeholder="Поиск пицц..."
			/>

			{value && (
				<img
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
