import { useWhyDidYouUpdate } from 'ahooks';
import React from 'react';

type CategoriesProps = {
	activeCategory: number;
	onClickSetActiveCategory?: (i:number) => void;
};


const Categories: React.FC<CategoriesProps> = React.memo(({ activeCategory, onClickSetActiveCategory }) => {
	// Вариант типизации похуже
	// const Categories: React.FC = ({ activeCategory, onClickSetActiveCategory }: CategoriesProps) => {

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	useWhyDidYouUpdate("Categories", {activeCategory, onClickSetActiveCategory})

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
})

export default Categories;
