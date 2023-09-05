import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectorSort, setActiveSortType } from '../redux/slices/filterSlice';

type SortItem = {
	name: string;
	sortProperty: string;
};

export const list: SortItem[] = [
	// Чтобы прикрутить логику, что если выбираем "популярности"- сортировать по полю rating, "цене" - по полю price, "алфавиту" - title. Создаем массив объектов и исправляем весь код ниже в соответствии с этими объектами -->
	{ name: 'популярности (сначала популярные)', sortProperty: 'rating' },
	{ name: 'популярности (сначала непопулярные)', sortProperty: '-rating' },
	{ name: 'цене (сначала дороже)', sortProperty: 'price' },
	{ name: 'цене (сначала дешевле)', sortProperty: '-price' },
	{ name: 'алфавиту (А-Я)', sortProperty: '-title' },
	{ name: 'алфавиту (Я-А)', sortProperty: 'title' },
];

function Sort() {
	const activeSort = useSelector(selectorSort);
	// 	const activeSort = useSelector((state) => state.filter.sortType);
	const dispatch = useDispatch();
	// console.log(activeSort)
	const [isShow, setIsShow] = React.useState(false);

	// const [activelistElement, setActivelistElement] = React.useState(list[0]);
	const onClickSetActEl = (listObj: SortItem) => {
		dispatch(setActiveSortType(listObj));
		// console.log(listObj);
		setIsShow(!isShow);
	};
	const sortRef = useRef<HTMLDivElement>(null);

	React.useEffect(() => {

		type popupCloserEvent = MouseEvent & {
			composedPath: Node[];
		};
		
		const popupCloser = (event: MouseEvent) => {
			const _event = event as popupCloserEvent;
			if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
				setIsShow(false);
			}
		};

		// Мы можем вешать обработчики через addEventListener на "главных родителей", к которым по другому нельзя обратиться из компонента
		window.document.body.addEventListener('click', popupCloser);

		// Эта стрелочная функция внутри return будет вызываться перед размонтированием элемента. Она и будет удалять наш обработчик при переходе на другие страницы
		return () => {
			window.document.body.removeEventListener('click', popupCloser);
		};
	}, []);

	return (
		<div
			className="sort"
			ref={sortRef}
		>
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				{/* Тут setIsShow(!isShow) автоматически берет протовоположное значение isShow и присваивает его isShow. Как бы делает isShow=!isShow */}
				<span onClick={() => setIsShow(!isShow)}>{activeSort.name}</span>
			</div>
			{/* Условный рендеринг. Можно его делать с помощью &&, можно с помощью тернарного оператора. Главное условие - условие должно быть однострочное. (if - else -это многострочное условие) */}
			{isShow && (
				<div className="sort__popup">
					<ul>
						{list.map((listObj) => {
							// console.log(listObj);
							return (
								<li
									key={listObj.name}
									// В Home.jsx при помощи onClickSetActEl(listObj) и далее onClickSetActiveSort(listObj) на каждой итерации map отравляется весь объект listObj, который мы берем из list
									onClick={() => onClickSetActEl(listObj)}
									className={activeSort.name === listObj.name ? 'active' : ''}
								>
									{listObj.name}
								</li>
							);
						})}
						{/* <li className="active">популярности</li>
						<li>цене</li>
						<li>алфавиту</li> */}
					</ul>
				</div>
			)}
			{/* {isShow ? (
				<div className="sort__popup">
					<ul>
						<li className="active">популярности</li>
						<li>цене</li>
						<li>алфавиту</li>
					</ul>
				</div>
			) : ("Попап скрыт"
			)} */}
		</div>
	);
}
export default Sort;
