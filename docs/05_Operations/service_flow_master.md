# Service Flow Master Map & Coverage Checklist
*Dự án: NowWash*

Tài liệu này là bản khung tổng hợp cho `Service Flow` end-to-end của NowWash. Mục tiêu là giúp đội vận hành review theo từng stage để đảm bảo:

- Có đủ `happy path`.
- Có đủ `rule to run`.
- Có đủ `edge cases` và `fallback`.
- Có đủ `owner`, `evidence`, `SLA`, và `escalation`.

Tài liệu này chỉ tập trung vào `luồng thực thi dịch vụ` từ lúc đơn được tạo đến lúc giao xong. Các luồng `Customer Care`, `Complaint`, `Incident Compensation`, `Quality governance`, `Reporting` sẽ được tách riêng sau khi `Service Flow` được chốt.

## 1. Phạm vi

`In scope`:
- Tạo đơn và xác thực điều kiện nhận đơn.
- Pickup, niêm phong, vận chuyển, nhập xưởng.
- Sorting, giặt, QC, đóng gói, giao trả.
- Các exception làm gián đoạn trực tiếp việc chạy đơn.

`Out of scope` trong tài liệu này:
- Kịch bản chăm sóc khách chủ động trước/sau dịch vụ.
- Chính sách đền bù chi tiết và dispute resolution cuối cùng.
- Dashboard KPI, báo cáo quản trị, audit định kỳ.
- Bảo trì tài sản, tồn kho vật tư, facility continuity ở mức sâu.

## 2. Nguyên tắc thiết kế flow

- `1 Order = 1 Service Chain`: Mỗi đơn phải có chuỗi trách nhiệm và bằng chứng xuyên suốt.
- `Không ảnh/scan/log = không coi là đã hoàn thành bước`.
- `Không sửa tay trạng thái`: chỉ tiến qua các event chuẩn.
- `Một điểm quyết định phải có owner rõ`.
- `Mỗi edge case phải rơi vào một bucket xử lý đã định nghĩa`.
- `Case vượt quyền phải có điều kiện escalation rõ ràng`.

## 3. State Map Chuẩn

| Stage ID | Operational Key | Event / Status chính | Mục tiêu |
| --- | --- | --- | --- |
| `SF-00` | `CRT` | `CREATED` | Đơn hợp lệ, đủ điều kiện vào luồng |
| `SF-01` | `PRE` | Pre-pickup readiness | Sẵn sàng nhận đồ đúng hẹn |
| `SF-02` | `PU` | `BAG_ASSIGNED + SEAL_APPLIED + PICKUP_SCAN` | Đã nhận đồ và khóa chain of custody |
| `SF-03` | `HUB` | `HUB_RECEIVED` / `AT_HUB` | Trung chuyển an toàn nếu có |
| `SF-04` | `IWS` | `IN_WORKSHOP` | Xưởng nhận đồ hợp lệ |
| `SF-05` | `SORT` | Pre-wash verification | Mở seal, đối soát, đưa vào mẻ đúng quy định |
| `SF-06` | `WS/WE` | `WASH_STARTED` / `WASH_ENDED` | Hoàn thành chu trình xử lý chính |
| `SF-07` | `QF/QP` | `QC_FAIL` / `QC_PASS` | Ra quyết định rewash hay pass để chuyển sang pack |
| `SF-08` | `PK/RTD` | `PACKING_COMPLETED` / `READY_TO_DELIVER` | Đơn đã pack, label, stage, sẵn sàng xuất tuyến |
| `SF-09` | `OFD/DLV` | `OUT_FOR_DELIVERY` / `DELIVERY_ATTEMPT_FAILED` / `DELIVERED` | Giao trả, re-attempt, hoặc chốt thành công |
| `SF-10` | `CLS` | `COMPLETED` / `CLOSED_FAILED` | Đóng case vận hành, sẵn sàng audit |

## 4. Decision Buckets Phải Cover

Mọi case trong `Service Flow` nên được gộp về một trong các bucket sau thay vì xử lý ad-hoc:

- `Capacity`: tràn túi, quá khổ, vượt công suất, thiếu slot.
- `Eligibility`: hàng cấm nhận, đồ sai gói, địa chỉ ngoài vùng, dữ liệu đơn không hợp lệ.
- `Custody`: thiếu scan, thiếu ảnh, seal rách, mất dấu bàn giao.
- `Execution`: lỗi giặt, máy lỗi, thiếu nhân sự, backlog xưởng.
- `Quality`: không sạch, không khô, nhăn/hỏng, phải rewash.
- `Delivery`: no-show, không vào được tòa, sai địa chỉ, giao thất bại.
- `System/Data`: app lỗi, scan lỗi, mất mạng, thiếu mapping order/bag/seal.
- `Escalation`: case vượt quyền frontline, có dấu hiệu thất thoát, có nguy cơ bồi thường.

## 5. Service Flow Theo Từng Stage

### SF-00. Order Creation & Eligibility Gate

Deep dive:
- `docs/05_Operations/service_flow_sf00_order_eligibility.md`

**Mục tiêu**
- Chỉ cho đơn hợp lệ đi vào vận hành.

**Trigger**
- Khách tạo đơn hoặc hệ thống sinh đơn subscription.

**Input bắt buộc**
- Mã khách.
- Địa chỉ và cluster phục vụ.
- Loại gói, size túi, slot pickup/delivery.
- Ghi chú đặc biệt nếu có.

**Owner**
- System.
- Ops scheduler khi cần can thiệp tay.

**Happy path**
- Đơn được tạo thành công.
- Hệ thống gán cluster, time slot, loại túi.
- Đơn vào trạng thái `CREATED`.

**Rule to run**
- Chỉ nhận đơn trong vùng phục vụ.
- Chỉ nhận đơn nếu còn năng lực pickup/xưởng/giao trả cho slot đó.
- Chỉ cho phép loại hàng phù hợp gói dịch vụ.

**Edge cases**
- Sai hoặc thiếu địa chỉ.
- Cluster chưa được gán.
- Slot đã đầy.
- Plan/gói không khớp loại dịch vụ.
- Khách đặt trùng đơn.

**Fallback / xử lý**
- Giữ đơn ở trạng thái chờ xác minh thay vì cho chạy ngay.
- Tự động đề xuất slot khác nếu hết công suất.
- Flag review nếu phát hiện nghi trùng hoặc sai plan.

**Escalation**
- Escalate sang ops scheduler nếu hệ thống không tự phân tuyến.
- Escalate sang CS nếu cần xác minh lại thông tin từ khách.

**Evidence / log**
- Log tạo đơn.
- Snapshot thông tin slot, cluster, plan, địa chỉ.

**Exit criteria**
- Đơn hợp lệ và có đủ dữ liệu để shipper đi nhận.

### SF-01. Pre-Pickup Readiness

Deep dive:
- `docs/05_Operations/service_flow_sf01_pre_pickup_readiness.md`

**Mục tiêu**
- Đảm bảo người và vật tư sẵn sàng trước khi đi nhận.

**Trigger**
- Đến đầu ca hoặc trước time slot pickup.

**Input bắt buộc**
- Danh sách đơn theo tuyến.
- Túi sạch, seal, app scanner, camera điện thoại, pin, mạng.

**Owner**
- Shipper.
- Shift lead / dispatcher.

**Happy path**
- Shipper check tuyến.
- Có đủ túi/seal đúng size.
- App hoạt động và đăng nhập đúng tài khoản.

**Rule to run**
- Không xuất phát nếu thiếu vật tư tối thiểu.
- Không đổi tài khoản dùng scanner giữa ca nếu chưa bàn giao.
- Không tự ý đổi tuyến nếu chưa được dispatcher xác nhận.

**Edge cases**
- Thiếu túi hoặc thiếu seal.
- Điện thoại yếu pin/hỏng camera.
- Mất mạng hoặc app scanner lỗi.
- Shipper vắng ca hoặc quá tải tuyến.

**Fallback / xử lý**
- Cấp vật tư dự phòng tại hub.
- Chuyển tuyến cho shipper khác.
- Cho phép chạy offline checklist tạm thời nếu hệ thống có cơ chế sync sau.

**Escalation**
- Escalate sang dispatcher khi không đảm bảo kịp slot pickup.
- Escalate sang ops lead nếu thiếu vật tư diện rộng.

**Evidence / log**
- Checklist đầu ca.
- Log giao tuyến và cấp phát vật tư.

**Exit criteria**
- Đủ điều kiện để thực hiện pickup đúng quy trình.

### SF-02. Pickup & Seal at Customer Site

Deep dive:
- `docs/05_Operations/service_flow_sf02_pickup_and_seal.md`

**Mục tiêu**
- Nhận đồ, niêm phong, và tạo bằng chứng số hoàn chỉnh tại điểm nhận.

**Trigger**
- Shipper đến đúng địa điểm pickup.

**Input bắt buộc**
- Order QR.
- Bag QR.
- Seal QR.
- Ảnh cận seal và ảnh toàn cảnh điểm nhận.

**Owner**
- Shipper.

**Happy path**
- Xác thực đúng khách, đúng đơn, đúng size túi.
- Bỏ đồ vào túi và niêm phong.
- Quét đủ `Order`, `Bag`, `Seal`.
- Chụp đủ ảnh.
- Bấm event pickup để chốt `PU`.

**Rule to run**
- Không hoàn tất pickup nếu thiếu scan hoặc thiếu ảnh.
- Không ép đóng túi nếu tràn túi.
- Không nhận hàng blacklist hoặc quá cỡ ngoài policy.
- Mọi seal hỏng trong lúc thao tác phải thay seal mới và làm lại đầy đủ.

**Edge cases**
- `OVF`: tràn túi.
- `OSZ`: hàng quá khổ.
- `BLK`: hàng cấm nhận.
- Khách không có mặt.
- Khách muốn đổi gói, đổi slot, thêm đồ phút chót.
- Quét lỗi hoặc camera không chụp được.

**Fallback / xử lý**
- Giảm đồ trong túi hoặc upsell túi phụ.
- Từ chối nhận nếu sai loại hàng.
- Chuyển sang giao tại lễ tân/bảo vệ nếu chính sách tòa cho phép.
- Nếu thiết bị lỗi, dùng checklist chứng từ tạm và sync lại theo quy định hệ thống.

**Escalation**
- Escalate CS khi cần đổi hẹn, đổi gói, hoặc khách không đồng ý rule.
- Escalate ops lead nếu pickup không thể hoàn tất nhưng vẫn phải bảo toàn slot.

**Evidence / log**
- 3 scan bắt buộc.
- 2 ảnh bắt buộc.
- Ghi chú exception nếu có.

**Exit criteria**
- Đơn được pickup hợp lệ hoặc bị chặn đúng policy trước khi vào chuỗi vận hành.

### SF-03. Transit to Hub / Workshop

Deep dive:
- `docs/05_Operations/service_flow_sf03_transit_to_hub_workshop.md`

**Mục tiêu**
- Bảo toàn seal và dấu vết bàn giao trong quá trình trung chuyển.

**Trigger**
- Pickup đã hoàn thành.

**Input bắt buộc**
- Túi đã seal.
- Tuyến vận chuyển và điểm bàn giao.

**Owner**
- Shipper.
- Hub staff nếu có hub tạm.

**Happy path**
- Túi được vận chuyển nguyên seal.
- Nếu qua hub, quét `HUB_RECEIVED`.
- Bàn giao không đổi túi, không đổi seal.

**Rule to run**
- Không được mở túi trên đường.
- Không được trộn hoặc đổi bag giữa các đơn.
- Mỗi lần bàn giao phải có người nhận cụ thể.

**Edge cases**
- Seal rách hoặc nghi bị mở.
- Túi thất lạc trong tuyến.
- Giao nhầm hub/xưởng.
- Chậm tuyến dẫn đến trễ nhập xưởng.

**Fallback / xử lý**
- Đưa đơn vào nhánh hold để kiểm tra chain of custody.
- Re-route sang hub/xưởng khác nếu được phê duyệt và còn sức chứa.
- Ưu tiên nhập xưởng cho đơn gần ngưỡng SLA.

**Escalation**
- Escalate ngay khi phát hiện `SBR` hoặc không xác minh được điểm bàn giao gần nhất.
- Escalate dispatcher nếu ETA không còn đảm bảo.

**Evidence / log**
- Log bàn giao.
- Ảnh hoặc camera tại điểm hub nếu có.
- Timestamp nhận hàng.

**Exit criteria**
- Đơn đến đúng hub/xưởng với seal nguyên vẹn hoặc được đưa vào nhánh kiểm tra sự cố.

### SF-04. Workshop Intake & Seal Integrity Check

Deep dive:
- `docs/05_Operations/service_flow_sf04_workshop_intake_and_seal_check.md`

**Mục tiêu**
- Chỉ cho đơn hợp lệ đi vào xưởng.

**Trigger**
- Túi tới cửa xưởng hoặc hub bàn giao cho xưởng.

**Input bắt buộc**
- Mã đơn/túi/seal.
- Kiểm tra trực quan seal.

**Owner**
- Workshop lead.

**Happy path**
- Quét đơn vào `IN_WORKSHOP`.
- Kiểm tra seal còn nguyên.
- Chấp nhận nhập xưởng.

**Rule to run**
- Không nhận xưởng nếu seal có dấu hiệu bị mở.
- Không cắt seal trước khi đơn chính thức được intake.
- Không cho đơn vào dây chuyền nếu thiếu mapping order-bag-seal.

**Edge cases**
- `SBR`: seal broken.
- Không scan được mã.
- Dữ liệu app không khớp túi thực tế.
- Đơn đến sai xưởng.

**Fallback / xử lý**
- Giữ tại khu vực quarantine chờ xác minh.
- Tạo incident log thay vì cho chạy tiếp.
- Chuyển lại đúng xưởng nếu sai tuyến và vẫn đảm bảo chain of custody.

**Escalation**
- Escalate CS/ops ngay với mọi case `SBR`.
- Escalate product/tech nếu lỗi mapping hệ thống lặp lại.

**Evidence / log**
- Log intake.
- Ảnh seal nếu có dấu hiệu bất thường.
- Camera cổng nhận xưởng.

**Exit criteria**
- Đơn được chấp nhận vào xưởng hoặc bị chặn tại gate với incident log đầy đủ.

### SF-05. Open, Sort, and Pre-Wash Verification

Deep dive:
- `docs/05_Operations/service_flow_sf05_open_sort_prewash.md`

**Mục tiêu**
- Mở seal đúng chuẩn, kiểm tra tình trạng gốc, và đưa toàn bộ đồ vào đúng mẻ.

**Trigger**
- Đơn đã ở trạng thái `IN_WORKSHOP`.

**Input bắt buộc**
- Camera top-down đang hoạt động.
- Bàn sorting sạch và đủ sáng.

**Owner**
- Sorter / Washer.

**Happy path**
- Đưa seal lên camera.
- Cắt seal.
- Đổ toàn bộ đồ ra bàn.
- Kiểm tra túi áo/quần và phát hiện vật lạ.
- Ghi nhận `ORG` nếu có tình trạng gốc.
- Đưa toàn bộ đồ của đơn vào đúng 1 lồng máy trống.

**Rule to run**
- Không mở túi nếu camera không hoạt động.
- Không để sót món nào trên bàn.
- Không trộn đồ giữa các đơn.
- Không tách đơn ra nhiều lồng nếu chưa có ngoại lệ được phê duyệt.

**Edge cases**
- Phát hiện hàng blacklist sau khi mở túi.
- Phát hiện đồ sai gói hoặc quá tải máy.
- Phát hiện vật phẩm giá trị cao, vật lạ, tiền, chìa khóa.
- Camera lỗi giữa quá trình mở túi.

**Fallback / xử lý**
- Dừng xử lý và đưa vào hold nếu bằng chứng camera không liên tục.
- Niêm phong lại và trả về nếu phát hiện blacklist theo policy.
- Lập biên bản vật phẩm lạ theo quy định tài sản thất lạc.

**Escalation**
- Escalate workshop lead nếu phải dừng mẻ vì camera hoặc capacity.
- Escalate CS nếu phát hiện hàng cần đổi gói hoặc trả lại.

**Evidence / log**
- Camera top-down.
- Ảnh `ORG`.
- Log vật phẩm lạ nếu có.

**Exit criteria**
- Toàn bộ đồ hợp lệ đã được nạp đúng 1 mẻ giặt hoặc case đã được hold đúng cách.

### SF-06. Wash Execution

Deep dive:
- `docs/05_Operations/service_flow_sf06_wash_execution.md`

**Mục tiêu**
- Chạy mẻ giặt đúng chương trình và kiểm soát rủi ro thực thi.

**Trigger**
- Đồ đã được nạp máy.

**Input bắt buộc**
- Máy giặt trống, chương trình giặt đúng, người vận hành sẵn sàng.

**Owner**
- Washer.
- Workshop lead khi có lỗi máy hoặc backlog.

**Happy path**
- Bấm `WASH_STARTED`.
- Chạy đúng chương trình giặt/sấy.
- Kết thúc và bấm `WASH_ENDED`.

**Rule to run**
- Không chạy máy quá tải.
- Không đổi chương trình ngoài preset nếu không có rule.
- Không để đơn dừng giữa chừng mà không có log.

**Edge cases**
- Máy lỗi hoặc dừng đột ngột.
- Mất điện/nước.
- Quá tải xưởng khiến đơn chờ quá lâu.
- Nhân sự đổi ca giữa mẻ.

**Fallback / xử lý**
- Chuyển mẻ sang máy khác nếu vẫn đảm bảo không lẫn đồ.
- Gắn trạng thái hold kỹ thuật nếu mẻ bị gián đoạn.
- Ưu tiên lại lịch xưởng theo SLA.

**Escalation**
- Escalate workshop lead với mọi lỗi máy ảnh hưởng deadline.
- Escalate ops lead nếu backlog vượt ngưỡng công suất.

**Evidence / log**
- Event `WASH_STARTED`, `WASH_ENDED`.
- Log máy lỗi.
- Timestamp chờ và xử lý.

**Exit criteria**
- Mẻ hoàn thành hoặc được chuyển vào nhánh xử lý kỹ thuật có log đầy đủ.

### SF-07. QC Decision: Pass / Rewash / Hold

Deep dive:
- `docs/05_Operations/service_flow_sf07_qc_decision.md`

**Mục tiêu**
- Ra quyết định chất lượng nhất quán trước khi đóng gói.

**Trigger**
- Mẻ giặt kết thúc.

**Input bắt buộc**
- Bàn QC.
- Tiêu chí sạch, thơm, khô, nguyên trạng.

**Owner**
- QC staff.

**Happy path**
- QC kiểm tra mùi, độ sạch, độ khô, tình trạng bề mặt.
- Nếu đạt, bấm `QC_PASS`.
- Nếu không đạt, bấm `QC_FAIL` và quay lại rewash.

**Rule to run**
- Không pass đơn nếu còn ẩm, còn mùi, còn vết bẩn rõ.
- Rewash phải được log như một vòng xử lý mới.
- Không bỏ qua lỗi chỉ vì gần deadline.

**Edge cases**
- Rewash nhiều vòng nhưng vẫn không đạt.
- Đồ có dấu hiệu co rút, phai màu, hư hỏng sau xử lý.
- QC không chắc do tình trạng gốc hay do quá trình giặt.

**Fallback / xử lý**
- Đưa case vào hold để workshop lead review.
- Chuyển sang luồng incident nếu có nghi ngờ damage do vận hành.
- Tách case cần xác minh với ảnh `ORG`.

**Escalation**
- Escalate lead nếu rewash vượt ngưỡng cho phép.
- Escalate CS/incident handling khi nghi có hư hỏng phát sinh.

**Evidence / log**
- `QC_FAIL` / `QC_PASS`.
- Ảnh bổ sung nếu có hư hỏng.
- Số vòng rewash.

**Exit criteria**
- Đơn pass để đóng gói hoặc được đẩy sang nhánh hold/incident.

### SF-08. Packing & Ready to Deliver

Deep dive:
- `docs/05_Operations/service_flow_sf08_packing_ready_to_deliver.md`

**Mục tiêu**
- Đóng gói an toàn, định danh rõ, sẵn sàng bàn giao cho giao trả.

**Trigger**
- Đơn đã `QC_PASS`.

**Input bắt buộc**
- Vật tư đóng gói.
- Mã barcode/label giao lại khách.

**Owner**
- QC / packing staff.
- Dispatcher cho bước staging giao.

**Happy path**
- Gấp gọn.
- Đóng túi/bao bì mới.
- Dán seal sticker/label.
- Chuyển sang `READY_TO_DELIVER`.

**Rule to run**
- Không staging đơn chưa pass QC.
- Không để thiếu mã định danh trước khi lên kệ chờ giao.
- Không trộn đơn giữa các kệ/tuyến.

**Edge cases**
- Thiếu vật tư đóng gói.
- Dán sai label.
- Đơn đã pass nhưng chưa có tuyến giao phù hợp.
- Đơn cần ưu tiên giao gấp vì sát SLA.

**Fallback / xử lý**
- Sử dụng vật tư thay thế đã được phê duyệt.
- Re-label và đối soát lại trước khi xuất kho.
- Re-prioritize tuyến giao.

**Escalation**
- Escalate dispatcher nếu không thể giao trong khung hẹn.
- Escalate ops lead nếu thiếu vật tư đóng gói diện rộng.

**Evidence / log**
- Log đóng gói.
- Mã label cuối cùng.
- Timestamp vào kệ chờ giao.

**Exit criteria**
- Đơn đã đóng gói xong, định danh rõ, và đang ở vị trí staging/dispatch queue có owner rõ.

### SF-09. Delivery Attempt & Handover

Deep dive:
- `docs/05_Operations/service_flow_sf09_delivery_attempt_handover.md`

**Mục tiêu**
- Giao lại hàng đúng khách, đúng địa điểm, có bằng chứng bàn giao.

**Trigger**
- Đơn ở `READY_TO_DELIVER`.

**Input bắt buộc**
- Tuyến giao.
- Thông tin người nhận / điểm nhận.
- Quy định tòa nhà nếu có.

**Owner**
- Dispatcher.
- Delivery shipper.

**Happy path**
- Xuất đơn lên tuyến.
- Bấm `OUT_FOR_DELIVERY`.
- Giao trực tiếp hoặc tại điểm nhận được phép.
- Thu bằng chứng bàn giao.
- Bấm `DELIVERED`.

**Rule to run**
- Không đánh dấu giao thành công nếu chưa có bằng chứng.
- Không để hàng tại điểm nhận không được phép.
- Nếu giao qua lễ tân/bảo vệ phải chụp ảnh đúng quy định.

**Edge cases**
- `NSH`: khách vắng nhà.
- Không vào được tòa/căn hộ.
- Sai số điện thoại hoặc không liên hệ được.
- Khách đổi giờ nhận sát giờ.
- Giao thất bại lần 1.

**Fallback / xử lý**
- Giao tại lễ tân/bảo vệ/locker nếu policy cho phép.
- Re-attempt theo quy tắc số lần giao lại.
- Giữ hàng tại hub nếu chưa thể giao.

**Escalation**
- Escalate CS khi khách đổi hẹn hoặc cần xác nhận điểm giao thay thế.
- Escalate ops lead nếu tái giao có nguy cơ làm vỡ SLA hàng loạt.

**Evidence / log**
- Ảnh bàn giao.
- Người nhận / điểm nhận / thời gian nhận.
- Ghi chú lý do nếu giao thất bại.

**Exit criteria**
- Đơn được giao thành công hoặc được đưa vào nhánh failed-delivery có lịch xử lý tiếp.

### SF-10. Operational Closure

Deep dive:
- `docs/05_Operations/service_flow_sf10_operational_closure.md`

**Mục tiêu**
- Đóng vòng vận hành và giữ dữ liệu sẵn sàng cho audit hoặc complaint.

**Trigger**
- Đơn đã `DELIVERED` hoặc kết thúc một nhánh service failure.

**Input bắt buộc**
- Trạng thái cuối cùng.
- Chuỗi event đầy đủ.
- Bằng chứng pickup, intake, QC, delivery.

**Owner**
- System.
- Ops admin khi cần rà soát tay.

**Happy path**
- Hệ thống lưu đủ event chain.
- Đơn kết thúc với hồ sơ bằng chứng đầy đủ.

**Rule to run**
- Không coi case đóng hoàn toàn nếu thiếu bằng chứng ở điểm bàn giao quan trọng.
- Case có hold hoặc exception chưa đóng thì không được archive như case bình thường.

**Edge cases**
- Thiếu một mắt xích evidence.
- Log không khớp timeline.
- Có tín hiệu bất thường cần audit sau giao.

**Fallback / xử lý**
- Gắn cờ cần review.
- Yêu cầu bổ sung log nội bộ trong ngưỡng thời gian cho phép.

**Escalation**
- Escalate incident owner nếu case có nguy cơ chuyển thành complaint.
- Escalate product/tech nếu có pattern mất event.

**Evidence / log**
- Full event chain.
- File ảnh/camera liên quan.
- Incident tags nếu có.

**Exit criteria**
- Hồ sơ vận hành đủ để audit và bảo vệ quyết định xử lý sau này.

## 6. Cross-Stage Exception Matrix

| Bucket | Tín hiệu nhận biết | Hành động tức thời | Owner đầu tiên | Điểm escalation |
| --- | --- | --- | --- | --- |
| `Capacity` | Túi tràn, máy quá tải, slot đầy | Hold bước hiện tại, không ép chạy tiếp | Shipper / Workshop lead | Ops scheduler / ops lead |
| `Eligibility` | Hàng blacklist, sai gói, sai vùng | Từ chối hoặc chuyển xác minh | Shipper / CS | Ops lead / CS lead |
| `Custody` | Seal rách, thiếu scan, thiếu ảnh | Khóa case, tạo incident log | Workshop lead / dispatcher | Ops lead / incident owner |
| `Execution` | Máy hỏng, backlog, thiếu người | Re-plan công suất, gắn hold | Workshop lead | Ops lead |
| `Quality` | QC fail, rewash lặp, nghi damage | Dừng pass, review lại evidence | QC lead | Incident / CS |
| `Delivery` | No-show, không vào được tòa | Re-attempt theo rule hoặc lưu tại điểm nhận | Delivery shipper / dispatcher | CS / ops lead |
| `System/Data` | Scan lỗi, mất event, app lỗi | Dùng quy trình fallback đã duyệt | Frontline + shift lead | Product/tech + ops |

## 7. Coverage Checklist Cho Phiên Review

Chỉ chuyển sang flow khác khi `Service Flow` đã review xong các câu hỏi sau:

- Mỗi stage đã có `trigger`, `owner`, `exit criteria` chưa?
- Mỗi stage đã có ít nhất một `happy path` chuẩn chưa?
- Mỗi stage đã có `rule to run` đủ để frontline tự quyết trong 80-90% case chưa?
- Mỗi stage đã cover đủ 4 nhóm lệch chuẩn: `data`, `capacity`, `execution`, `custody` chưa?
- Có stage nào vẫn phụ thuộc vào “người tự nhớ” thay vì checklist/log không?
- Có stage nào chưa rõ `ai được quyền hold`, `ai được quyền pass`, `ai được quyền escalate` không?
- Có case nào khi hệ thống/app lỗi thì nhân sự không biết chạy fallback ra sao không?
- Có case nào đã biết thường xảy ra nhưng chưa có bằng chứng số để bảo vệ quyết định không?
- Có case nào đang bị overlap với `Customer Care` hoặc `Complaint` mà chưa ghi rõ ranh giới bàn giao không?

## 8. Sign-off Matrix Hiện Tại

Đây là ma trận sign-off hiện tại để biết mục nào `đã cover`, mục nào còn `pending policy sign-off`, và mục nào còn `blocking` trước khi move sang flow khác:

| Chủ đề | Tình trạng coverage | Trạng thái hiện tại | Blocking sign-off? |
| --- | --- | --- | --- |
| `Order eligibility` | Đã có deep dive ở `SF-00` | Flow decision tree đã có; còn một số business policy cần ops/CS chốt trong file stage | `Không block cấu trúc flow`, nhưng `cần policy sign-off` |
| `Fallback app/scanner/network` | Đã có protocol riêng | Khóa bằng `service_flow_protocol_offline_fallback.md`; cần đội vận hành và product dùng đúng cùng một rule | `Có` nếu chưa train / chưa áp hệ thống |
| `Workshop hold states` | Đã có shared matrix | Khóa bằng `service_flow_workshop_hold_matrix.md`; stage docs đã tham chiếu release contract chung | `Không block cấu trúc flow`, nhưng `cần adoption` |
| `Rewash threshold` | Đã khóa mặc định trong `SF-07` | `2 fail cùng reason` -> `H1 lead review`, frontline không tự chạy tiếp | `Không`, trừ khi ops muốn thay default |
| `Delivery re-attempt rules` | Đã cover logic, chưa freeze hết threshold | Flow đã có `failed attempt / return / reattempt`; còn `attempt count`, `contact minimum`, `return node`, `OFD aging` cần chốt | `Có` cho go-live delivery policy |
| `Evidence minimum set` | Đã có appendix dùng chung | Đã khóa bằng `service_flow_evidence_minimum_matrix.md` và vẫn giữ detail riêng ở từng stage | `Không` |

`Kết luận`
- Về `coverage theo stage`, `Service Flow` đã khép kín end-to-end.
- Các blocker còn lại chủ yếu là `policy freeze` và `system adoption`, không còn là thiếu stage hoặc thiếu decision tree.

## 9. Tài liệu liên quan

- `docs/05_Operations/standard_operating_procedures.md`
- `docs/05_Operations/laundry_operations_sop_detailed.md`
- `docs/05_Operations/business_rules_exceptions.md`
- `docs/05_Operations/service_flow_evidence_minimum_matrix.md`
- `docs/05_Operations/service_flow_protocol_offline_fallback.md`
- `docs/05_Operations/service_flow_workshop_hold_matrix.md`
- `docs/05_Operations/service_flow_sf00_order_eligibility.md`
- `docs/05_Operations/service_flow_sf01_pre_pickup_readiness.md`
- `docs/05_Operations/service_flow_sf02_pickup_and_seal.md`
- `docs/05_Operations/service_flow_sf03_transit_to_hub_workshop.md`
- `docs/05_Operations/service_flow_sf04_workshop_intake_and_seal_check.md`
- `docs/05_Operations/service_flow_sf05_open_sort_prewash.md`
- `docs/05_Operations/service_flow_sf06_wash_execution.md`
- `docs/05_Operations/service_flow_sf07_qc_decision.md`
- `docs/05_Operations/service_flow_sf08_packing_ready_to_deliver.md`
- `docs/05_Operations/service_flow_sf09_delivery_attempt_handover.md`
- `docs/05_Operations/service_flow_sf10_operational_closure.md`
- `docs/06_Product_Tech/database_schema.md`
