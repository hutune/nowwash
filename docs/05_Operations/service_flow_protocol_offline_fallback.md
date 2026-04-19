# Shared Protocol: Offline Fallback & Deferred Sync
*Dự án: NowWash*

Tài liệu này là protocol dùng chung cho các case `app/scanner/network lỗi` nhưng frontline vẫn cần tiếp tục vận hành mà không làm vỡ `order-bag-seal linkage` và `chain of custody`.

Protocol này áp dụng trực tiếp cho:
- `SF-01 Pre-Pickup Readiness`
- `SF-02 Pickup & Seal at Customer Site`
- Các handover đầu tiên trước khi order được sync đầy đủ vào hệ thống

## 1. Mục tiêu

Protocol này phải trả lời 4 câu hỏi:

1. `Khi nào được phép chạy offline fallback?`
2. `Ai có quyền duyệt cho chạy?`
3. `Bộ dữ liệu tối thiểu nào phải thu tại hiện trường?`
4. `Khi nào order phải sync xong hoặc bị chặn escalation?`

Nguyên tắc:
- `Offline fallback` là cơ chế khẩn cấp, không phải đường chạy mặc định.
- `Không có đủ dữ liệu fallback = không được rời điểm xử lý`.
- `Không được dùng fallback để hợp thức hóa việc thiếu ảnh, thiếu seal, hoặc thiếu mapping`.
- `Không có deferred sync plan rõ = không được handover tiếp`.

## 2. Khi Nào Được Phép Dùng

Chỉ được dùng `offline fallback` nếu đồng thời thỏa cả 4 điều kiện:

- Order identity đã xác định được.
- Bag và seal vật lý hợp lệ đang có tại tay frontline.
- Thiết bị vẫn chụp ảnh và ghi note local được.
- Sự cố nằm ở một trong các nhóm sau:
  - app scanner lỗi
  - mất mạng cục bộ
  - upload fail tạm thời
  - camera scan đọc không ổn nhưng mã vẫn nhìn/ghi được bằng mắt

`Không được dùng` nếu:
- không đọc được cả `order code` lẫn `bag/seal code`
- không chụp được bộ ảnh tối thiểu
- frontline đang dùng sai account hoặc account chia sẻ
- có `SEAL_BROKEN`, custody anomaly, hoặc identity mismatch
- không còn cách tái lập chính xác `order-bag-seal linkage`

## 3. Ma Trận Phê Duyệt

| Tình huống | Người được quyền duyệt | Phạm vi duyệt mặc định |
| --- | --- | --- |
| Một route / một shipper / lỗi cục bộ trước khi xuất phát | `Shift lead` | `1 wave` hoặc `1 route` |
| Một attempt đang diễn ra tại hiện trường, cần quyết ngay để không treo khách | `Shift lead` nếu liên lạc được, nếu không thì `ops lead` | `1 order` hoặc `1 stop` |
| Lỗi đa route, đa shipper, hoặc nghi là outage cấp cluster | `Ops lead` | `cluster / slot` |
| Dự kiến order phải đi qua handover đầu tiên khi vẫn chưa sync xong | `Ops lead` bắt buộc | `case-by-case` |

`Rule to run`
- `Shift lead` không được duyệt fallback xuyên qua `first non-customer handover`.
- Mọi approval phải có:
  - người duyệt
  - timestamp
  - scope duyệt
  - reason code

## 4. Bộ Dữ Liệu Fallback Tối Thiểu

`Bắt buộc`
- Ảnh `bag`
- Ảnh `seal đã khóa`
- Ảnh `location / pickup point`
- Note local hoặc giấy kiểm soát có:
  - `order code`
  - `bag code`
  - `seal code`
  - `thời gian`
  - `shipper account`
  - `approval owner`
  - `fallback reason`

`Nên có thêm nếu khả dụng`
- ảnh chụp lỗi app/scanner
- screenshot upload fail / network fail
- ảnh người bàn giao hoặc alternate point nếu flow yêu cầu

## 5. Deadline Deferred Sync

`Rule cố định`
- Sync ngay khi thiết bị hoặc kết nối được phục hồi.
- `Bắt buộc sync xong trước first non-customer handover` như hub hoặc workshop intake, trừ khi `ops lead` duyệt waiver riêng.
- Nếu có waiver để handover khi chưa sync:
  - cả owner giao và owner nhận phải ký nhận deferred-sync note
  - order không được đi tiếp quá `1 handover` nếu chưa tái lập record
- `Hard max`: hoàn tất sync trong vòng `30 phút` kể từ lúc kết nối khôi phục và luôn trước khi kết thúc ca.

## 6. Tiêu Chuẩn Chấp Nhận Sau Khi Sync

Order chỉ được coi là đã `fallback resolved` nếu:

- hệ thống có lại đầy đủ `order_id -> bag_id -> seal_id`
- timestamp và ảnh khớp logic với attempt thực tế
- approval record truy được
- không có dấu custody mismatch phát sinh trong lúc defer

Nếu không đạt:
- case vào `H2 incident review`
- không tiếp tục flow thường

## 7. Điều Bị Cấm

- Không rời điểm pickup nếu chưa đủ 3 ảnh và note tối thiểu.
- Không sửa tay trạng thái order chỉ để “đi tiếp”.
- Không bàn giao qua hub/workshop khi chưa sync nếu không có `ops lead waiver`.
- Không dùng một approval cũ để áp cho nhiều ca hoặc nhiều cluster khác nhau.

## 8. Output Bắt Buộc Của Protocol

- `fallback_used = true`
- `fallback_reason_code`
- `fallback_approved_by`
- `fallback_started_at`
- `fallback_synced_at`
- `fallback_sync_result`
- `fallback_waiver_used` nếu có

## 9. Kết Luận

Protocol này khóa một nguyên tắc rất quan trọng:
- `offline` vẫn chạy được
- nhưng `custody` và `evidence` không được chạy theo trí nhớ

Nếu áp đúng, frontline vẫn xử lý được outage ngắn mà `SF-10` vẫn có thể xác minh lại case một cách quyết định.
