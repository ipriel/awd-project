import { ImageData } from 'src/app/shared/types';

export interface Product {
    productID: string,
    name: string,
    type: string,
    company: string,
    image: ImageData,
    price: number,
    description: string,
    discount: number,
    quantity: number,
    specs: string,
    showInStore: boolean
}
