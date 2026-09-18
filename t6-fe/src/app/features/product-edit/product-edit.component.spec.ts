import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditComponent } from './product-edit.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditComponent],
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

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
