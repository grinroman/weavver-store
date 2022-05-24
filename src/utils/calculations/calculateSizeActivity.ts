export const calculateSizeActivity = (
    currentSlug: string,
    sizeButton: string
): string => {
    if (currentSlug) {
        return currentSlug[currentSlug.length - 1].toUpperCase() === sizeButton
            ? 'active'
            : 'inactive';
    } else {
        return 'inactive';
    }
};
