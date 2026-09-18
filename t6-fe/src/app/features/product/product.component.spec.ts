import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductComponent } from './product.component';
import { ProductService } from '../../core/services/product.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: () =>
              of({
                content: [],
                totalPages: 0,
                totalElements: 0,
                number: 0
              }),

            search: () =>
              of([
                {
                  id: 1,
                  name: 'Laptop',
                  price: 20000000,
                  description: 'Laptop test',
                  imageUrl: '',
                  status: 1
                }
              ])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search products by keyword', () => {
    component.searchProducts('Laptop');

    expect(component.keyword()).toBe('Laptop');
    expect(component.products().length).toBe(1);
    expect(component.products()[0].name).toBe('Laptop');
    expect(component.totalElements()).toBe(1);
    expect(component.totalPages()).toBe(1);
    expect(component.currentPage()).toBe(0);
  });
});