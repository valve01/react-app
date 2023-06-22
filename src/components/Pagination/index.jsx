import React from 'react';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const theme = createTheme({
	palette: {
		primary: {
			main: '#fe5f1e',
		},
	},
});
const PaginationBlock = ({ onChangePage, currentPage }) => {
	// const [currentPage, setCurrentPage] = React.useState(1);
	const handleChange = (event, value) => {
		onChangePage(value);
	};
	return (
		<div>
			<Stack spacing={2}>
				<Typography>Page: {currentPage}</Typography>
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
