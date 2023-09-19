import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import EmptyCart from '../components/EmptyCart';
import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

// import { add } from '../utils/math';
import { setActiveCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import {
	fetchPizzasFromRedux,
	SearchPizzaParams,
	selectorFilter,
	selectorPizzas,
} from '../redux/slices/pizzasSlice';
import { list } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
// import { useWhyDidYouUpdate } from 'ahooks';
const Home: React.FC = () => {

	import("../utils/math").then(math => {
		console.log(math.add(2222, 4444));
	});

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	const { sortType, activeCategory, currentPage, searchValue } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzas);
	// add(7777, 9999);
	const onClickSetActiveCategory = React.useCallback((index: number) => {
		dispatch(setActiveCategory(index));
	}, []);

	const onChangePage = (value: number) => {
		dispatch(setCurrentPage(value));
		// dispatch(fetchPizzasFromRedux(value))
	};

	const fetchPizzas = async () => {
		const category = activeCategory > 0 ? `category=${activeCategory}` : '';
		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const filter = searchValue ? searchValue : '';

		dispatch(
			fetchPizzasFromRedux({
				category,
				sortBy,
				order,
				filter,
				currentPage: String(currentPage),
			}),
		);
	};

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sortType = list.find((obj) => obj.sortProperty === params.sortBy);

			dispatch(
				setFilters({
					sortType: sortType || list[0],
					activeCategory: Number(params.category),
					searchValue: params.search,
					currentPage: Number(params.currentPage),
				}),
			);
			// 			dispatch(setFilters({ ...params, sortType } as unknown as IFilterSliceState));

			isSearch.current = true;
		}
		// eslint-disable-next-line
	}, []);

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType.sortProperty,
				activeCategory: activeCategory,
				currentPage: currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
		// eslint-disable-next-line
	}, [activeCategory, sortType, searchValue, currentPage]);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeCategory, sortType, searchValue, currentPage]);

	const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizzaBlock key={index} />);

	const pizzas = items.map((obj: any) => (
		<PizzaBlock
			key={obj.id}
			{...obj}
		/>
	));

	// console.log(activeCategory)

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
