import React from "react";


function Categories() {
	const [activeIndex, setActiveIndex] = React.useState(0)

	const onClickCategory = (index) => { setActiveIndex(index) }
	const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые",]
	return (
		<div className="categories">
			<ul>
				{/* Благодаря методу массивов map можно любой массив преобразовать в jsx функциональный расширяемый компонент */}
				{/* Метод map преобразует массивы - он подставляет значение из начального массива на каждой итерации в конечный*/}
				{/* Метод map принимает первым параметном - значение элемента массива, вторым - его индекс */}
				{/*ВАЖНО В реакте нельзя рендерить списки без родителя. Но можно не рендерить родителя, для этого не указываем никакой тэг в треугольных скобках:
				Например
				
				<>
					<h1>111</h1>
					<h1>222</h1>
				</>

				При такой записи родитель не отрендерится, его дочерние элементы поднимутся на его уроверь. Но при этом обертка для реакта сохранится и он будет корректно работать.
				*/}
				{categories.map((value,index) => {return <li onClick={() => { onClickCategory(index) }} className={activeIndex === index ? "active" : ""}>{value}</li>})}
			</ul>
		</div>
	);
}
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



