// import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const rootElem = document.getElementById('root');

// Делаем проверку существует ли на странице элемент root, чтобы TS был уверен, что ему  не вернется null
if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);
	root.render(
		// Все наше приложение должно быть обернуто в <BrowserRouter></BrowserRouter>, так все приложение получает доступ к возможностям react-router и к его логике
		<Provider store={store}>
			<HashRouter>
				{/* <BrowserRouter> */}
				{/* <BrowserRouter basename='/react-app-study'> */}
				{/* <React.StrictMode> */}
				<App />
				{/* </React.StrictMode> */}
				{/* </BrowserRouter> */}
			</HashRouter>
		</Provider>,
	);
}
