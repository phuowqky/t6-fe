
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductResponse } from '../../core/models/famme-product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDeleteDialogComponent } from '../product-detail/component/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product',
  imports: [
    DecimalPipe,
    ProductFormComponent,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy  {

  onSearch(keyword: string): void {
  this.searchSubject.next(keyword);
}

  private productService = inject(ProductService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  products = signal<ProductResponse[]>([]);
  keyword = signal('');

  currentPage = signal(0);
  pageSize = signal(10);
  totalPages = signal(0);
  totalElements = signal(0);

  sortAscending = signal(false); // Biến trạng thái sắp xếp giá tăng dần

  displayedColumns: string[] = ['stt', 'image', 'name', 'price', 'actions'];

  showCreateForm = signal(false);

  ngOnInit(): void {
      this.searchSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
    .subscribe(keyword => {
      this.searchProducts(keyword);
    });
    this.loadProducts();
  }

  loadProducts(page: number = 0): void {
  this.currentPage.set(page);

  const request = this.sortAscending()
    ? this.productService.sortPriceAsc(page, this.pageSize())
    : this.productService.getAll(page, this.pageSize());

  request.subscribe({
    next: (response) => {
      this.products.set(response.content);
      this.totalPages.set(response.totalPages);
      this.totalElements.set(response.totalElements);
      this.currentPage.set(response.number);
    },
    error: (error) => {
      console.error('Lỗi lấy danh sách sản phẩm:', error);
    }
  });
}


searchProducts(keyword: string): void {
  this.keyword.set(keyword);
  this.currentPage.set(0);

  if (!keyword.trim()) {
    this.loadProducts(0);
    return;
  }

  this.productService.search(keyword).subscribe({
    next: products => {
      this.products.set(products);
      this.totalElements.set(products.length);
      this.totalPages.set(1);
      this.currentPage.set(0);
    },
    error: error => {
      console.error('Lỗi tìm kiếm sản phẩm:', error);
    }
  });
}

  viewDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

deleteProduct(id: number): void {
  this.productService.softDelete(id).subscribe({
    next: () => {
      this.snackBar.open(
        'Xóa sản phẩm thành công',
        'Đóng',
        { duration: 3000 }
      );

      this.loadProducts(this.currentPage());
    },
    error: error => {
      console.error('Lỗi xóa sản phẩm:', error);

      this.snackBar.open(
        'Xóa sản phẩm thất bại',
        'Đóng',
        { duration: 3000 }
      );
    }
  });
}

    openHardDeleteDialog(product: ProductResponse): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { id: product.id, name: product.name }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.hardDeleteProduct(product.id);
      }
    });
  }

private hardDeleteProduct(id: number): void {
  this.productService.hardDelete(id).subscribe({
    next: () => {
      this.snackBar.open(
        'Xóa vĩnh viễn sản phẩm thành công',
        'Đóng',
        { duration: 3000 }
      );

      this.loadProducts(this.currentPage());
    },
    error: error => {
      console.error('Lỗi xóa vĩnh viễn sản phẩm:', error);

      this.snackBar.open(
        'Xóa vĩnh viễn sản phẩm thất bại',
        'Đóng',
        { duration: 3000 }
      );
    }
  });
}
  updateProduct(id: number, data: Partial<ProductResponse>): void {
    this.productService.update(id, data).subscribe({
      next: () => {
        this.loadProducts(this.currentPage());
      },
      error: (error) => {
        console.error('Lỗi cập nhật sản phẩm:', error);
      }
    });
  }

syncProducts(): void {
  this.productService.syncProducts().subscribe({
    next: () => {
      this.snackBar.open(
        'Đồng bộ sản phẩm thành công',
        'Đóng',
        { duration: 3000 }
      );

      this.loadProducts(0);
    },
    error: error => {
      console.error('Lỗi đồng bộ:', error);

      this.snackBar.open(
        'Đồng bộ sản phẩm thất bại',
        'Đóng',
        { duration: 3000 }
      );
    }
  });
}

  openCreateForm(): void {
    this.showCreateForm.set(true);
  }

  closeCreateForm(): void {
    this.showCreateForm.set(false);
  }

  onProductCreated(): void {
    this.showCreateForm.set(false);
    this.loadProducts(this.currentPage());
  }

  

sortPriceAsc(): void {
  this.sortAscending.set(true);
  this.loadProducts(0);
}
clearSort(): void {
  this.sortAscending.set(false);
  this.loadProducts(0);
}

onPageChange(event: PageEvent): void {
  this.pageSize.set(event.pageSize);
  this.loadProducts(event.pageIndex);
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
  
}