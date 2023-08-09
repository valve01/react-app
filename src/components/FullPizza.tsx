import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState();
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

	if (pizza) {
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
