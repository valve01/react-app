import React from 'react';

type CategoriesProps = {
	activeCategory: number;
	onClickSetActiveCategory: any;
};

// 1. Вытаскиваем из пропса переменную activeCategory и функцию для ее изменения onClickSetActiveCategory

const Categories: React.FC<CategoriesProps> = ({ activeCategory, onClickSetActiveCategory }) => {
	// Вариант типизации похуже
// const Categories: React.FC = ({ activeCategory, onClickSetActiveCategory }: CategoriesProps) => {

	// const [activeIndex, setActiveIndex] = React.useState(0);
	// 2. Проверяем что мы вытащили
	// console.log(activeCategory);

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
	return (
		<div className="categories">
			<ul>
				{/* Благодаря методу массивов map можно любой массив преобразовать в jsx функциональный расширяемый компонент */}
				{/* Метод map преобразует массивы - он подставляет значение из начального массива на каждой итерации в конечный*/}
				{/* Метод map принимает первым параметном - значение элемента массива, вторым - его индекс */}
				{/*ВАЖНО В реакте нельзя рендерить списки без родителя. Но можно не рендерить родителя, для этого не указываем никакой тэг в треугольных скобках. Это называется ФРАГМЕНТ:
				Например
				
				<>
					<h1>111</h1>
					<h1>222</h1>
				</>

				то же самое

				<React.Fragment>
					<h1>111</h1>
					<h1>222</h1>
				</React.Fragment>
				
				При такой записи родитель не отрендерится, его дочерние элементы поднимутся на его уроверь. Но при этом обертка для реакта сохранится и он будет корректно работать.
				*/}
				{categories.map((value, index) => {
					return (
						<li
							key={index}
							onClick={() => {
								// 3 Меняем функцию, вызывающуюся по клику на категорию на ту, что вытащили из пропса.
								//4 !ВАЖНО! Причем аргумент с которым мы эту функцию вызываем пойдет в Home.jsx и там подствится в стрелочную ф-цию, которую мы передаем в пропс в атрибуте onClickSetActiveCategory (Подробнее ReactPizza #9 таймкод 27:00 - 30:00)
								onClickSetActiveCategory(index);
								// setActiveIndex(index);
							}}
							// 4 Заменяем переменную, на ту, что вытащили из пропса
							className={activeCategory === index ? 'active' : ''}
							// className={activeIndex === index ? 'active' : ''}
						>
							{value}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
// function Categories() {
// 	const [activeIndex, setActiveIndex] = React.useState(0)

// 	const onClickCategory = (index) => { setActiveIndex(index) }

// 	return (
// 		<div className="categories">
// 			<ul>
// 				<li onClick={() => { onClickCategory(0) }} className={activeIndex === 0 ? "active" : ""}>Все</li>
// 				<li onClick={() => { onClickCategory(1) }} className={activeIndex === 1 ? "active" : ""}>Мясные</li>
// 				<li onClick={() => { onClickCategory(2) }} className={activeIndex === 2 ? "active" : ""}>Вегетарианская</li>
// 				<li onClick={() => { onClickCategory(3) }} className={activeIndex === 3 ? "active" : ""}>Гриль</li>
// 				<li onClick={() => { onClickCategory(4) }} className={activeIndex === 4 ? "active" : ""}>Острые</li>
// 				<li onClick={() => { onClickCategory(5) }} className={activeIndex === 5 ? "active" : ""}>Закрытые</li>
// 			</ul>
// 		</div>
// 	);
// }

export default Categories;
