import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  private router = inject(Router);

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToCreate(): void {
    this.router.navigate(['/products/create']);
  }
}