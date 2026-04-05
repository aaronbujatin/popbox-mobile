export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    isNew?: boolean;
    isOutOfStock?: boolean;
    badge?: string;
}
