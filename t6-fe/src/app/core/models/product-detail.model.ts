export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: ProductDetail;
}