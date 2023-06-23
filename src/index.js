import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// Все наше приложение должно быть обернуто в <BrowserRouter></BrowserRouter>, так все приложение получает доступ к возможностям react-router и к его логике
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
			<App />
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
);
