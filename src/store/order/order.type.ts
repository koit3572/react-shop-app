import { IProduct } from "../products/products.type";

export interface Iorder {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
  products:IProduct[];
  totalPrice: number;
  userId: string;
}