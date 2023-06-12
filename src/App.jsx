import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
// Можно просто прописать путь до папки, без указания файла, но при условии, что файл будет называться index.jsx/index.js
import PizzaBlock from './components/PizzaBlock';
import SkeletonPizzaBlock from './components/PizzaBlock/Skeleton';
import './scss/app.scss';
// import pizzas from './assets/pizzas.json';

function App() {
	// Используем хук useState и т.к. мы хотим в item записать массив, то по умолчанию зададим пустой массив.
	const [items, setItems] = React.useState([]);
	// Создаем флаг, который будет сигнализировать о процессе загрузке и  НЕготовности отображения данных с сервера
	const [isLoading, setIsLoading] = React.useState(true);
	// хук useEffect дает возможность выполнять действия во время событий жизненного цикла компонента. Первое появление на странице, изменение, удаление со страницы. Первым аргументом он принимает анонимную функцию. Вторым - массив, отслеживаемых переменных. Если массив пуст, то код из первого аргумента отработает только во время первичного рендера (componentWillMount). Если в массиве переменные, код сработает каждый раз, при изменении отслеживаемых переменных (componentWillUpdate). Если не указывать второй аргумент, то код будет отрабатывать на каждое событие, изменяющее компонент (добавление/удаление/изменение любых данных). Если внутри первого аргумента сделать return и указать ему еще одну анонимную функцию, - это будет та функция, которая будет вызываться непосредственно перед удалением компонента (componentWillUnmount).
	React.useEffect(() => {
		// Будем использовать https://mockapi.io/ чтобы реально получать данные с сервера.
		// Далаем запрос на сервак, как если бы файл pizzas.json был только на сервере.
		fetch('https://64845cf9ee799e3216269459.mockapi.io/items')
			// Получаем ответ от сервера и преобразуем его в промис, и указываем, что хотим получить данные в формате json.
			.then((res) => res.json())
			// Потребляем промис, извлекая из него нужный нам массив объектов
			.then((arr) => {
				// Присваиваем переменной items массив, полученный с сервера
				setItems(arr);
				// Устанавливаем флаг загрузки в false, когда мы уже получили массив данных с сервера
				setIsLoading(false);
			});
	}, []);
	console.log(items);
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{isLoading
							? // Скелетону тоже нужно key задавать, но т.к. obj.id у нас нет, до получения ответа от сервака, будем использовать индексы фейкового массива. Т.к. мы не собираеся использовать первый аргумент в стрелочной функции, назовем его _ . Кроме того в фейковом массиве нет значений и js будет ругаться, что мы из undefined хотим получить данные в первый аргумент.
							  [...new Array(9)].map((_, index) => <SkeletonPizzaBlock key={index} />)
							: items.map((obj) => {
									return (
										<PizzaBlock
											key={obj.id}
											{...obj}
										/>
									);
							  })}

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
			</div>
		</div>
	);
}

export default App;
