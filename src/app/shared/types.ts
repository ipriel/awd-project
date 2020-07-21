export type ObjectId = string;

export type DocumentRef<T> = T | ObjectId;

export type MixedSchema = { [key: string]: any };

export type ImageData = {
    data: {
        type: string,
        data: ArrayBuffer
    },
    contentType: string
};

export type DataPoint = {
    name: string,
    value: number
};

export type SelectOption = {
    _id: ObjectId,
    name: string
}

export enum ChatMessageType {
    TEXT,
    IMAGE,
    TYPING
}

export enum ChatOrigin {
    USER,
    BOT,
    REP
}

export type ChatMessage = {
    origin: ChatOrigin,
    type: ChatMessageType,
    text?: string,
    imageSrc?: string,
    typing?: boolean
};

export type ChatResponse = {
    response_type: string,
    text: string,
    time: number,
    typing: boolean,
    source: string
};

export type Address = {
    firstName: string,
    lastName: string,
    Country: string,
    City: string,
    addressLine: string,
    zipCode: number
}

export type User = {
    _id: ObjectId,
    userId: string,
    prefix: string,
    firstName: string,
    lastName: string,
    address: Address,
    email: string,
    orders: DocumentRef<Order>[],
    cart: DocumentRef<Product>[],
    shippingAddress: Address[]
};

export type Product = {
    _id: ObjectId,
    name: string,
    type: string,
    company: string,
    image: ImageData,
    price: number,
    description: string,
    discount: number,
    quantity?: number,
    specs: MixedSchema,
    showInStore: boolean
};

export type ProductMeta = {
    _id: ObjectId,
    name: string,
    type: string,
    company: string,
    image: ImageData,
    importerPrice: number,
    specs: MixedSchema
};

export type Status = {
    update_time: Date,
    update_by: DocumentRef<User>,
    status: number, // 0 - New/Received, 1 - Ready, 2 - Transit, 3 - Delivered
};

export type Order = {
    _id: ObjectId,
    user: DocumentRef<User>,
    date: Date,
    shippingAddress: Address,
    billingAddress: Address,
    status: Status[],
    totalPrice: number,
    items: DocumentRef<Product>[],
    shippingType: number,
    delivery_confirmation?: {
        name: string,
        signature: ImageData
    }
};
