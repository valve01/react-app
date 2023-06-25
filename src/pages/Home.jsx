import React from 'react';
// ReduxToolkit - это JS библиотека, НЕ React библиотека => В ней нет хуков. Хуки берем из react-redux. Чтобы пользовать хуками из react их не нужно импортировать
import { useSelector, useDispatch } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { setActiveCategory } from '../redux/slices/filterSlice';
const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	// const [activeSort, setActiveSort] = React.useState({
	// 	name: 'популярности (сначала популярные)',
	// 	sortProperty: 'rating',
	// });
	const { searchValue } = React.useContext(SearchContext);
	const [currentPage, setCurrentPage] = React.useState(1);
	// Вытаскиваем activeCategory из Redux слайса. Этим хуком можно вообще все данные из хранилища вытащить (оно все записано в state. Получается наш state === store.reducer).
	// В слайсах только логика хранится и начальное состояния стейтов, а значания стейтов лежат все в store. И достам мы их из store, обращаясь к его названиям слайсов и их свойствам, как в каталоге, а не напряму лезем в слайс
	// const activeCategory = useSelector((state) => state.filter.activeCategory);
	// Достаем функцию, которая будет изменение нашего стейта сохранять/записывать и помещать его в store. Как в мегафон будет кричать, чтобы state изменился
	const dispatch = useDispatch();
	// Функция, которую предоставляет нам хук useDispatch хранится также в store. store.dispatch===dispatch. Только store тогда вытащить нужно из store.js.
	// dispatch достали и теперь он говорит, давай мне функцию, которая будет метять state. Ну мы и даем, она у нас в reducers прописана в слайсе - это setActiveCategory().
	// На забываем только ее добсать из слайса
	// import { setActiveCategory } from '../redux/slices/filterSlice';
	// И в setActiveCategory() мы уже передаем index, который получили из Categories.jsx
	const onClickSetActiveCategory = (index) => {
		// Этот index мы передали ещё в Categories.jsx в onClick
		// console.log(index);
		dispatch(setActiveCategory(index));
		// Теперь setActiveCategory(index) - вернет тот же объект типа, (что и console.log(action) в слайсе): {type: 'filters/setActiveCategory', payload: {index}}, а потом мы с помощью dispatch присваиваем значение ключа payload нашему стейту и сохраняем это изменение в store
	};
	// console.log('activeCategory:', activeCategory);

	// const activeSort = useSelector((state) => state.filter.sortType);
	const { sortType, activeCategory } = useSelector((state) => state.filter);
	// const activeSort = sortType.sortProperty;

	// console.log(activeSort);
	const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizzaBlock key={index} />);
	const pizzas = items.map((obj) => {
		return (
			<PizzaBlock
				key={obj.id}
				{...obj}
			/>
		);
	});

	React.useEffect(() => {
		setIsLoading(true);
		// console.log(activeSort);
		fetch(
			// Можно использовать шаблонную строку внутри другой шаблонной строки. Не имеет значение в каком месте прописано уточнение запроса
			`https://64845cf9ee799e3216269459.mockapi.io/items?${
				activeCategory > 0 ? `category=${activeCategory}` : ''
				// Если у нас "-" в sortProperty - то вырезаем его, чтобы он не пошел в запрос
			}&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
				// В зависимости от того есть "-" или нет меняем тип сотрировки: по убыванию или возрастанию
				sortType.sortProperty.includes('-') ? 'asc' : 'desc'
				// Пишем условие для фильтрации. Если что-то есть в инпуте - присваивам это параметру filter
			}&filter=${
				searchValue ? searchValue : ''
				// Пишем пагинацию
			}&page=${currentPage}&limit=4`,
		)
			.then((res) => res.json())
			// Потребляем промис, извлекая из него нужный нам массив объектов
			.then((arr) => {
				// Присваиваем переменной items массив, полученный с сервера
				setItems(arr);
				// Устанавливаем флаг загрузки в false, когда мы уже получили массив данных с сервера
				setIsLoading(false);
			});
		// Чтобы при рендере автоматически страница вверх прокрутилась
		window.scrollTo(0, 0);
	}, [activeCategory, sortType, searchValue, currentPage]);
	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories
						activeCategory={activeCategory}
						// 4 index - в стрелочной ф-ции ниже получен из
						// Categories.jsx в строке onClick={() => {onClickSetActiveCategory(index)}}
						onClickSetActiveCategory={onClickSetActiveCategory}
					/>
					<Sort
					// activeSort={activeSort}
					// onClickSetActiveSort={(listObj) => setActiveSort(listObj)}
					/>
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<Pagination
					currentPage={currentPage}
					onChangePage={(value) => {
						setCurrentPage(value);
					}}
				/>
				<div className="content__items">{isLoading ? skeleton : pizzas}</div>
			</div>
		</>
	);
};

export default Home;
