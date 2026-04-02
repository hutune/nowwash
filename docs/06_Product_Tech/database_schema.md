# Định Hướng Chuyển Đổi Mô Hình Kinh Doanh Thành Database Schema (NowWash)

Dựa trên tài liệu chiến lược và luồng vận hành (Operations Workflow), cốt lõi của hệ thống NowWash không nằm ở một giỏ hàng Ecommerce bình thường, mà nằm ở một mô hình **Event-Sourcing / State Machine**. Một "Đơn hàng" (Order) không chỉ đơn giản là "Chờ lấy -> Đang giao -> Xong", mà nó gắn chặt với 2 thực thể định danh vật lý: **Túi (Bag)** và **Niêm phong (Seal)**.

## 1. Các Thực Thể Lõi (Core Entities)
Hệ thống xoay quanh 5 thực thể chính:

1.  **Users (Khách hàng):** Quản lý thông tin cư dân, địa chỉ Block/Tòa nhà.
2.  **Clusters (Cụm vận hành):** Một Cluster đại diện cho một nhóm các tòa nhà và được phụ trách bởi 1 Workshop (Xưởng) hoặc 1 Hub.
3.  **Plans (Gói dịch vụ):** Các gói Subscription (ví dụ: Gói 8 túi/tháng, Túi lẻ Size S/M/L).
4.  **Physical Equipments (Trang thiết bị vật lý):**
    *   `Bags`: Mỗi túi có một QR code (Bag ID) riêng, có Size. Túi này có thể luân chuyển qua nhiều khách (tương tự như lồng giặt).
    *   `Seals`: Dây rút niêm phong có mã code riêng dùng 1 lần (Seal ID).
5.  **Orders (Đơn hàng):** Phiên giao dịch đại diện cho 1 lần giặt.

---

## 2. Sơ đồ Thực Thể Mối Quan Hệ (Entity-Relationship Diagram)

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS ||--o{ SUBSCRIPTIONS : has
    CLUSTERS ||--o{ USERS : serves
    CLUSTERS ||--o{ WORKSHOPS : manages
    
    ORDERS ||--|| BAGS : uses
    ORDERS ||--o{ SEALS : requires
    ORDERS ||--o{ ORDER_EVENTS : logs

    ORDERS {
        uuid id PK
        uuid user_id FK
        uuid cluster_id FK
        string status "PENDING, PICKED_UP, IN_WASH..."
        uuid current_bag_id FK
        boolean is_subscription_order
        datetime expected_pickup
        datetime expected_delivery
    }

    BAGS {
        uuid id PK
        string qr_code "Mã in trên mác túi"
        string size "S/M/L"
        string status "AVAILABLE, IN_USE, LOST, DAMAGED"
    }

    SEALS {
        uuid id PK
        uuid order_id FK
        string seal_code "Mã in trên dây rút"
        string status "INTACT, BROKEN"
        datetime applied_at
    }

    ORDER_EVENTS {
        uuid id PK
        uuid order_id FK
        string event_type "PICKUP_SCAN, QC_PASS, DELIVERED"
        uuid triggered_by "Staff ID"
        json metadata "Chứa hình ảnh xác minh, GPS"
        datetime created_at
    }
```

---

## 3. Máy Trạng Thái Đơn Hàng (Order State Machine)

Trái tim của hệ thống là `ORDER_EVENTS`. Nhân viên không trực tiếp sửa "status" của Order trong bảng điều khiển. Staff mở app, quét QR, hệ thống sẽ chèn 1 dòng vào `ORDER_EVENTS`, từ đó Order sẽ tự động chuyển trạng thái.

```mermaid
stateDiagram-v2
    [*] --> CREATED: Khách lên đơn
    
    CREATED --> PICKED_UP: (Event: BAG_ASSIGNED + \n SEAL_APPLIED)
    PICKED_UP --> AT_HUB: Nếu qua Hub tạm (Event: HUB_RECEIVED)
    PICKED_UP --> IN_WORKSHOP: Nếu vào xưởng luôn (Event: IN_WORKSHOP)
    AT_HUB --> IN_WORKSHOP: (Event: IN_WORKSHOP + \n SEAL_CHECK pass)
    
    IN_WORKSHOP --> IN_PROCESS: Bắt đầu giặt (Event: WASH_STARTED)
    IN_PROCESS --> QC_STAGE: Giặt xong (Event: WASH_ENDED)
    
    QC_STAGE --> REWASH_REQUIRED: QC Fail (Event: QC_FAIL)
    REWASH_REQUIRED --> IN_PROCESS
    
    QC_STAGE --> READY_TO_DELIVER: QC Pass, gắn Seal đóng gói (Event: QC_PASS)
    
    READY_TO_DELIVER --> OUT_FOR_DELIVERY: (Event: OUT_FOR_DELIVERY)
    OUT_FOR_DELIVERY --> COMPLETED: Giao thành công (Event: DELIVERED)
    
    COMPLETED --> [*]
```

## 4. Đặc tả kĩ thuật (Dự kiến)
Để hệ thống vận hành trơn tru và quét mã vạch (Barcode/QR) dưới dạng thời gian thực trên PWA, hệ thống nên được sử dụng:
*   **Database:** PostgreSQL (vì cấu trúc quan hệ giữa Order/Bag/Seal cực kì khắt khe).
*   **Backend:** Go (Golang) hoặc Node.js (NestJS) xây dựng theo mô hình Event-Driven.
*   **Frontend Cư Dân:** Zalo Mini App (Tiện dụng, khách quen Zalo không cần tải app).
*   **Frontend Staff Scanner:** Next.js PWA hoặc React Native (Cần dùng Camera để lấy Barcode nhanh nhất).
