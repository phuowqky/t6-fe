import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDeleteData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="confirm-dialog__icon">
        <mat-icon>warning</mat-icon>
      </div>

      <h2 mat-dialog-title>Xác nhận xóa</h2>

      <mat-dialog-content>
        <p>
          Bạn có chắc chắn muốn xóa sản phẩm
          <strong>"{{ data.name }}"</strong>?
        </p>
        <p class="confirm-dialog__warning">Hành động này không thể hoàn tác.</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-stroked-button [mat-dialog-close]="false">Hủy</button>
        <button mat-flat-button color="warn" [mat-dialog-close]="true">Xóa</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      text-align: center;
      padding: 8px;
    }

    .confirm-dialog__icon {
      display: flex;
      justify-content: center;
      margin-bottom: 8px;

      mat-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        color: #f59e0b;
      }
    }

    h2[mat-dialog-title] {
      text-align: center;
      margin-bottom: 4px;
    }

    mat-dialog-content {
      text-align: center;
      color: #4b5563;

      p {
        margin: 4px 0;
      }
    }

    .confirm-dialog__warning {
      font-size: 13px;
      color: #ef4444;
    }

    mat-dialog-actions {
      margin-top: 12px;
    }
  `]
})
export class ConfirmDeleteDialogComponent {
  data: ConfirmDeleteData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmDeleteDialogComponent>);
}