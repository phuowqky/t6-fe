import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const mockResponse = {
      content: [
        {
          id: 1,
          name: 'Laptop',
          price: 20000000
        }
      ],
      totalPages: 1,
      totalElements: 1,
      number: 0
    };

    service.getAll(0, 10).subscribe(response => {
      expect(response.content.length).toBe(1);
      expect(response.content[0].name).toBe('Laptop');
    });

    const req = httpMock.expectOne(request =>
      request.url.includes('/products')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('10');

    req.flush(mockResponse);
  });

  it('should get product by id', () => {
    const mockResponse = {
      success: true,
      message: 'Success',
      data: {
        id: 1,
        name: 'Laptop',
        price: 20000000,
        description: 'Laptop test',
        imageUrl: '',
        status: 1
      }
    };

    service.getById(1).subscribe(product => {
      expect(product.id).toBe(1);
      expect(product.name).toBe('Laptop');
    });

    const req = httpMock.expectOne(
      'http://localhost:8888/api/v0/products/1'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should search products', () => {
    const mockResponse = {
      success: true,
      message: 'Success',
      data: [
        {
          id: 1,
          name: 'Laptop',
          price: 20000000
        }
      ]
    };

    service.search('Laptop').subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Laptop');
    });

    const req = httpMock.expectOne(
      request =>
        request.url.includes('/products/search') &&
        request.url.includes('keyword=Laptop')
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should soft delete product', () => {
    service.softDelete(1).subscribe();

    const req = httpMock.expectOne(
      'http://localhost:8888/api/v0/products/1/status'
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});

    req.flush({});
  });

  it('should hard delete product', () => {
    service.hardDelete(1).subscribe();

    const req = httpMock.expectOne(
      'http://localhost:8888/api/v0/products/1'
    );

    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  it('should update product', () => {
    const productData = {
      name: 'Laptop Updated',
      price: 25000000,
      description: 'Updated product',
      imageUrl: ''
    };

    const mockResponse = {
      id: 1,
      ...productData
    };

    service.update(1, productData).subscribe(response => {
      expect(response.name).toBe('Laptop Updated');
      expect(response.price).toBe(25000000);
    });

    const req = httpMock.expectOne(
      'http://localhost:8888/api/v0/products/1'
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(productData);

    req.flush(mockResponse);
  });

  it('should create product', () => {
    const product = {
      name: 'Keyboard',
      price: 1500000,
      description: 'Mechanical keyboard',
      imageUrl: ''
    };

    service.createProduct(product).subscribe();

    const req = httpMock.expectOne(
      'http://localhost:8888/api/v0/products/create'
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);

    req.flush({});
  });

  it('should sync products', () => {
    service.syncProducts().subscribe(response => {
      expect(response).toBe('Sync success');
    });

    const req = httpMock.expectOne(
      'http://localhost:8888/api/v0/products/sync'
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});

    req.flush('Sync success');
  });

  it('should sort products by price ascending', () => {
    const mockResponse = {
      content: [
        {
          id: 1,
          name: 'Keyboard',
          price: 1500000
        },
        {
          id: 2,
          name: 'Laptop',
          price: 20000000
        }
      ],
      totalPages: 1,
      totalElements: 2,
      number: 0
    };

    service.sortPriceAsc(0, 10).subscribe(response => {
      expect(response.content.length).toBe(2);
      expect(response.content[0].price).toBe(1500000);
    });

    const req = httpMock.expectOne(
      'http://localhost:8888/api/v0/products/sort-price-asc?page=0&size=10'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});