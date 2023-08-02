import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
	// const params = useParams();
	// console.log(params);
	const { id } = useParams();
	return (
		<div className="container">
			<img
				src=""
				alt=""
			/>
			<h2>{id}</h2>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, error deserunt veritatis quam
				aspernatur non necessitatibus reiciendis impedit? Enim, quisquam ducimus. Obcaecati quia, fugit
				facere cupiditate placeat magnam tenetur blanditiis.
			</p>
			<h4> 350 </h4>
		</div>
	);
};

export default FullPizza;
