import { profile } from 'console';

export interface user_profile{
    userId: string,
    prefix: string,
    firstName: string,
    lastName: string,
    address: string,
    email: String,
    orders: string[],
    cart: string[],
    shippingAddress: FormData,
}