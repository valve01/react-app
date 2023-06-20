import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

// Можно просто прописать путь до папки, без указания файла, но при условии, что файл будет называться index.jsx/index.js

import './scss/app.scss';

// import pizzas from './assets/pizzas.json';



function App() {
	const [searchValue, setSearchValue] = useState('');
	// Прокинув useState по цепочке аж до search.jsx проверяем. Изменяя значение инпута в дочернем компоненте, в родителе перезаписывается значение переменной из хука useState.
	console.log(searchValue, 'input changed')
	return (
		<div className="wrapper">
			<Header
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={
							<Home
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
						}
					/>
					{/* / Для главной можно и не указывать в пути */}
					{/* <Route
							path=""
							element={<Home />}
						/> */}
					<Route
						path="/123"
						element={<h1>123</h1>}
					/>
					<Route
						path="/cart"
						element={<Cart />}
					/>
					{/* <Route
							path="/not-found"
							element={<NotFound />}
						/> */}
					{/* Конкрено в случае 404 страницы ее указывают для всех остальных путей, в конце перечня страниц. Так Routes пройдется по всему перечню Route, при изменении адресной строки, и если найдет совпадения адресной строки и path - отобразит соответствующий контент. */}
					<Route
						path="*"
						element={<NotFound />}
					/>
					{/* Можно не просто вшивать значения, а использовать маски. В данном случае, если будут какие-то символы после pizzas/ то отрендерится указанный компонент */}
					{/* <Route
							path="/pizzas/:id"
							element={<NotFound />}
						/> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
