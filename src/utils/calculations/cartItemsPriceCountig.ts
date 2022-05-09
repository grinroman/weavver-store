import { Product } from 'src/Types/Product';

export const cartItemsPriceCountig = (itemList: Product[]): number => {
    return itemList.reduce(
        (a: number, c: Product) => (c.quantity ? a + c.quantity * c.price : a),
        0
    );
};
