import { TCartItem } from '../redux/slices/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
	const cartLS = localStorage.getItem('cart');

	const items = cartLS ? JSON.parse(cartLS) : [];
	const totalPrice = calcTotalPrice(items);
	// JSON.parse не знает какой тип он получит, поэтому результат типизируем сами
	return { totalPrice, items: items as TCartItem[] };
};
