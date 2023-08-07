import React from 'react';
// ReduxToolkit - это JS библиотека, НЕ React библиотека => В ней нет хуков. Хуки берем из react-redux. Чтобы пользовать хуками из react их не нужно импортировать
import { useSelector, useDispatch } from 'react-redux';

import qs from 'qs';
import EmptyCart from '../components/EmptyCart';
import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

import { setActiveCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzasFromRedux, selectorFilter, selectorPizzas } from '../redux/slices/pizzasSlice';
import { list } from '../components/Sort';
const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const { sortType, activeCategory, currentPage, searchValue } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzas);

	const onClickSetActiveCategory = (index) => {
		dispatch(setActiveCategory(index));
	};

	const onChangePage = (value) => {
		dispatch(setCurrentPage(value));
	};

	const fetchPizzas = async () => {
		const category = activeCategory > 0 ? `category=${activeCategory}` : '';
		const sort = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const filter = searchValue ? searchValue : '';

		dispatch(
			fetchPizzasFromRedux({
				category,
				sort,
				order,
				filter,
				currentPage,
			}),
		);
	};
	// Если был первый рендер, то проверяем url-параметры и сохраняем в редаксе
	React.useEffect(() => {
		const params = qs.parse(window.location.search.substring(1));
		const sortType = list.find((obj) => obj.sortProperty === params.sortProperty);
		// console.log(params, sortType);
		dispatch(setFilters({ ...params, sortType }));
		// eslint-disable-next-line
	}, []);

	React.useEffect(() => {
		fetchPizzas();
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeCategory, sortType, searchValue, currentPage]);

	React.useEffect(() => {
		const queryString = qs.stringify({
			sortProperty: sortType.sortProperty,
			activeCategory: activeCategory,
			currentPage: currentPage,
		});
		// console.log(queryString);
		navigate(`?${queryString}`);
		// eslint-disable-next-line
	}, [activeCategory, sortType, searchValue, currentPage]);

	const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizzaBlock key={index} />);

	const pizzas = items.map((obj) => (
		<PizzaBlock
			key={obj.id}
			{...obj}
		/>
	));
	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories
						activeCategory={activeCategory}
						onClickSetActiveCategory={onClickSetActiveCategory}
					/>
					<Sort />
				</div>

				{status === 'error' ? (
					<EmptyCart />
				) : (
					<>
						<h2 className="content__title">Все пиццы</h2>
						<Pagination onChangePage={onChangePage} />
						<div className="content__items">{status === 'success' ? pizzas : skeleton}</div>
					</>
				)}
			</div>
		</>
	);
};

export default Home;
