import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from './pages/Home';
// import NotFound from './pages/NotFound';
// import Cart from './pages/Cart';
// import FullPizza from './components/FullPizza';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';

// const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/'./pages/Cart'));

const Cart = Loadable({
	loader: () => import(/*webpackChunkName: "Cart"*/ './pages/Cart'),
	loading: () => <div>Загрузка</div>,
});

const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/ './components/FullPizza'));
// const FullPizzaPage="FullPizza"
// const FullPizzaPage="FullPizza"
// const FullPizza = React.lazy(() => import(/*webpackChunkName: "[request]"*/`./components/${FullPizzaPage}`));

const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound'));
function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<MainLayout />}
			>
				<Route
					path="/react-app-study"
					element={<Home />}
				/>
				<Route
					path="/cart"
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path="/pizza/:id"
					element={<FullPizza />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
