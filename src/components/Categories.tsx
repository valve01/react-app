import React from 'react';

type CategoriesProps = {
	activeCategory: number;
	onClickSetActiveCategory?: (i:number) => void;
};
// void означает, что функция не требует возвращения при помощи return например, т.е. ничего не вернет
// () => void - означает что функция просто должна вызываться (без аргументов)
// (i:number) => void; - означает что функция ничего не вернет, но должна получить 1 аргумент типа number
// чтобы сделать функцию опциональной для использования нужно использовать "?" между названием функции и ":"
// например
// onClickSetActiveCategory?: (i:number) => void; 

// Но теперь функция onClickSetActiveCategory потенциально может быть undefined и TS на это ругается, 
// onClick={() => {
// 	onClickSetActiveCategory(index);
// }}

// => надо делать проверку if на отсутсвие undefined или с помощью ?.

// onClickSetActiveCategory?.(index)



// 1. Вытаскиваем из пропса переменную activeCategory и функцию для ее изменения onClickSetActiveCategory

const Categories: React.FC<CategoriesProps> = ({ activeCategory, onClickSetActiveCategory }) => {
	// Вариант типизации похуже
	// const Categories: React.FC = ({ activeCategory, onClickSetActiveCategory }: CategoriesProps) => {

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
	return (
		<div className="categories">
			<ul>
				{categories.map((value, index) => {
					return (
						<li
							key={index}
							onClick={() => {
								onClickSetActiveCategory?.(index);
							}}
							className={activeCategory === index ? 'active' : ''}
						>
							{value}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Categories;
