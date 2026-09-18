import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ProductResponse } from "../models/famme-product.model";
import { environment } from "../../../enviroment/enviroment";
import { FammeProduct } from "../models/famme-product-response.model";
import { ProductDetailResponse } from "../models/product-detail.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/products`;

  getAll(page: number, size: number): Observable<any> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<any>(
      this.apiUrl,
      { params }
    );
  }

//   getById(id: number): Observable<ProductResponse> {

//     return this.http.get<ProductResponse>(
//       `${this.apiUrl}/${id}`
//     );
//   }

// getById(id: number) {
//   return this.http.get<ProductDetailResponse>(
//     `${this.apiUrl}/${id}`
//   );
// }
getById(id: number) {
  return this.http
    .get<ProductDetailResponse>(`${this.apiUrl}/${id}`)
    .pipe(
      map(response => response.data)
    );
}

  // Tìm kiếm
search(keyword: string) {
  return this.http.get<any>(
    `${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`
  ).pipe(
    map(response => response.data)
  );
}

// Xóa mềm
softDelete(id: number): Observable<any> {

  return this.http.put(
    `${this.apiUrl}/${id}/status`,
    {}
  );
}


// Đồng bộ
syncProducts(): Observable<string> {

  return this.http.post(
    `${this.apiUrl}/sync`,
    {},
    { responseType: 'text' }
  );
}

// Update
update(id: number, data: Partial<ProductResponse>) {
  return this.http.put<ProductResponse>(
    `${this.apiUrl}/${id}`,
    data
  );
}

createProduct(product: any) {
  return this.http.post(
    `${this.apiUrl}/create`,
    product
  );
}

  hardDelete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

sortPriceAsc(page: number, size: number) {
  return this.http.get<any>(
    `${this.apiUrl}/sort-price-asc?page=${page}&size=${size}`
  );
}

}