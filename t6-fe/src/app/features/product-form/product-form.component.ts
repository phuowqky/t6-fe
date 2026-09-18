import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  saved = output<void>();
  closed = output<void>();

  submitting = false;
  errorMessage = '';

  productForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''],
    status: [1]
  });

  createProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.productService.createProduct(
      this.productForm.getRawValue()
    ).subscribe({
      next: () => {
        this.snackBar.open(
          'Thêm sản phẩm thành công',
          'Đóng',
          { duration: 3000 }
        );
        this.submitting = false;
        this.productForm.reset({ name: '', description: '', price: 0, imageUrl: '' });
        this.saved.emit();
      },
error: error => {
  console.error('Lỗi tạo sản phẩm:', error);

  this.snackBar.open(
    'Tạo sản phẩm thất bại',
    'Đóng',
    { duration: 3000 }
  );
}
    });
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}