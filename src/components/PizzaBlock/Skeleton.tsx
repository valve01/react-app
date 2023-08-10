import React from 'react';
import ContentLoader from 'react-content-loader';
// Чтобы воспользоваться скелетоном нужно установить библиотеку react-content-loader
// npm i react-content-loader
const SkeletonPizzaBlock = (props:any) => (
	<ContentLoader
		// Чтобы наш скелетон имел те же стили, что и конечный контент- добавим ему тот же класс, что и у контента
		className="pizza-block"
		speed={2}
		width={280}
		height={466}
		viewBox="0 0 280 466"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		// Пропсы нам тут не нужны, можно их удалить, но мы оставили
		{...props}
	>
		<circle
			cx="140"
			cy="125"
			r="125"
		/>
		<rect
			x="124"
			y="418"
			rx="30"
			ry="30"
			width="152"
			height="45"
		/>
		<rect
			x="0"
			y="427"
			rx="0"
			ry="0"
			width="90"
			height="27"
		/>
		<rect
			x="0"
			y="315"
			rx="10"
			ry="10"
			width="280"
			height="88"
		/>
		<rect
			x="0"
			y="266"
			rx="10"
			ry="10"
			width="280"
			height="27"
		/>
	</ContentLoader>
);

export default SkeletonPizzaBlock;
