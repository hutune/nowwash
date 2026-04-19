# SOP Chi Tiết Nghiệp Vụ Giặt Đồ
*Dự án: NowWash*

Tài liệu này mở rộng từ SOP ngắn hiện có thành bản vận hành chi tiết để training, giảm tranh chấp, và giữ logic event-sourcing nhất quán.

## 1. Mục tiêu vận hành

- `Tiện`: Nhân sự tuyến đầu nhớ ít, bấm ít, nói với nhau bằng key ngắn, thao tác đồng nhất.
- `Lợi`: Giảm thất thoát, giảm rewash, giảm bồi thường, tăng tốc độ quay vòng túi và công suất xưởng.

## 2. Nguyên tắc cốt lõi

- `1 Đơn = 1 Mẻ Giặt`: Cấm trộn đồ giữa hai đơn trong cùng một lô giặt.
- `Không ảnh + không scan = không sự thật`: Mỗi điểm bàn giao phải có QR hoặc ảnh hoặc camera đối soát.
- `Trạng thái đi bằng event`: Nhân sự không được cập nhật tay trạng thái; chỉ được quét, chụp, và bấm đúng event.
- `Một điểm giao một chủ`: Mỗi công đoạn phải có người chịu trách nhiệm rõ ràng.

## 3. Nguồn tham chiếu nội bộ

- `docs/05_Operations/standard_operating_procedures.md`
- `docs/05_Operations/business_rules_exceptions.md`
- `docs/06_Product_Tech/database_schema.md`

## 4. Bộ key vận hành ngắn

Để tiện cho chat nội bộ, sticker, dashboard và train nhanh, đội vận hành dùng `key ngắn`; trên hệ thống vẫn log bằng `event chuẩn`.

| Key ngắn | Event / Trạng thái hệ thống | Ý nghĩa |
| --- | --- | --- |
| `CRT` | `CREATED` | Khách vừa lên đơn |
| `PU` | `BAG_ASSIGNED + SEAL_APPLIED + PICKUP_SCAN` | Đã nhận đồ tại nhà khách |
| `HUB` | `HUB_RECEIVED` / `AT_HUB` | Đã vào hub tạm |
| `IWS` | `IN_WORKSHOP` | Đã nhập xưởng |
| `WS` | `WASH_STARTED` | Bắt đầu giặt |
| `WE` | `WASH_ENDED` | Kết thúc chu trình giặt/sấy |
| `QF` | `QC_FAIL` | QC rớt, phải giặt lại |
| `QP` | `QC_PASS` | QC đạt |
| `RTD` | `READY_TO_DELIVER` | Sẵn sàng giao |
| `OFD` | `OUT_FOR_DELIVERY` | Đang đi giao |
| `DLV` | `DELIVERED` | Giao thành công |

### 4.1 Key sự cố / ngoại lệ

| Key ngắn | Ý nghĩa | Cách dùng nhanh |
| --- | --- | --- |
| `OVF` | Overflow - tràn túi | Túi không đóng seal được |
| `OSZ` | Oversized | Đồ quá khổ, vượt công suất lồng giặt |
| `BLK` | Blacklist item | Hàng cấm nhận theo quy định |
| `SBR` | Seal Broken | Seal đứt, rách, hoặc có dấu mở |
| `NSH` | No Show | Khách vắng nhà khi giao/nhận |
| `ORG` | Original condition | Vết bẩn/rách/hư hỏng có sẵn |
| `MIS` | Missing item claim | Khách báo thiếu đồ |
| `RWS` | Rewash | Đơn phải giặt lại sau QC |

## 5. Vai trò và trách nhiệm

- `Shipper`: Nhận đồ, niêm phong, scan, chụp ảnh, giao nhận đúng quy trình.
- `Hub staff` (nếu có): Nhận trung chuyển, giữ nguyên seal, bàn giao vào xưởng.
- `Workshop lead`: Xác nhận seal, quyết định cho nhập xưởng hay đẩy sự cố.
- `Sorter / Washer`: Cắt seal dưới camera, đổ đồ, kiểm túi quần áo, đưa đúng 1 đơn vào đúng 1 lồng giặt.
- `QC`: Kiểm mùi, độ sạch, độ khô, gấp gói, xác nhận đạt hay không đạt.
- `Dispatcher`: Sắp tuyến giao, bàn giao cho shipper giao.
- `CS / Support`: Xử lý khiếu nại, gọi khách, kích hoạt luồng bồi thường khi cần.

## 6. Vật tư và công cụ bắt buộc

- Túi giặt sạch theo size `S/M/L`.
- Seal QR / barcode dùng 1 lần.
- App scanner nội bộ.
- Điện thoại có camera rõ nét.
- Bàn sorting có camera top-down và đèn trắng sáng.
- Nhãn/sticker đóng gói giao lại cho khách.

## 7. SOP chi tiết theo từng công đoạn

### 7.1 Trước ca làm (`PRE`)

`Owner`: Shipper, workshop lead.

Checklist:
- Kiểm tra đủ túi sạch, seal, pin điện thoại, 4G/Wi-Fi.
- Kiểm tra app scanner đang đăng nhập đúng tài khoản.
- Kiểm tra camera sorting đang ghi hình.
- Kiểm tra máy giặt trống, khu sorting sạch, không còn đồ tồn trên bàn.

`Tiện`: Giảm lỗi vì thiếu vật tư giữa ca.  
`Lợi`: Giảm trễ hẹn, giảm sự cố phải làm lại.

### 7.2 Nhận đồ tại nhà khách (`PU`)

`Owner`: Shipper.

#### Bước 1: Xác thực đơn
- Đến đúng địa chỉ/căn hộ trên app.
- Xác nhận mã đơn, tên khách, size túi được chỉ định.
- Nhìn nhanh lô đồ để phát hiện nguy cơ `OSZ` hoặc `BLK`.

#### Bước 2: Đóng túi và niêm phong
- Đưa đúng 1 túi sạch cho khách.
- Hướng dẫn khách tự bỏ đồ vào túi, hoặc shipper bỏ đồ trước mặt khách.
- Kéo kín khóa túi.
- Xuyên seal qua đầu khóa, kéo chặt, không chắp vá.
- Nếu gãy seal trong lúc thao tác: bỏ seal cũ, lấy seal mới, làm lại từ đầu.

#### Bước 3: Thu bằng chứng số
- Quét `Order QR`.
- Quét `Bag QR`.
- Quét `Seal QR`.
- Chụp ít nhất 2 ảnh:
  - Ảnh cận seal đã móc chặt vào khóa kéo.
  - Ảnh toàn cảnh túi tại địa điểm giao nhận có thông tin nhận diện căn hộ/số nhà.

#### Bước 4: Chốt sự kiện
- Bấm event pickup đúng quy trình để đơn chuyển sang `PU`.
- Không được bấm xong nếu thiếu scan hoặc thiếu ảnh.

`Tiện`: Một chuỗi thao tác 1 lần, key ngắn để shipper nhớ.  
`Lợi`: Đây là lớp bằng chứng rẻ nhất để chặn khiếu nại mất đồ.

### 7.3 Xử lý tình huống tại điểm nhận

`Owner`: Shipper, CS nếu cần.

#### Trường hợp `OVF`
- Nếu túi không đóng được miệng:
  - Hướng dẫn khách bỏ bớt đồ, hoặc
  - Bán thêm 1 túi phụ theo quy định phụ thu.
- Tuyệt đối không ép đóng khóa và seal trên túi tràn.

#### Trường hợp `OSZ`
- Từ chối vật phẩm quá cỡ, quá dày, vượt công suất lồng giặt.
- Giải thích cho khách chuyển sang gói dịch vụ phù hợp hơn.

#### Trường hợp `BLK`
- Từ chối nhận nếu là đồ lót rời rạc, đồ dính máu/chất thải sinh học, đồ dính nhớt hóa chất, hoặc đồ dễ vỡ/rách cao cần giặt premium.
- Ghi chú lý do trong app/nhóm vận hành.

`Tiện`: Rule rõ ràng, shipper không phải xin phép lung tung.  
`Lợi`: Cắt sớm đơn xấu để tránh vỡ máy, mất KPI, và bồi thường lớn.

### 7.4 Vận chuyển về hub/xưởng (`HUB` / chuyển tiếp)

`Owner`: Shipper, hub staff.

- Trong suốt quá trình vận chuyển, không được mở seal.
- Xếp từng đơn tách riêng, tránh chèn ép mạnh làm rách seal.
- Nếu qua hub tạm, quét event `HUB_RECEIVED`.
- Bàn giao nguyên seal, không đổi túi, không đổi seal.

`Tiện`: Dùng key `HUB` để ai nhìn cũng biết đơn đang ở điểm trung chuyển.  
`Lợi`: Giữ chain of custody rõ ràng, dễ truy vết khi có sự cố.

### 7.5 Nhập xưởng (`IWS`)

`Owner`: Workshop lead.

#### Điều kiện nhận
- Quét mã đơn/túi để chuyển sang `IWS`.
- Kiểm tra seal bằng mắt thường và giật nhẹ cụm khóa.
- Chỉ nhận vào xưởng nếu seal còn nguyên, không có dấu mở.

#### Nếu gặp `SBR`
- Từ chối nhận xưởng.
- Khoanh đỏ shipper trong hệ thống nội bộ.
- Báo CS gọi khách xác nhận nghi vấn thất thoát.
- Kích hoạt check camera hành lang/nhà xe nếu cần.

`Tiện`: Workshop chỉ cần 1 gate kiểm tra duy nhất trước khi mở đồ.  
`Lợi`: Chặn toàn bộ tranh chấp trước khi đồ vào dây chuyền giặt.

### 7.6 Cắt seal và đối soát camera (`SORT`)

`Owner`: Sorter / Washer.

#### Điều kiện bắt buộc
- Camera top-down đang quay.
- Bàn sorting rộng, sạch, sáng.

#### Thao tác
- Đưa seal lên rõ trước camera.
- Dùng kéo cắt đứt seal, bỏ seal đã cắt vào khay rác/seal hủy.
- Đổ toàn bộ quần áo lên bàn.
- Kiểm túi quần/áo để lấy ra tiền, khóa, vật nhỏ.
- Chụp và ghi nhận `ORG` nếu phát hiện vết bẩn, rách, hư hỏng có sẵn.

`Tiện`: Kiểm tra tập trung ở 1 bàn, 1 camera, 1 quy trình.  
`Lợi`: Bằng chứng camera giải quyết tranh chấp `MIS` rẻ hơn mọi hình thức bồi thường.

### 7.7 Đưa vào lồng giặt (`WS`)

`Owner`: Sorter / Washer.

Rule không được phá:
- Toàn bộ đồ của 1 đơn phải đưa vào cùng 1 lồng máy đang trống.
- Không được để lại 1 món nào trên bàn sau khi nạp lồng.
- Không được tách 1 đơn thành 2 lồng nếu chưa có quy trình ngoại lệ được phê duyệt.

Thao tác:
- Xác nhận lồng máy trống.
- Đưa toàn bộ đồ vào lồng.
- Chọn chương trình giặt đúng loại.
- Bấm event `WS`.

`Tiện`: Đơn giản hóa thành 1 đơn - 1 lồng, train rất nhanh.  
`Lợi`: Đây là khóa để giảm mất đồ và giảm chi phí truy vết.

### 7.8 Kết thúc mẻ giặt (`WE`)

`Owner`: Washer.

- Khi kết thúc chu trình, bấm event `WE`.
- Đưa đồ ra lại bàn QC có camera.
- Không trộn đồ giữa 2 mẻ trên xe đẩy/bàn gấp.

`Tiện`: Tách rõ mốc bắt đầu/kết thúc để cả đội dễ theo dõi.  
`Lợi`: Có dữ liệu thời gian mẻ giặt để tính năng suất và điểm nghẽn.

### 7.9 QC và quyết định đạt/rớt (`QF` / `QP`)

`Owner`: QC staff.

Checklist QC:
- Độ sạch nhìn thấy bằng mắt.
- Mùi sạch, không hôi ẩm.
- Độ khô đạt mức giao được.
- Không còn vật lạ trong túi/đồ.

#### Nếu `QF`
- Bấm `QF`.
- Dán key `RWS`.
- Đưa quay lại công đoạn giặt.
- Ghi rõ lý do: ẩm, hôi, còn vết, gấp vội, mùi lạ.

#### Nếu `QP`
- Bấm `QP`.
- Chuyển sang đóng gói.

`Tiện`: QC dùng checklist ngắn, không tranh luận cảm tính.  
`Lợi`: Giảm đơn giao lại bị trả về, giảm chi phí CS và giao lại.

### 7.10 Đóng gói và chờ giao (`RTD`)

`Owner`: QC staff / Dispatcher.

- Gấp gọn.
- Đóng túi nilon/giấy mới sạch.
- Dán seal sticker ngoài.
- Dán mã barcode/nhãn định danh giao lại cho khách.
- Đặt lên kệ chờ tuyến giao.
- Đơn được xem là `RTD` sau khi `QP` và đóng gói xong.

`Tiện`: Đóng gói đồng nhất, shipper giao dễ nhận và dễ đối soát.  
`Lợi`: Giảm giao nhầm, giảm tốn thời gian tìm đơn trên kệ.

### 7.11 Xuất giao và giao thành công (`OFD` / `DLV`)

`Owner`: Dispatcher, shipper giao.

- Bàn giao đơn đúng mã.
- Quét `OFD` khi shipper nhận đơn đi giao.
- Giao tận tay khách hoặc theo điểm nhận được phép.
- Khi giao xong, quét `DLV`.

#### Trường hợp `NSH`
- Mặc định giao xuống lễ tân/bảo vệ/locker nếu tòa nhà không cho lên phòng.
- Chụp 2 ảnh:
  - Ảnh túi tại điểm gửi.
  - Ảnh có thông tin nhận diện bảo vệ/lễ tân/mã locker.
- Nhắn tin cho khách biết vị trí gửi.

`Tiện`: Key `OFD`, `DLV`, `NSH` rất ngắn cho điều phối.  
`Lợi`: Có bằng chứng giao nhận, giảm tranh chấp giao trễ/giao sai.

## 8. Luồng sự cố bắt buộc

### 8.1 `SBR` - Seal rách/đứt

- Dừng nhận xưởng ngay.
- Kích hoạt CS xác nhận với khách.
- Truy camera vận chuyển/hub.
- NowWash xử lý bồi thường theo khung nội bộ nếu xác định lỗi vận chuyển.

### 8.2 `MIS` - Khách báo thiếu đồ

- Lấy mã đơn.
- Trích camera top-down lúc đổ đồ ra.
- Nếu camera không thấy món đồ ngay từ đầu: từ chối bồi thường có căn cứ.
- Nếu xác định sót tại xưởng: điều phối giao bù.
- Nếu xác định mất thật: bồi thường theo SLA/nội quy đã được khách tick chấp nhận.

### 8.3 `BLK` phát hiện muộn tại xưởng

- Không giặt.
- Đóng lại bằng seal mới.
- Ship trả về cho khách.
- Ghi rõ lý do không đạt tiêu chuẩn dịch vụ.

## 9. KPI tối thiểu cần theo dõi

- `% đơn đủ scan đủ 3 mã`: Order, Bag, Seal.
- `% đơn đủ 2 ảnh pickup`.
- `% seal intact khi vào xưởng`.
- `% QF / rewash`.
- `% giao đúng hẹn`.
- `% khiếu nại MIS`.
- `Thời gian xử lý trung bình mỗi công đoạn`.

## 10. Checklist audit nhanh cho quản lý

- Có đơn nào thiếu scan mà vẫn qua công đoạn tiếp theo không?
- Có đơn nào vào xưởng mà không có check seal không?
- Có đơn nào `QF` nhiều lần trên cùng 1 ca không?
- Bàn sorting có sạch và không còn đồ tồn sau mỗi mẻ không?
- Camera top-down có record đủ khung giờ cao điểm không?

## 11. Quy ước truyền thông nội bộ

- Chat điều phối ưu tiên dùng key ngắn: `PU`, `IWS`, `QF`, `RTD`, `DLV`, `SBR`, `MIS`.
- Báo cáo ca cuối ngày dùng cấu trúc: `Mã đơn - Key - Vấn đề - Người xử lý - Kết quả`.
- Trên tài liệu kỹ thuật và app, vẫn giữ tên event chuẩn để tránh lệch schema.

## 12. Kết luận vận hành

Bản SOP này được thiết kế theo 2 tiêu chí:

- `Tiện`: dễ nhớ, dễ train, dễ giao ca, dễ số hóa.
- `Lợi`: giảm thất thoát, giảm tranh chấp, giảm chi phí vận hành và tăng khả năng scale cluster.
