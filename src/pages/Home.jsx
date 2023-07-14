import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import qs from 'qs';

import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setActiveCategory, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
const Home = () => {
	const [isLoading, setIsLoading] = React.useState(true);

	const { searchValue } = React.useContext(SearchContext);

	const dispatch = useDispatch();

	const onClickSetActiveCategory = (index) => {
		dispatch(setActiveCategory(index));
	};

	const onChangePage = (value) => {
		dispatch(setCurrentPage(value));
	};

	const { sortType, activeCategory, currentPage } = useSelector((state) => state.filter);

	const items = useSelector((state) => state.pizzas.items);
	const getPizzas = async () => {
		setIsLoading(true);

		const category = activeCategory > 0 ? `category=${activeCategory}` : '';
		const sort = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const filter = searchValue ? searchValue : '';

		try {
			dispatch(
				fetchPizzas({
					category,
					sort,
					order,
					filter,
					currentPage,
				}),
			);
		} catch (error) {
			console.log('ERROR:', error);
		} finally {
			setIsLoading(false);
		}
	};

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
		getPizzas();
	}, [activeCategory, sortType, searchValue, currentPage]);

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
				<h2 className="content__title">Все пиццы</h2>
				<Pagination onChangePage={onChangePage} />
				<div className="content__items">{isLoading ? skeleton : pizzas}</div>
			</div>
		</>
	);
};

export default Home;
