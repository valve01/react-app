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
const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	const { sortType, activeCategory, currentPage, searchValue } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzas);

	const onClickSetActiveCategory = (index: number) => {
		dispatch(setActiveCategory(index));
	};

	const onChangePage = (value: number) => {
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
	// Последовательность логики при работе с адресной строкой
	// 1 Если был первый рендер, то проверяем url-параметры и сохраняем в редаксе(актуально если нужно по ссылке загрузить сайт с параметрами настроенными)
	React.useEffect(() => {
		if (window.location.search) {
			// console.log(window.location.search);
			const params = qs.parse(window.location.search.substring(1));
			const sortType = list.find((obj) => obj.sortProperty === params.sortProperty);
			console.log(params, sortType);
			dispatch(setFilters({ ...params, sortType }));
			isSearch.current = true;
		}
		// eslint-disable-next-line
	}, []);
	// 2 Если первого рендера не было, ( а по умолчанию так и есть) тогда ничего вшиваться в url не будет, но теперь то мы знаем что первый рендер произошел и ставим флаг isMounted.current = true. (Помним что useEffect отработает при первом рендере, даже если в его зависимостях не будет изменений).
	// 3. Теперь флаг = true и Если же теперь изменяться зависимости пользователем, то параметры будут вшиваться в url

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType.sortProperty,
				activeCategory: activeCategory,
				currentPage: currentPage,
			});
			// console.log(queryString);
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
		// eslint-disable-next-line
	}, [activeCategory, sortType, searchValue, currentPage]);
	// 4 Тут идет проверка, если параметры были при первом рендере в url, то запрос не отправляй, но флаг, что теперь параметров в url нет в любом случае все же выстави в false : isSearch.current = false. И когда другой useEffect заставит приложение перерисоваться, и флаг у нас уже переключен в false, тогда запрос отправится
	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeCategory, sortType, searchValue, currentPage]);

	const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizzaBlock key={index} />);

	const pizzas = items.map((obj:any) => (
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
