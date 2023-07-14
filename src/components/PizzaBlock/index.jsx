// import React, { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../../redux/slices/cartSlice';

const typeNames = ['тонкое', 'традиционное'];

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
	// function PizzaBlock(props) {

	// Делаем логику счетчику на кнопке добавить
	const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));

	// console.log(cartItem )

	const addedCount = cartItem ? cartItem.count : 0;
	// console.log(addedCount)
	// Объявляем переменную (pizzaCount), функцию,которая будет ее изменять (setPizzaCount), и говорим какой к этому массиву применить хук (useState(0)). И задаем начальное значение хуку.

	// const [pizzaCount, setPizzaCount] = useState(0);
	// Также можно не делать деструктуризацию вначале файла, а просто:
	// import React from 'react';
	// Но тогда, если мы хотим присвоить хук, сначала нужно будет обраться к переменной, в которой содержится весь реакт
	// const [pizzaCount, setPizzaCount] = React.useState(0);

	// Мы навесили прослушку onClickBtn на button ниже в коде, и теперь говорим : Фукция (setPizzaCount), меняющая pizzaCount, возьми pizzaCount добавь к ней 1.
	// const onClickBtn = () => {
	// 	setPizzaCount(pizzaCount + 1);
	// };

	const [activeType, setActiveType] = React.useState(0);
	const onClickType = (index) => {
		setActiveType(index);
	};
	const [activeSize, setActiveSize] = React.useState(0);

	const dispatch = useDispatch();

	const onClickAddItem = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			size: sizes[activeSize],
			type: typeNames[activeType],
		};
		dispatch(addItem(item));
	};

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<img
					className="pizza-block__image"
					src={imageUrl}
					alt="Pizza"
				/>
				<h4 className="pizza-block__title">{title}</h4>
				{/* 		<h4 className="pizza-block__title">{props.title}</h4> */}
				<div className="pizza-block__selector">
					<ul>
						{types.map((type, index) => {
							return (
								<li
									key={type}
									onClick={() => onClickType(index)}
									className={activeType === index ? 'active' : ''}
								>
									{typeNames[type]}
								</li>
							);
						})}

						{/* <li className="active">тонкое</li>
					<li>традиционное</li> */}
					</ul>
					<ul>
						{/* Обращаемся к массиву sizes, который мы вытащили из пропса в PizzaBlock(), применяем к нему метод map, вытаскиваем каждый элемент массива sizes и рендерим его внутри тэга li столько же раз, какова длинна массива sizes. */}
						{sizes.map((size, index) => {
							return (
								<li
									key={size}
									onClick={() => setActiveSize(index)}
									className={activeSize === index ? 'active' : ''}
								>
									{size} см.
								</li>
							);
						})}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					{/* 				<div className="pizza-block__price">от {props.price} ₽</div> */}
					<button
						// Чтобы навесить прослушку используем атрибут onClick-и присваиваем функцию (в нашем случае onClickBtn), для обработки этого события
						onClick={onClickAddItem}
						className="button button--outline button--add"
					>
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
						{/* Тут мы используем полученную переменную */}
						{/* <i>{pizzaCount}</i> */}
						{/* Можно оборачивать в {} целиком тэги */}
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
}

export default PizzaBlock;
