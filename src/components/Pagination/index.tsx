import React from 'react';
import { useSelector } from 'react-redux';

import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

// import Typography from '@mui/material/Typography';

const theme = createTheme({
	palette: {
		primary: {
			main: '#fe5f1e',
		},
	},
});

type PaginationBlockProps = { onChangePage: (page: number) => void };
// onChangePage это у нас функция, которая должна получить аргумент page, который является number и ничего не вернуть
// Можно оставить вызов функции обязательными, сделать передачу параметров опциональными. Также испольузуется ? перед :
// type PaginationBlockProps = { onChangePage: (page?: number) => void };

const PaginationBlock: React.FC<PaginationBlockProps> = ({ onChangePage }) => {
	// Помним что в value будет помещен номер страницы, это сделала библиотека '@mui/material/styles', потому что мы пользуемся ее компонентном Pagination

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		onChangePage(value);
	};
	const { currentPage } = useSelector((state: { filter: any }) => state.filter);
	// console.log(currentPage)
	return (
		<div>
			<Stack spacing={2}>
				{/* <Typography>Page: {currentPage}</Typography> */}
				<ThemeProvider theme={theme}>
					<Pagination
						// По хорошему в атрибуте ниже должна быть переменная, которую будет отдавать нам бэкенд, в которой скажет сколько всего доступно страниц с установленным лимитом (в запросе "limit=") по данному запросу (fetch).
						count={3}
						color="primary"
						page={currentPage}
						// В Библиотеке material ui событие onChange по компоненту Pagination содержит в себе 2 параметра: 1 - event, 2 - value (значение кнопки, на которую кликнули.)
						// Это значение мы будем передавать в функцию setCurrentPage в качестве аргумента
						onChange={handleChange}
						// onChange={(event, value) => {
						// 	console.log(value);
						// }}
					/>
				</ThemeProvider>
			</Stack>
		</div>
	);
};

export default PaginationBlock;
