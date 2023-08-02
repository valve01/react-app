import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './components/FullPizza';

import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>

					<Route
						path="/123"
						element={<h1>123</h1>}
					/>

					<Route
						path="/cart"
						element={<Cart />}
					/>

					<Route
						path="/pizza/:id"
						element={<FullPizza />}
					/>

					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
