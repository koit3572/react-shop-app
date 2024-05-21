interface ITating {
  rate: number;
  count: number;
}
export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ITating;
  quantity: number;
  total: number;
}