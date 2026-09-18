import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-edit',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  productId!: number;
  isLoading = signal(false);
  isSaving = signal(false);

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    description: [''],
    imageUrl: ['']
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/products']);
      return;
    }

    this.productId = Number(id);
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading.set(true);

    this.productService.getById(this.productId).subscribe({
      next: (response: any) => {
        const product = response?.data ?? response;

        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl ?? ''
        });

        this.isLoading.set(false);
      },
      error: error => {
        console.error('Lỗi lấy sản phẩm:', error);
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid || this.isSaving()) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);

    const productData = {
      name: this.productForm.controls.name.value ?? '',
      price: this.productForm.controls.price.value ?? 0,
      description: this.productForm.controls.description.value ?? '',
      imageUrl: this.productForm.controls.imageUrl.value ?? ''
    };

this.productService.update(this.productId, productData).subscribe({
  next: () => {
    this.snackBar.open(
      'Cập nhật sản phẩm thành công',
      'Đóng',
      { duration: 3000 }
    );

    this.router.navigate(['/products']);
  },
  error: error => {
    console.error('Lỗi cập nhật sản phẩm:', error);

    this.snackBar.open(
      'Cập nhật sản phẩm thất bại',
      'Đóng',
      { duration: 3000 }
    );
  }
});
  }

  onCancel(): void {
    this.router.navigate(['/product']);
  }
}