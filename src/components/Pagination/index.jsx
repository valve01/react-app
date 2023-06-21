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
const PaginationBlock = () => {
	const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
	return (
		<div>
			<Stack spacing={2}>
				<Typography>Page: {page}</Typography>
				<ThemeProvider theme={theme}>
					<Pagination
						count={3}
						color="primary"
						page={page}
						onChange={handleChange}

					/>
				</ThemeProvider>
			</Stack>
		</div>
	);
};

export default PaginationBlock;
