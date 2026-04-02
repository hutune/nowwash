# Luật Kinh Doanh & Kịch Bản Xử Lý Sự Cố (Business Rules & Exception Handling)

Tài liệu này là "Luật Hồng" của NowWash dùng để training nhân viên khối CS (Customer Service) và làm căn cứ pháp lý xử lý khiếu nại. Cấm nhân viên tự ý châm chước sai với khung quy định này.

---

## 1. Luật Dung Lượng & Định Giá (Capacity & Pricing Rules)

Mô hình NowWash tính tiền theo "Túi" chứ không đếm số lượng quần áo. Vì vậy, sự tranh chấp lớn nhất sẽ nằm ở việc "Nhồi nhét".

- **Luật Nhét Vừa:** Khách được quyền nhét bao nhiêu đồ vào túi cũng được, MIỄN LÀ miệng túi phải khép lại được hoàn toàn và kéo khóa đóng Seal thủ công. 
- **Luật Tràn Túi (Overflow):** Nếu nắp túi không thể chốt lại, Shipper được quyền:
  1. Hướng dẫn khách bỏ bớt đồ ra.
  2. Bán Upsell một túi phụ (Phụ thu 50% giá túi).
- **Từ Chối Đồ Kích Cỡ Lớn (Oversized):** Những vật tư siêu cồng kềnh như Ga bọc đệm cao su, Thảm trải nhà, Gấm sofa dày phải đăng ký riêng ở gói "Giặt Giường Đệm". Nếu cố tình nhét vào túi quần áo S/M/L, Xưởng có quyền **Tự Động Báo Hủy Đơn** trên app, hoàn lại tiền và ship trả đồ nguyên vẹn về vì vượt quá công suất lồng giặt quy định (gây cháy mô tơ).

---

## 2. Tiêu Chuẩn Nước Cấp Đồ (The Blacklist)

Shipper (CTV) và Thợ Xưởng được quyền từ chối (Reject) thẳng tay nếu mở túi và phát hiện một trong những vật phẩm sau, mà không sợ bị trừ KPI:
1. Đồ lót nam/nữ rải rác chưa đóng gói chung vào một bọc kín bên trong.
2. Vải dính máu số lượng lớn hoặc dính chất thải sinh học (Biohazard).
3. Trang phục đính đá quý, hạt cườm mỏng dễ rách (Bắt buộc phải báo khách chuyển sang gói "Giặt Hấp Premium" thay vì gói giặt nước thường).
4. Khăn xám dính nhớt xe, hóa chất công nghiệp.

*(Nếu lỡ nhận về xưởng, Xưởng đóng lại Seal mới, không tính tiền giặt, lập tức gọi Shipper giao trả về với lý do: Hàng không đạt tiêu chuẩn dịch vụ dân sinh).*

---

## 3. Kịch Bản Khủng Hoảng (Exception Handling Flow)

Những kịch bản gãy vỡ hệ thống và cách phản ứng.

### Cấp độ 1: Khách vắng nhà khi giao/nhận (No Show)
Chung cư cao cấp thường cấm Shipper lên tận phòng.
- Mặc định: Giao hỏa tốc xuống quầy Lễ Tân (Locker) hoặc phòng bảo vệ.
- Yêu cầu chụp ảnh 2 góc: Ảnh túi nằm sát Lễ tân và Ảnh túi có chụp dính số báo danh/đồng phục của bảo vệ. SMS báo cho khách chỗ để. Sự cố chốt xong.

### Cấp độ 2: Đứt Seal, Rách Seal Trên Đường Gom
Shipper móc Seal lúc tại nhà khách là Xanh. Nhưng về đến Xưởng kiểm tra trên App quét dính lỗi `SEAL_BROKEN` (Có thể do vận chuyển dằn xóc hoặc Shipper tự ý kéo khóa).
1. Xưởng từ chối nhận đồ.
2. Hệ thống khoanh đỏ Shipper. Chuyên viên CS (Support) lập tức gọi điện cho khách hàng kiểm tra xem có nghi vấn mất chiếc tài sản nào ở trong túi.
3. Chuyên viên check Camera nhà xe / Hành lang.
4. Đền bù trực tiếp: NowWash chịu 100% tỷ lệ hư hại, giáng bậc hoặc khóa ví Shipper (Theo luật giáng KPI quy định).

### Cấp độ 3: Khách kêu mất quần, áo (The Nightmare)
Tình huống tệ nhất. Khách nhận lại túi mới giặt, mở ra kêu mất cái quần lót hàng hiệu hoặc sơ mi Dior.
- **Bước 1 (Khoanh điểm Camera):** Khách báo mã kiện. Kỹ thuật check ID Đơn -> Bật hệ thống trích xuất Camera Top-Down ngay tại bàn đổ đồ (Sorting Station) lúc nhập Xưởng. 
- **Bước 2 (Kiếm chứng sự thật):** 
  - Nếu Camera soi thấy LÚC ĐỔ ĐỒ RA không hề có cái sơ mi Dior nào -> Từ chối khéo léo bồi thường. Bằng chứng thép là Seal đứt từ tận nhà khách đến xưởng không bị rách, xưởng mở ra không có thì lỗi tại khách nhớ nhầm đồ.
  - Nếu lồng giặt để sót, quay xưởng còn thấy -> Điều phối đi nhận trả bù.
  - Nếu đã quay thấy nhưng mất tích thực sự -> Cố định bồi thường theo x N lần giá trị dịch vụ của túi đó (Luật Đền Bù Tiêu Chuẩn), hoặc đền hóa đơn nếu khách cung cấp được receipt trong vòng 6 tháng.

> [!CAUTION]
> Để luật đền bù này có hiệu lực pháp lý, Lễ Tân / App CSKH phải cài dòng tickbox bạt mạng "Đồng ý tuân thủ SLA Đền bù Không quá X triệu VNĐ/Túi" ở ngay bước 1 khi khách đặt lệnh trên Mini App Zalo.
