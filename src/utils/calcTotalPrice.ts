import { TCartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: TCartItem[]) => {
	return items.reduce((sum, obj) => {
		return sum + obj.price * obj.count;
	}, 0);
};
