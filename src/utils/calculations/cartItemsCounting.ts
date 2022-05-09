import { Product } from 'src/Types/Product';

export const cartItemsCountig = (itemList: Product[]): number => {
    return itemList.reduce(
        (a: number, c: Product) => (c.quantity ? a + c.quantity : a),
        0
    );
};
