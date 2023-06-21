import React from 'react';

import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizzaBlock from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home = ({ searchValue, setSearchValue }) => {
	// Используем хук useState и т.к. мы хотим в item записать массив, то по умолчанию зададим пустой массив.
	const [items, setItems] = React.useState([]);
	// Создаем флаг, который будет сигнализировать о процессе загрузке и  НЕготовности отображения данных с сервера
	const [isLoading, setIsLoading] = React.useState(true);

	//1 Переносим States из Categories.jsx и Sort.jsx. Эти параметры нам нужно будет передавать в url для fetch. Займемся Categories.jsx. Для начала вытащим эти стейты и прокинем их в соответствующие дочерние элементы.  Для этого помещаем переменные в пропс дочернего элемента ((2) <Categories>).
	const [activeCategory, setActiveCategory] = React.useState(0);
	const [activeSort, setActiveSort] = React.useState({
		// Задаем параметры сортировки при первой отрисовке
		name: 'популярности (сначала популярные)',
		sortProperty: 'rating',
	});

	const skeleton = [...new Array(9)].map((_, index) => <SkeletonPizzaBlock key={index} />);
	// const pizzas = items.map((obj) => {
	// 	return (
	// 		<PizzaBlock
	// 			key={obj.id}
	// 			{...obj}  
	// 		/>
	// 	);
	// });
	// Добавим фильтрацию нашему массиву пицц перед рендером. Способ фильтрации по средствам js используется для статичных массивов. (?не работает для большого количества объектов)
	const pizzas = items
		.filter((obj) => {
			// Приводим к нижнему регистру названия пицц в объекте и значение инпута. Если есть сопадения - ставим флаг true и дальше выполняется map для этого item и его рендер. В противном случае - флаг false, item - пропускаем.
			if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
				return true;
			}
			return false;
		})
		.map((obj) => {
			return (
				<PizzaBlock
					key={obj.id}
					{...obj}
				/>
			);
		});

	// хук useEffect дает возможность выполнять действия во время событий жизненного цикла компонента. Первое появление на странице, изменение, удаление со страницы. Первым аргументом он принимает анонимную функцию. Вторым - массив, отслеживаемых переменных. Если массив пуст, то код из первого аргумента отработает только во время первичного рендера (componentWillMount). Если в массиве переменные, код сработает каждый раз, при изменении отслеживаемых переменных (componentWillUpdate). Если не указывать второй аргумент, то код будет отрабатывать на каждое событие, изменяющее компонент (добавление/удаление/изменение любых данных). Если внутри первого аргумента сделать return и указать ему еще одну анонимную функцию, - это будет та функция, которая будет вызываться непосредственно перед удалением компонента (componentWillUnmount).
	React.useEffect(() => {
		setIsLoading(true);

		// Будем использовать https://mockapi.io/ чтобы реально получать данные с сервера.
		// Далаем запрос на сервак, как если бы файл pizzas.json был только на сервере.

		// fetch('https://64845cf9ee799e3216269459.mockapi.io/items')
		// 5. Сделаем, чтобы запрос менялся в зависимости от выбранной категории
		fetch(
			// activeCategory ===
			// 	0 ? 'https://64845cf9ee799e3216269459.mockapi.io/items'
			// 	 : 'https://64845cf9ee799e3216269459.mockapi.io/items?category=' +
			// 	 		activeCategory +
			// 	 		'&' +
			// 	 		'sortBy=' +
			// 	 		activeSort.sortProperty +
			// 	 		'&' +
			// 	 		'order=' +
			// 	 		'desc',

			// Можно использовать шаблонную строку внутри другой шаблонной строки
			`https://64845cf9ee799e3216269459.mockapi.io/items?${
				activeCategory > 0 ? `category=${activeCategory}` : ''
				// Если у нас "-" в sortProperty - то вырезаем его, чтобы он не пошел в запрос
			}&sortBy=${activeSort.sortProperty.replace('-', '')}&order=${
				// В зависимости от того есть "-" или нет меняем тип сотрировки: по убыванию или возрастанию
				activeSort.sortProperty.includes('-') ? 'asc' : 'desc'
			}`,
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
		// Включаем слежение: если меняются категории или/и сортировка - useEffect => делай запрос на сервак
	}, [activeCategory, activeSort]);
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
						onClickSetActiveCategory={(index) => {
							setActiveCategory(index);
							// alert(index);
						}}
					/>
					<Sort
						activeSort={activeSort}
						// Теперь setActiveSort записывает в activeSort объект listObj, который мы берем из list. Переходим в fetch и там вытаскиваем из него sortProperty
						onClickSetActiveSort={(listObj) => setActiveSort(listObj)}
					/>
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">
					{/* Скелетону тоже нужно key задавать, но т.к. obj.id у нас нет, до получения ответа от сервака, будем использовать индексы фейкового массива. Т.к. мы не собираеся использовать первый аргумент в стрелочной функции, назовем его _ . Кроме того в фейковом массиве нет значений и js будет ругаться, что мы из undefined хотим получить данные в первый аргумент. */}
					{isLoading ? skeleton : pizzas}

					{/* {items.map(
	(obj) => {
		// Используем наш флаг, для условия на рендер. Но пока данные не получены с сервера в items по умолчанию записа []-пустой массив, значит map не отработает и скелетоны не отобразятся. Нужен специальный фейковый массив для скелетона. Поэтому мы все переписали, результат выше ^
		return isLoading ? (
			<SkeletonPizzaBlock />
		) : (
			<PizzaBlock
				key={obj.id}
				{...obj}
			/>
		);
	},
	// Спрэд-оператор. Он самостояетельно раскрывает объект и помещает все свойства в пропс этого компонента.
	// Если ВСЕ названия "атрибутов", которые мы вытаскиваем из пропса будут совпадать с названиями ключей объекта, из которого мы достаем данные, то можно просто передать объект с тремя точками. Вот так:

	// < PizzaBlock
	// 	key={obj.id}
	// 	{...obj}
	// />

	// т.к. obj -это массив из pizza.json, то обратившись к нему можно использовать id его элементов

	// И можно не расписывать, как ниже:
	// <PizzaBlock
	// 	title={obj.title}
	// 	price={obj.price}
	// 	imageUrl={obj.imageUrl}
	// 	sizes={obj.sizes}
	// 	types={obj.types}
	// />

	// Или можно чтобы наш скелетон имел те же стили, что и конечный контент- добавим ему тот же класс, что и у контента не внутри компонента, а сюда
	// <SkeletonPizzaBlock className="pizza-block"/>
)} */}
					{/* <PizzaBlock title="Туапсинская" price="700"/> */}
					{/* То что мы передаем в jsx как атрибуты в html добвляется в объект props, который мы можем передать в качестве аргумента в первом параметре функционального компонента, во время его создания  */}
					{/* <PizzaBlock title="Краснодарская" price={800}/> */}
					{/* <PizzaBlock />
<PizzaBlock />
<PizzaBlock />
<PizzaBlock />
<PizzaBlock />
<PizzaBlock />
<PizzaBlock /> */}
					{/* <div className="pizza-block">
	<img
		className="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 className="pizza-block__title">Чизбургер-пицца</h4>
	<div className="pizza-block__selector">
		<ul>
			<li className="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li className="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div className="pizza-block__bottom">
		<div className="pizza-block__price">от 395 ₽</div>
		<div className="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div className="pizza-block">
	<img
		className="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 className="pizza-block__title">Чизбургер-пицца</h4>
	<div className="pizza-block__selector">
		<ul>
			<li className="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li className="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div className="pizza-block__bottom">
		<div className="pizza-block__price">от 395 ₽</div>
		<div className="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div className="pizza-block">
	<img
		className="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 className="pizza-block__title">Чизбургер-пицца</h4>
	<div className="pizza-block__selector">
		<ul>
			<li className="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li className="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div className="pizza-block__bottom">
		<div className="pizza-block__price">от 395 ₽</div>
		<div className="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div className="pizza-block">
	<img
		className="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 className="pizza-block__title">Чизбургер-пицца</h4>
	<div className="pizza-block__selector">
		<ul>
			<li className="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li className="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div className="pizza-block__bottom">
		<div className="pizza-block__price">от 395 ₽</div>
		<div className="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div className="pizza-block">
	<img
		className="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 class="pizza-block__title">Чизбургер-пицца</h4>
	<div class="pizza-block__selector">
		<ul>
			<li class="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li class="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div class="pizza-block__bottom">
		<div class="pizza-block__price">от 395 ₽</div>
		<div class="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div class="pizza-block">
	<img
		class="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 class="pizza-block__title">Чизбургер-пицца</h4>
	<div class="pizza-block__selector">
		<ul>
			<li class="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li class="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div class="pizza-block__bottom">
		<div class="pizza-block__price">от 395 ₽</div>
		<div class="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div class="pizza-block">
	<img
		class="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 class="pizza-block__title">Чизбургер-пицца</h4>
	<div class="pizza-block__selector">
		<ul>
			<li class="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li class="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div class="pizza-block__bottom">
		<div class="pizza-block__price">от 395 ₽</div>
		<div class="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div class="pizza-block">
	<img
		class="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 class="pizza-block__title">Чизбургер-пицца</h4>
	<div class="pizza-block__selector">
		<ul>
			<li class="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li class="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div class="pizza-block__bottom">
		<div class="pizza-block__price">от 395 ₽</div>
		<div class="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div>{' '}
<div class="pizza-block">
	<img
		class="pizza-block__image"
		src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
		alt="Pizza"
	/>
	<h4 class="pizza-block__title">Чизбургер-пицца</h4>
	<div class="pizza-block__selector">
		<ul>
			<li class="active">тонкое</li>
			<li>традиционное</li>
		</ul>
		<ul>
			<li class="active">26 см.</li>
			<li>30 см.</li>
			<li>40 см.</li>
		</ul>
	</div>
	<div class="pizza-block__bottom">
		<div class="pizza-block__price">от 395 ₽</div>
		<div class="button button--outline button--add">
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
					fill="white"
				/>
			</svg>
			<span>Добавить</span>
			<i>2</i>
		</div>
	</div>
</div> */}
				</div>
			</div>
		</>
	);
};

export default Home;
