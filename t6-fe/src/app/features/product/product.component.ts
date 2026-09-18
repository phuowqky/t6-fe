// // import { Component, inject, OnInit } from '@angular/core';
// // import { DecimalPipe } from '@angular/common';
// // import { ProductResponse } from '../../core/models/famme-product.model';
// // import { ProductService } from '../../core/services/product.service';

// // @Component({
// //   selector: 'app-product',
// //   imports: [DecimalPipe],
// //   templateUrl: './product.component.html',
// //   styleUrl: './product.component.scss',
// // })
// // export class ProductComponent implements OnInit {

// //   private productService = inject(ProductService);

// //   products: ProductResponse[] = [];
// //   keyword = '';

// //   // Pagination state
// //   currentPage = 0;
// //   pageSize = 10;
// //   totalPages = 0;
// //   totalElements = 0;

// //   ngOnInit(): void {

// //     console.log('ProductComponent - ngOnInit');
// //     console.log('products trước khi gọi API:', this.products);

// //     this.loadProducts();
// //   }

// //   // Lấy danh sách sản phẩm (có phân trang)
// //   loadProducts(page: number = 0): void {
// //     this.currentPage = page;

// //     this.productService.getAll(this.currentPage, this.pageSize).subscribe({
// //       next: (response) => {

// //         console.log('API response:', response);
// //         console.log('response.content:', response.content);

// //         this.products = response.content;
// //         this.totalPages = response.totalPages;

// //         console.log('products sau khi gán:', this.products);
// //         this.totalElements = response.totalElements;
// //       },
// //       error: (error) => {
// //         console.error('Lỗi lấy danh sách:', error);
// //       }
// //     });
// //   }

// //   // Chuyển trang
// //   goToPage(page: number): void {
// //     if (page < 0 || page >= this.totalPages || page === this.currentPage) {
// //       return;
// //     }
// //     this.loadProducts(page);
// //   }

// //   nextPage(): void {
// //     this.goToPage(this.currentPage + 1);
// //   }

// //   prevPage(): void {
// //     this.goToPage(this.currentPage - 1);
// //   }

// //   // Danh sách số trang để hiển thị (VD: [0,1,2,...])
// //   get pageNumbers(): number[] {
// //     return Array.from({ length: this.totalPages }, (_, i) => i);
// //   }

// //   // Tìm kiếm sản phẩm
// //   searchProducts(keyword: string): void {
// //     this.keyword = keyword;
// //     this.productService.search(keyword).subscribe({
// //       next: (response) => {
// //         this.products = response;
// //         // Tìm kiếm không phân trang -> reset thông tin trang
// //         this.totalPages = 0;
// //         this.totalElements = response.length;
// //       },
// //       error: (error) => {
// //         console.error('Lỗi tìm kiếm:', error);
// //       }
// //     });
// //   }

// //   // Xóa mềm sản phẩm
// //   deleteProduct(id: number): void {
// //     this.productService.softDelete(id).subscribe({
// //       next: () => {
// //         this.loadProducts(this.currentPage);
// //       },
// //       error: (error) => {
// //         console.error('Lỗi xóa sản phẩm:', error);
// //       }
// //     });
// //   }

// //   // Đồng bộ sản phẩm
// //   syncProducts(): void {
// //     this.productService.syncProducts().subscribe({
// //       next: () => {
// //         this.loadProducts(0);
// //       },
// //       error: (error) => {
// //         console.error('Lỗi đồng bộ:', error);
// //       }
// //     });
// //   }
// // }

// import { Component, inject, OnInit, signal } from '@angular/core';
// import { DecimalPipe } from '@angular/common';
// import { ProductResponse } from '../../core/models/famme-product.model';
// import { ProductService } from '../../core/services/product.service';
// import { RouterLink } from '@angular/router';
// import { ProductFormComponent } from '../product-form/product-form.component';
// @Component({
//   selector: 'app-product',
//   imports: [DecimalPipe, RouterLink, ProductFormComponent],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.scss',
// })
// export class ProductComponent implements OnInit {

//   private productService = inject(ProductService);

//   products = signal<ProductResponse[]>([]);
//   keyword = signal('');

//   currentPage = signal(0);
//   pageSize = 10;
//   totalPages = signal(0);
//   totalElements = signal(0);

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(page: number = 0): void {
//     this.currentPage.set(page);

//     this.productService.getAll(page, this.pageSize).subscribe({
//       next: (response) => {
//         this.products.set(response.content);
//         this.totalPages.set(response.totalPages);
//         this.totalElements.set(response.totalElements);
//       },
//       error: (error) => {
//         console.error('Lỗi lấy danh sách:', error);
//       }
//     });
//   }
//   showCreateForm = signal(false);

//   goToPage(page: number): void {
//     if (page < 0 || page >= this.totalPages() || page === this.currentPage()) {
//       return;
//     }
//     this.loadProducts(page);
//   }

//   nextPage(): void {
//     this.goToPage(this.currentPage() + 1);
//   }

//   prevPage(): void {
//     this.goToPage(this.currentPage() - 1);
//   }

//   get pageNumbers(): number[] {
//     return Array.from({ length: this.totalPages() }, (_, i) => i);
//   }

// // searchProducts(keyword: string): void {
// //   this.keyword.set(keyword);

// //   this.productService.search(keyword).subscribe({
// //     next: (response: any) => {
// //       console.log('search response:', response); // tạm thời để debug, xóa sau khi fix xong

// //       // Xử lý cả 2 trường hợp: response là mảng thuần hoặc object phân trang { content, totalElements... }
// //       const list = Array.isArray(response) ? response : response?.content ?? [];

// //       this.products.set(list);
// //       this.totalPages.set(0);
// //       this.totalElements.set(list.length);
// //     },
// //     error: (error) => {
// //       console.error('Lỗi tìm kiếm:', error);
// //     }
// //   });
// // }

// searchProducts(keyword: string): void {
//   this.keyword.set(keyword);

//   this.productService.search(keyword).subscribe({
//     next: (response: any) => {
//       const list = response?.data ?? [];

//       this.products.set(list);
//       this.totalPages.set(0);
//       this.totalElements.set(list.length);
//     },
//     error: (error) => {
//       console.error('Lỗi tìm kiếm:', error);
//     }
//   });
// }

//   deleteProduct(id: number): void {
//     this.productService.softDelete(id).subscribe({
//       next: () => {
//         this.loadProducts(this.currentPage());
//       },
//       error: (error) => {
//         console.error('Lỗi xóa sản phẩm:', error);
//       }
//     });
//   }

//   updateProduct(id: number, data: Partial<ProductResponse>): void {
//   this.productService.update(id, data).subscribe({
//     next: () => {
//       console.log('Cập nhật sản phẩm thành công');

//       // Load lại danh sách sau khi update
//       this.loadProducts(this.currentPage());
//     },
//     error: (error) => {
//       console.error('Lỗi cập nhật sản phẩm:', error);
//     }
//   });
// }

//   syncProducts(): void {
//     this.productService.syncProducts().subscribe({
//       next: () => {
//         this.loadProducts(0);
//       },
//       error: (error) => {
//         console.error('Lỗi đồng bộ:', error);
//       }
//     });
//   }

//   closeCreateForm(): void {
//   this.showCreateForm.set(false);
// }

// onProductCreated(): void {
//   this.showCreateForm.set(false);
//   this.loadProducts(this.currentPage());
// }

  


// }

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

  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'actions'];

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

  // loadProducts(page: number = 0): void {
  //   this.currentPage.set(page);

  //   this.productService.getAll(page, this.pageSize()).subscribe({
  //     next: (response) => {
  //       this.products.set(response.content);
  //       this.totalPages.set(response.totalPages);
  //       this.totalElements.set(response.totalElements);
  //     },
  //     error: (error) => {
  //       console.error('Lỗi lấy danh sách:', error);
  //     }
  //   });
  // }

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

// loadProducts(page: number = 0): void {
//   this.productService.getAll(page, this.pageSize()).subscribe({
//     next: response => {
//       this.products.set(response.content);
//       this.totalElements.set(response.totalElements);
//       this.totalPages.set(response.totalPages);
//       this.currentPage.set(response.number);
//     },
//     error: error => {
//       console.error('Lỗi tải sản phẩm:', error);
//     }
//   });
// }

  // onPageChange(event: PageEvent): void {
  //   this.pageSize.set(event.pageSize);
  //   this.loadProducts(event.pageIndex);
  // }

  // searchProducts(keyword: string): void {
  //   this.keyword.set(keyword);

  //   this.productService.search(keyword).subscribe({
  //     next: (response: any) => {
  //       const list = response?.data ?? [];

  //       this.products.set(list);
  //       this.totalPages.set(0);
  //       this.totalElements.set(list.length);
  //     },
  //     error: (error) => {
  //       console.error('Lỗi tìm kiếm:', error);
  //     }
  //   });
  // }

//   searchProducts(keyword: string): void {
//   this.keyword.set(keyword);

//   this.productService.search(keyword).subscribe({
//     next: (products) => {
//       this.products.set(products);
//       this.totalPages.set(1);
//       this.totalElements.set(products.length);
//     },
//     error: (error) => {
//       console.error('Lỗi tìm kiếm:', error);
//     }
//   });
// }

searchProducts(keyword: string): void {
  this.keyword.set(keyword);

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

  
// sortPriceAsc(): void {
//   this.currentPage.set(0);

//   this.productService.sortPriceAsc(0, this.pageSize()).subscribe({
//     next: (response) => {
//       this.products.set(response.content);
//       this.totalPages.set(response.totalPages);
//       this.totalElements.set(response.totalElements);
//     },
//     error: (error) => {
//       console.error('Lỗi sắp xếp giá:', error);
//     }
//   });
// }

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