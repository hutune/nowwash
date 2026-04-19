# Shared Contract: Workshop Hold States & Release Matrix
*Dự án: NowWash*

Tài liệu này định nghĩa `hold taxonomy` dùng chung cho các stage trong xưởng, để mọi case bị hold đều có:
- tên hold rõ
- owner rõ
- vị trí vật lý rõ
- người có quyền release rõ
- SLA escalation rõ

Áp dụng trực tiếp cho:
- `SF-04 Workshop Intake & Seal Integrity Check`
- `SF-05 Open, Sort, and Pre-Wash Verification`
- `SF-06 Wash Execution`
- `SF-07 QC Decision` khi case còn nằm trong quyền xử lý nội bộ xưởng

## 1. Nguyên tắc

- `Set hold` và `release hold` là hai quyết định khác nhau.
- Mọi hold phải có:
  - `hold_type`
  - `reason_code`
  - `physical_location`
  - `owner`
  - `set_at`
  - `next reviewer`
- Không có `release authority` thì không được thả hold bằng “thỏa thuận miệng”.
- `Incident hold` không được frontline tự release.

## 2. Taxonomy Chuẩn

| Hold Type | Dùng khi nào | Vị trí vật lý mặc định | Người được set | Người được release | SLA local mặc định |
| --- | --- | --- | --- | --- | --- |
| `VERIFY_HOLD` | Mapping chưa rõ, seal suspicious, evidence chưa đủ, cần xác minh thêm | Khu `quarantine / verification` | Workshop lead / sorter / QC lead | Workshop lead hoặc QC lead có thẩm quyền | `30 phút` |
| `CAPACITY_HOLD` | Chưa có slot intake, chưa có machine, chưa có QC table, queue đang nghẽn | Khu `receiving/staging hold` có location code | Workshop lead / ops scheduler | Workshop lead hoặc ops scheduler | `60 phút` |
| `TECHNICAL_HOLD` | Máy lỗi, camera lỗi, mất điện/nước, thiết bị xưởng lỗi | `machine-bound hold` hoặc `technical hold queue` | Washer / workshop lead | Workshop lead sau khi tech clear; ops lead nếu quá SLA | review mỗi `30 phút` |
| `QC_REVIEW_HOLD` | Repeat fail, chưa chắc ORG hay process-caused, cần lead review trước khi quyết tiếp | `QC review shelf` hoặc bàn QC lock zone | QC staff / QC lead | QC lead hoặc workshop lead | `30 phút` |
| `INCIDENT_HOLD` | Mixing suspicion, missing item, custody break, suspected damage, proof mâu thuẫn | `incident quarantine` khóa riêng | Workshop lead / QC lead / ops | Incident owner hoặc ops lead | triage trong `15 phút`, không auto-release |

## 3. Contract Đặt Hold

`Rule to run`
- Người set hold phải log đủ:
  - `hold_type`
  - `reason_code`
  - `order_id`
  - `owner`
  - `physical_location`
  - `expected next action`
- Order không được nằm ngoài khu vực đã log.
- Nếu order đổi khu vực giữ, phải cập nhật lại location code.

## 4. Contract Release Hold

Một hold chỉ được release nếu cùng lúc đạt đủ 4 điều kiện:

1. `Reason resolved`
   - nguyên nhân gốc đã được xử lý hoặc phân loại xong
2. `Evidence attached`
   - có note/ảnh/log đủ để giải thích vì sao release hợp lệ
3. `Next step assigned`
   - order có stage kế tiếp và owner kế tiếp rõ
4. `Release owner matched authority`
   - đúng người có quyền release theo ma trận

`Không được release` nếu:
- location của order không còn truy được
- evidence control point còn thiếu
- incident/dispute vẫn active
- release owner không đúng thẩm quyền

## 5. Luật Riêng Theo Từng Hold

### `VERIFY_HOLD`
- Dùng cho case còn khả năng quay lại flow thường sau khi làm rõ.
- Nếu quá `30 phút` chưa ra kết luận:
  - escalate `workshop lead`
  - nếu vẫn chưa rõ sau đó thì chuyển `INCIDENT_HOLD` hoặc trả node trước theo policy

### `CAPACITY_HOLD`
- Không dùng để che technical fault hay incident.
- Nếu quá `60 phút` hoặc vượt cut-off ca:
  - escalate `ops lead`
  - quyết định `reroute`, `reschedule`, hoặc `queue override`

### `TECHNICAL_HOLD`
- Chỉ release khi thiết bị / utility / camera đã clear.
- Nếu mẻ đang chạy:
  - phải đánh giá `cycle còn recoverable hay không`
  - nếu không còn recoverable, không release về flow thường mà chuyển `R1`
- Nếu quá `30 phút` chưa clear hoặc có outage diện rộng:
  - escalate `ops lead` và `tech support`

### `QC_REVIEW_HOLD`
- Không cho pack/release tiếp nếu chưa có quyết định QC lead.
- Dùng cho case lặp, unclear ORG, hoặc need lead override.
- Nếu quá `30 phút` chưa có quyết định:
  - escalate `workshop lead`

### `INCIDENT_HOLD`
- Không được frontline tự release.
- Chỉ `incident owner` hoặc `ops lead` được quyết:
  - quay lại flow thường
  - chuyển complaint/incident path
  - hoặc terminal disposition khác

## 6. Output Bắt Buộc Của Mọi Hold

- `hold_type`
- `hold_reason_code`
- `hold_owner`
- `hold_location`
- `hold_set_at`
- `hold_release_by`
- `hold_released_at`
- `hold_next_stage`
- `hold_escalation_flag`

## 7. Kết Luận

Mục tiêu của matrix này là chặn kiểu vận hành:
- ai cũng biết case đang bị hold
- nhưng không ai biết ai được thả

Khi shared contract này được dùng đúng, mọi `H1/H2` trong xưởng sẽ có cùng ngôn ngữ vận hành và cùng logic escalation.
