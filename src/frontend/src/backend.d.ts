import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: bigint;
    published: boolean;
    author: string;
    image?: ExternalBlob;
}
export interface ContactForm {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface Order {
    id: bigint;
    customerName: string;
    status: string;
    specifications: string;
    productId: bigint;
    email: string;
    quantity: bigint;
    phone: string;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    category: string;
    image?: ExternalBlob;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogPost(title: string, content: string, author: string): Promise<bigint>;
    createProduct(name: string, description: string, category: string): Promise<bigint>;
    deleteBlogPost(id: bigint): Promise<void>;
    deleteOrder(id: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserRole(): Promise<UserRole>;
    getPublishedBlogPosts(): Promise<Array<BlogPost>>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(productId: bigint, customerName: string, email: string, phone: string, quantity: bigint, specifications: string): Promise<bigint>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<bigint>;
    updateBlogPost(id: bigint, title: string, content: string, author: string, published: boolean): Promise<void>;
    updateOrderStatus(id: bigint, status: string): Promise<void>;
    updateProduct(id: bigint, name: string, description: string, category: string): Promise<void>;
}
