
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
	const cartLS = localStorage.getItem('cart');

	const items = cartLS ? JSON.parse(cartLS) : [];
	const totalPrice = calcTotalPrice(items);
	return { totalPrice, items };
};
