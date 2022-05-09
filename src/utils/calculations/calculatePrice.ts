export const calculateTime = (oldPrice: number, sale: number): number => {
    return Math.round(oldPrice * (1 - sale / 100));
};
