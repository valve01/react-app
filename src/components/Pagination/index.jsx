import React from 'react';
import Pagination from '@mui/material/Pagination';


const PaginationBlock = () => {
	return (
		<div>
			<Pagination
				count={10}
				color="warning"
			/>
		</div>
	);
};

export default PaginationBlock;
