// import { Component, inject, OnInit, signal } from '@angular/core';
// import { ProductService } from '../../core/services/product.service';
// import { ActivatedRoute } from '@angular/router';
// import { ProductResponse } from '../../core/models/famme-product.model';
// import { DecimalPipe } from '@angular/common';
// import { FammeProduct } from '../../core/models/famme-product-response.model';
// import { ProductDetail } from '../../core/models/product-detail.model';


// @Component({
//   selector: 'app-product-detail',
//   imports: [DecimalPipe],
//   templateUrl: './product-detail.component.html',
//   styleUrl: './product-detail.component.scss',
// })
// export class ProductDetailComponent implements OnInit {

//   private productService = inject(ProductService);
//   private route = inject(ActivatedRoute);

//   product = signal<ProductDetail | null>(null);

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));

//     this.loadProduct(id);
//   }

//   loadProduct(id: number): void {
//     this.productService.getById(id).subscribe({
//       next: (response) => {
//         console.log('API response:', response);
//         console.log('Product data:', response.data);

//         this.product.set(response.data);
//       },
//       error: (error) => {
//         console.error('Lỗi lấy chi tiết sản phẩm:', error);
//       }
//     });
//   }
// }

import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ProductResponse } from '../../core/models/famme-product.model';
import { ProductService } from '../../core/services/product.service';
import { ConfirmDeleteDialogComponent } from './component/confirm-delete-dialog.component';
import { UpdateProductDialogComponent } from './update-product-dialog/update-product-dialog';


@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe, DatePipe, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  product = signal<ProductResponse | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getById(id).subscribe({
      next: (response: any) => {
        this.product.set(response?.data ?? response ?? null);
      },
      error: (error) => {
        console.error('Lỗi lấy chi tiết sản phẩm:', error);
      }
    });
  }

goToUpdate(): void {
  const p = this.product();

  if (!p) return;

  const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
    width: '600px',
    data: {
      product: p
    }
  });

  dialogRef.afterClosed().subscribe((updatedProduct) => {
    if (updatedProduct) {
      this.product.set(updatedProduct);
    }
  });
}

  openDeleteDialog(): void {
    const p = this.product();
    if (!p) return;

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { name: p.name }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteProduct(p.id);
      }
    });
  }

  private deleteProduct(id: number): void {
    this.productService.softDelete(id).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Lỗi xóa sản phẩm:', error);
      }
    });
  }
}