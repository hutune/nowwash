# Quy trình Thực hành Chuẩn (SOP - Standard Operating Procedures)
*Dự án: NowWash*

Tài liệu này quy định thao tác tay chân bắt buộc đối với nhân sự hiện trường (Shipper) và nhân sự tại Xưởng (Workshop) để đảm bảo không gãy luồng Event-Sourced của hệ thống. Nguyên tắc cốt lõi: **"Không có ảnh & Không có Scan QR = Không có sự thật"**.

---

## 1. SOP Dành cho Shipper (Quy trình nhận đồ - Pickup)

Shipper (CTV lấy đồ) là điểm chạm vật lý đầu tiên với khách hàng. 

### Bước 1: Tiếp nhận và xác thực
- Shipper đứng trước cửa căn hộ căn cứ theo địa chỉ trên App.
- Kiểm tra số lượng đồ của khách đưa ra.
- Lấy 1 **Túi giặt trống (Clean Bag)** đúng Size (S/M/L) mà hệ thống yêu cầu ra khỏi balo.

### Bước 2: Bỏ đồ và Niêm phong (Crucial Step)
- Hướng dẫn khách tự bỏ đồ vào túi, hoặc tự tay bỏ đồ vào trước mặt khách.
- Kéo khóa túi thả vào móc khóa.
- Rút **Dây Seal (Niêm phong có mã QR/Barcode)** xuyên qua khóa kéo và chốt khóa lại. Kéo chặt.
- **Quy định rách/đứt:** Lúc kéo mà quá tay làm gãy Seal, bắt buộc phải vứt Seal đó đi, lấy Seal mới làm lại từ đầu. Không được phép chắp vá.

### Bước 3: Thu thập bằng chứng số (Scan & Capture)
Nhân sự mở App Scanner (dành cho nội bộ), bắt buộc thực hiện chuỗi Input:
1. **Quét mã QR của Đơn Hàng (Order QR)** (Nếu khách đưa màn hình hiển thị mã chốt đơn, hoặc bấm chọn thủ công trên App).
2. **Quét mã QR của Túi (Bag QR)** (Định danh vật chứa đồ).
3. **Quét mã QR của Niêm Phong (Seal QR)** (Định danh tính nguyên vẹn).
4. **Chụp 2 bức ảnh bắt buộc:**
   - Cận cảnh Seal đã được móc chặt vào khóa kéo (để lỡ rách còn bằng chứng đền).
   - Ảnh toàn cảnh túi chụp tại trước cửa nhà chứa số nhà khách hàng.

> [!WARNING]
> Mọi tranh chấp sau này về mất đồ trên đường vận chuyển sẽ đối chiếu chính xác dựa vào bức ảnh chụp khung cảnh rút Seal tại nhà khách này. Nếu Shipper bỏ qua bước chụp mà bấm nút "Done", Shipper tự bồi thường 100% trong trường hợp thất thoát.

---

## 2. SOP Dành cho Xưởng Giặt (Workshop & QC)

Xưởng là nơi rủi ro xảy ra nhiều nhất nếu để mất đồ của khách. Đặc điểm của NowWash là **1 Đơn = 1 Mẻ giặt**.

### Bước 1: Tiếp nhận xưởng (Workshop Intake)
- Shipper vác túi về Hub/Xưởng. 
- Trưởng ca xưởng quét mã QR của lô đồ chuyển thành trạng thái `IN_WORKSHOP`.
- **Thử độ bền:** Trưởng ca giật mạnh cụm khóa để xác nhận Seal còn nguyên vẹn. Chỉ bấm "Xác nhận nhận" trên app nếu Seal KHÔNG HỀ HẤN. Nếu đứt, đẩy vào [Luồng Xử lý Khủng hoảng].

### Bước 2: Khui Seal & Camera đối soát (MANDATORY)
- Thợ giặt mang túi tới **Bàn phân loại (Sorting Station)**.
- Bàn này BẮT BUỘC có **Camera an ninh với góc chiếu thẳng từ trên trần xuống (Top-down)** độ nét cao. Bật đèn sáng trắng 100%.
- Thợ đưa mã QR của cái Seal lên camera, dùng kéo CẮT đứt Seal vứt đi. 
- Mở túi đồ, đổ toàn bộ quần áo ra mặt bàn. 

### Bước 3: Phân loại & Cảnh báo bẩn móc (QC Pre-Wash)
- Thợ phải thọc tay kiểm tra túi quần/áo xem có tiền, chìa khóa không.
- Nếu phát hiện vết ố, bẩn, rách từ trước -> Chụp bằng điện thoại nội bộ bấm "Báo tình trạng gốc".
- Tống TOÀN BỘ đồ trên bàn vào đúng 1 lồng máy giặt đang trống. Cấm tuyệt đối chừa lại bất cứ cái gì (Phòng việc thợ quên áo của đơn này ném sang đơn kia). Ấn nút bắt đầu giặt `WASH_STARTED`.

### Bước 4: Kiểm định đầu ra (QC Post-Wash)
- Giặt/sấy xong đổ ra lại bàn có Camera Top-down.
- Gấp phẳng phiu. Nhân viên QC chịu trách nhiệm ngửi và sờ:
  - Vẫn còn mùi hôi/ẩm -> Bấm App `QC_FAIL` -> Giặt sấy lại.
  - Sạch sẽ thơm tho -> Bấm App `QC_PASS`.
- Đóng túi Nilon/Giấy mới. Ép 1 lớp Seal sticker ở mặt ngoài. 
- Dán mã Barcode định danh cho khách. Đẩy ra kho kệ chờ tải (Ready to Deliver).
