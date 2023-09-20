// Удобный способ собрать все импорты в одном файле и брать их уже из любого места из него , так получается что в любом файле мы будем из одного импорта иметь доступ ко всем экспортированным компонентам или функциям

// Раздельный реэкспорт компонентов или функций. Есть жирный минус: все импорты попадут в бандл (на каждой странице будут подгружаться ВСЕ чанки), т.к. мы используем их (export{}). Они у нас в объекте отправляются все

// import PizzaBlock from './PizzaBlock';
// import SkeletonPizzaBlock from './PizzaBlock/Skeleton';
// import CartItem from './CartItem';
// import Categories from './Categories';
// import EmptyCart from './EmptyCart';
// import { FullPizza } from './FullPizza';
// import Header from './Header';
// import Sort from './Sort';
// import PaginationBlock from './Pagination';
// import NotFoundBlock from './NotFoundBlock';
// const Pagination = PaginationBlock;

// export {
// 	PizzaBlock,
// 	SkeletonPizzaBlock,
// 	CartItem,
// 	Categories,
// 	EmptyCart,
// 	FullPizza,
// 	Header,
// 	Sort,
// 	Pagination,
// 	NotFoundBlock,
// };

// Более короткая форма записи кода, что выше. Он тоже засул в бандл все подряд


// export { default as PizzaBlock } from './PizzaBlock';
// export { default as SkeletonPizzaBlock } from './PizzaBlock/Skeleton';
// export { default as CartItem } from './CartItem';
// export { default as Categories } from './Categories';
// export { default as EmptyCart } from './EmptyCart';
// export { FullPizza } from './FullPizza';
// export { default as Header } from './Header';
// export { default as Sort } from './Sort';
// export { default as Pagination } from './Pagination';
// export { default as NotFoundBlock } from './NotFoundBlock';


export * from './PizzaBlock';
export * from './PizzaBlock/Skeleton';
export * from './CartItem';
export * from './Categories';
export * from './EmptyCart';
// export * from './FullPizza';
export * from './Header';
export * from './Sort';
export * from './Pagination';
export * from './NotFoundBlock';