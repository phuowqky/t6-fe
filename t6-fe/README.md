# T6 FE

Ứng dụng frontend quản lý sản phẩm, được xây dựng bằng Angular và Angular Material.

## Chức năng

- Hiển thị danh sách sản phẩm theo phân trang.
- Tìm kiếm sản phẩm theo từ khóa.
- Sắp xếp sản phẩm theo giá tăng dần.
- Xem chi tiết sản phẩm.
- Tạo sản phẩm mới.
- Cập nhật sản phẩm.
- Xóa mềm và xóa vĩnh viễn sản phẩm.

## Công nghệ sử dụng

- Angular 21
- Angular Material 21
- TypeScript
- RxJS
- Vitest và JSDOM cho unit test

## Yêu cầu môi trường

- Node.js phiên bản tương thích với Angular 21
- npm 10 trở lên
- Backend API đang chạy tại `http://localhost:8888`

## Cài đặt

Từ thư mục `t6-fe`, chạy:

```bash
npm install
```

## Chạy ứng dụng

```bash
npm start
```

Sau đó mở trình duyệt tại `http://localhost:4200`.

Ứng dụng sử dụng API mặc định:

```text
http://localhost:8888/api/v0
```

Địa chỉ này được cấu hình trong `src/enviroment/enviroment.ts`.

## Các đường dẫn chính

| Đường dẫn | Chức năng |
| --- | --- |
| `/product` | Danh sách sản phẩm |
| `/products/create` | Tạo sản phẩm |
| `/products/:id` | Chi tiết sản phẩm |
| `/products/edit/:id` | Chỉnh sửa sản phẩm |

## Các lệnh thường dùng

```bash
# Chạy môi trường development
npm start

# Build production
npm run build

# Build và tự động cập nhật khi code thay đổi
npm run watch

# Chạy unit test
npm test
```

## Cấu trúc chính

```text
src/app/
├── core/
│   ├── models/       # Các interface/model dữ liệu
│   └── services/     # Gọi API sản phẩm
├── features/
│   ├── product/      # Danh sách sản phẩm
│   ├── product-detail/
│   ├── product-edit/
│   ├── product-form/
│   └── ...
├── shared/header/    # Header dùng chung
└── app.routes.ts     # Cấu hình routing
```

## Tài nguyên hình ảnh

Các hình ảnh tĩnh đặt trong `src/assets/images/` và được truy cập từ trình duyệt qua đường dẫn `/assets/images/<ten-file>`.
