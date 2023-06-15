import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// Все наше приложение должно быть обернуто в <BrowserRouter></BrowserRouter>, так все приложение получает доступ к возможностям react-router и к его логике
	<BrowserRouter>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</BrowserRouter>,
);
