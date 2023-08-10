import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	// const params = useParams();
	// console.log(params);
	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://64845cf9ee799e3216269459.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				alert('Не удалось получить подробное описание');
				navigate('/');
			}
		}
		fetchPizza();
		// eslint-disable-next-line
	}, [id]);
	// До проверки pizza - это объект или undefined
// const pizza: {
//     imageUrl: string;
//     title: string;
//     price: number;
// } | undefined
	if (pizza) {
// Благодаря проверке выше последующий код уверен, что pizza не будет undefined 
// Поэтому при наведении на pizza больше не показывает что она может быть undefined
// 		const pizza: {
//     imageUrl: string;
//     title: string;
//     price: number;
// }
// Такой же эффект будет если передать объкет по умолчанию в () во время использования useState
	// const [pizza, setPizza] = React.useState<{
	// 	imageUrl: string;
	// 	title: string;
	// 	price: number;
	//	}>({
	// 	imageUrl: "";
	// 	title: "";
	// 	price: 0;
	// 	})
	//	Тогда такая проверка не понадобится
		return (
			<div className="container">
				<img
					src={pizza.imageUrl}
					alt=""
				/>
				<h2>{pizza.title}</h2>
				<p>
					Описание данной пиццы.Описание данной пиццы.Описание данной пиццы.Описание данной пиццы.Описание
					данной пиццы.Описание данной пиццы.Описание данной пиццы.Описание данной пиццы.
				</p>
				<h4> {pizza.price} </h4>
			</div>
		);
	} else {
		return <>'Загрузка'</>;
	}
};

export default FullPizza;
