import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../core/services/product.service';
import { ProductResponse } from '../../../core/models/famme-product.model';

export interface UpdateProductData {
  product: ProductResponse;
}

@Component({
  selector: 'app-update-product-dialog',
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './update-product-dialog.html',
  styleUrl: './update-product-dialog.scss',
})
export class UpdateProductDialogComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialogRef<UpdateProductDialogComponent>);
  data: UpdateProductData = inject(MAT_DIALOG_DATA);

  submitting = false;
  errorMessage = '';

form = this.fb.nonNullable.group({
  name: [this.data.product.name ?? '', [Validators.required, Validators.maxLength(200)]],
  description: [this.data.product.description ?? ''],
  price: [this.data.product.price ?? 0, [Validators.required, Validators.min(0)]],
  imageUrl: [this.data.product.imageUrl ?? ''],
  status: [this.data.product.status ?? 1, [Validators.required]],
});

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const payload = this.form.getRawValue();

    this.productService.update(this.data.product.id, payload).subscribe({
      next: (response: any) => {
        this.submitting = false;
        const updated = response?.data ?? { ...this.data.product, ...payload };
        this.dialogRef.close(updated);
      },
      error: (error) => {
        this.submitting = false;
        this.errorMessage = 'Cập nhật thất bại. Vui lòng thử lại.';
        console.error('Lỗi cập nhật sản phẩm:', error);
      }
    });
  }
}
