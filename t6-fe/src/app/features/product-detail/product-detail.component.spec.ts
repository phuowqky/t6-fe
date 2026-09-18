import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [ProductDetailComponent],
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(ProductDetailComponent);
  //   component = fixture.componentInstance;
  //   await fixture.whenStable();
  // });

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ProductDetailComponent],
providers: [
  {
    provide: ActivatedRoute,
    useValue: {
      snapshot: {
        paramMap: {
          get: (key: string) => key === 'id' ? '1' : null
        }
      }
    }
  }
]
  }).compileComponents();

  fixture = TestBed.createComponent(ProductDetailComponent);
  component = fixture.componentInstance;
  await fixture.whenStable();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
