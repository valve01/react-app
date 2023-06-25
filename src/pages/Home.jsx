import React from 'react';
// ReduxToolkit - это JS библиотека, НЕ React библиотека => В ней нет хуков. Хуки берем из react-redux или react
import { useSelector, useDispatch } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setActiveCategory } from '../redux/slices/filterSlice';
const Home = () => {
	// Используем хук useState и т.к. мы хотим в item записать массив, то по умолчанию зададим пустой массив.
	const [items, setItems] = React.useState([]);
	// Создаем флаг, который будет сигнализировать о процессе загрузке и  НЕготовности отображения данных с сервера
	const [isLoading, setIsLoading] = React.useState(true);

	//1 Переносим States из Categories.jsx и Sort.jsx. Эти параметры нам нужно будет передавать в url для fetch. Займемся Categories.jsx. Для начала вытащим эти стейты и прокинем их в соответствующие дочерние элементы.  Для этого помещаем переменные в пропс дочернего элемента ((2) <Categories>).
	// const [activeCategory, setActiveCategory] = React.useState(0);
	const [activeSort, setActiveSort] = React.useState({
		// Задаем параметры сортировки при первой отрисовке
		name: 'популярности (сначала популярные)',
		sortProperty: 'rating',
	});

	const { searchValue } = React.useContext(SearchContext);

	const [currentPage, setCurrentPage] = React.useState(1);

	// Вытаскиваем activeCategory из Redux слайса. Этим хуком можно вообще все данные из хранилища вытащить (оно все записано в state. Получается наш state === store.reducer). 
	// В слайсах только логика хранится и начальное состояния стейтов, а значания стейтов лежат все в store. И достам мы их из store, обращаясь к его названиям слайсов и их свойствам, как в каталоге, а не напряму лезем в слайс
		const activeCategory = useSelector((state) => state.filter.activeCategory);
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
		dispatch(setActiveCategory(index))
		// Теперь setActiveCategory(index) - вернет тот же объект типа, (что и console.log(action) в слайсе): {type: 'filters/setActiveCategory', payload: {index}}, а потом мы с помощью dispatch присваиваем значение ключа payload нашему стейту и сохраняем это изменение в store
	};

	// console.log('activeCategory:', activeCategory);

	const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizzaBlock key={index} />);
	const pizzas = items.map((obj) => {
		return (
			<PizzaBlock
				key={obj.id}
				{...obj}
			/>
		);
	});
	// Добавим фильтрацию нашему массиву пицц перед рендером при помощи js. Способ фильтрации по средствам js используется для статичных массивов. (?не работает для большого количества объектов)
	// const pizzas = items
	// 	.filter((obj) => {
	// 		// Приводим к нижнему регистру названия пицц в объекте и значение инпута. Если есть сопадения - ставим флаг true и дальше выполняется map для этого item и его рендер. В противном случае - флаг false, item - пропускаем.
	// 		if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
	// 			return true;
	// 		}
	// 		return false;
	// 	})
	// 	.map((obj) => {
	// 		return (
	// 			<PizzaBlock
	// 				key={obj.id}
	// 				{...obj}
	// 			/>
	// 		);
	// 	});
	// Закончили с фильтрацией

	// хук useEffect дает возможность выполнять действия во время событий жизненного цикла компонента. Первое появление на странице, изменение, удаление со страницы. Первым аргументом он принимает анонимную функцию. Вторым - массив, отслеживаемых переменных. Если массив пуст, то код из первого аргумента отработает только во время первичного рендера (componentWillMount). Если в массиве переменные, код сработает каждый раз, при изменении отслеживаемых переменных (componentWillUpdate). Если не указывать второй аргумент, то код будет отрабатывать на каждое событие, изменяющее компонент (добавление/удаление/изменение любых данных). Если внутри первого аргумента сделать return и указать ему еще одну анонимную функцию, - это будет та функция, которая будет вызываться непосредственно перед удалением компонента (componentWillUnmount).
	React.useEffect(() => {
		setIsLoading(true);

		// Будем использовать https://mockapi.io/ чтобы реально получать данные с сервера.
		// Далаем запрос на сервак, как если бы файл pizzas.json был только на сервере.

		// fetch('https://64845cf9ee799e3216269459.mockapi.io/items')
		// 5. Сделаем, чтобы запрос менялся в зависимости от выбранной категории
		fetch(


			// Можно использовать шаблонную строку внутри другой шаблонной строки. Не имеет значение в каком месте прописано уточнение запроса
			`https://64845cf9ee799e3216269459.mockapi.io/items?${
				activeCategory > 0 ? `category=${activeCategory}` : ''
				// Если у нас "-" в sortProperty - то вырезаем его, чтобы он не пошел в запрос
			}&sortBy=${activeSort.sortProperty.replace('-', '')}&order=${
				// В зависимости от того есть "-" или нет меняем тип сотрировки: по убыванию или возрастанию
				activeSort.sortProperty.includes('-') ? 'asc' : 'desc'
				// Пишем условие для фильтрации. Если что-то есть в инпуте - присваивам это параметру filter
			}&filter=${
				searchValue ? searchValue : ''
				// Пишем пагинацию
			}&page=${currentPage}&limit=4`,
		)
			// 6. Дальше нам нужно сделать, чтобы useEffect перезапускался (и соответсвенно перерисовывал контент при изменении states, для этого нужно включить ослеживание переменной для хука useEffect. Прописываем в массив (во второй аргумент useEffect) - activeCategory.
			// 7. Теперь все работает, но у нас отвалился скелетон. Это потому что в конце первой прорисовки у нас устанавливается setIsLoading(false). Просто добавим setIsLoading(true) перед fetch, так при каждом запуске useEffect будет устанавливаться флаг IsLoading(true), а в конце работы useEffect - обратно будет выставляться флаг IsLoading(false)
			// 8. Готово!
			// Получаем ответ от сервера и преобразуем его в промис, и указываем, что хотим получить данные в формате json.
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
		// Включаем слежение: если меняются категории или/и сортировка - useEffect => делай запрос на сервак. Добавляя функционал фильтрации не забываем добавить отслеживание переменной searchValue.
	}, [activeCategory, activeSort, searchValue, currentPage]);
	return (
		<>
			<div className="container">
				<div className="content__top">
					{/* В jsx родитель элемента не может получить сведения о стейтах (States) дочерних элементов. Но зато можно разместить States, необходимые для дочерних элементов внутри родителя и передавать их внутрь дочерних элементов как параметры. Сделаем же это для компонентов ниже. */}
					{/*2 помещаем переменную и функцию для ее изменения в пропс дочернего элемента. Но также нам нужно передать параметр, с которой будет вызываться функция. Для этого нужно вызвать ее и в () передать этот параметр, так она сразу вызовется с параметром. Но нам нужно делать это по клику, поэтому мы завернем эту функцию в другую безымянную стрелочную ф-цию. Тогда наша setActiveCategory не будет вызываться сразу  */}
					{/*3 Переходим в Categories.jsx. */}
					<Categories
						activeCategory={activeCategory}
						// 4 index - в стрелочной ф-ции ниже получен из
						// Categories.jsx в строке onClick={() => {onClickSetActiveCategory(index)}}
						onClickSetActiveCategory={onClickSetActiveCategory}
					/>
					<Sort
						activeSort={activeSort}
						// Теперь setActiveSort записывает в activeSort объект listObj, который мы берем из list. Переходим в fetch и там вытаскиваем из него sortProperty
						onClickSetActiveSort={(listObj) => setActiveSort(listObj)}
					/>
				</div>

				<h2 className="content__title">Все пиццы</h2>
				<Pagination
					currentPage={currentPage}
					// Номер активной страницы будет зависеть от того что вернет этот компонент
					onChangePage={(value) => {
						setCurrentPage(value);
					}}
				/>
				<div className="content__items">
					{/* Скелетону тоже нужно key задавать, но т.к. obj.id у нас нет, до получения ответа от сервака, будем использовать индексы фейкового массива. Т.к. мы не собираеся использовать первый аргумент в стрелочной функции, назовем его _ . Кроме того в фейковом массиве нет значений и js будет ругаться, что мы из undefined хотим получить данные в первый аргумент. */}
					{isLoading ? skeleton : pizzas}
				</div>
			</div>
		</>
	);
};

export default Home;
