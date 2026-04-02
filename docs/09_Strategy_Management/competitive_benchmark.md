# Báo Cáo Benchmark Ngành Giặt Ủi O2O & Đề Xuất Chính Sách Sản Phẩm NowWash

**Version**: 2.0
**Date**: 2026-04-02
**Status**: Living Document — Master Benchmark
**Maintained by**: Strategy / Product Team

> ⚠️ Bản v2.0 tổng hợp từ 4 bản deep-dive riêng lẻ (01_heramo, 02_edaixi, 03_rinse, 04_laundryheap). Xem từng file để biết chi tiết gốc.

---

## Mục Lục

1. [Glossary](#glossary)
2. [Ma Trận So Sánh Ngang — Toàn Diện](#phần-i-ma-trận-so-sánh-ngang--toàn-diện)
   - [A. Hồ sơ doanh nghiệp](#a-hồ-sơ-doanh-nghiệp)
   - [B. Mô hình kinh doanh & Vận hành](#b-mô-hình-kinh-doanh--vận-hành)
   - [C. Pricing chi tiết](#c-pricing-chi-tiết)
   - [D. Subscription Model](#d-subscription-model)
   - [E. Logistics & Giao nhận](#e-logistics--giao-nhận)
   - [F. B2B Programs](#f-b2b-programs)
   - [G. Công nghệ & App](#g-công-nghệ--app)
   - [H. Funding & Hiệu suất vốn](#h-funding--hiệu-suất-vốn)
   - [I. Chính sách đền bù & SLA](#i-chính-sách-đền-bù--sla)
   - [J. Sustainability](#j-sustainability)
3. [Bảng Xếp Hạng Tổng Hợp — Ai Thắng Ở Đâu](#phần-ii-bảng-xếp-hạng-tổng-hợp--ai-thắng-ở-đâu)
4. [Phân Tích 5 Sai Lầm Chết Người Trong Ngành](#phần-iii-5-sai-lầm-chết-người-trong-ngành)
5. [Đề Xuất Chính Sách Sản Phẩm NowWash v2.0](#phần-iv-đề-xuất-chính-sách-sản-phẩm-nowwash-v20)
   - [A. Pricing Policy](#a-pricing-policy)
   - [B. Subscription Model (cập nhật từ Rinse + Laundryheap)](#b-subscription-model)
   - [C. B2B Strategy (NEW — học từ Laundryheap)](#c-b2b-strategy)
   - [D. Logistics & SLA](#d-logistics--sla)
   - [E. GTM — Building-as-a-Channel](#e-gtm--building-as-a-channel)
   - [F. Moat — 5 Hào Thành Cạnh Tranh](#f-moat--5-hào-thành-cạnh-tranh)
6. [Decision Matrix — NowWash Chọn Gì Từ Ai](#phần-v-decision-matrix--nowwash-chọn-gì-từ-ai)
7. [Tóm Tắt Khuyến Nghị Chiến Lược](#tóm-tắt-khuyến-nghị-chiến-lược)
8. [Deep-dive Files](#deep-dive-files)

---

## Glossary

| Thuật Ngữ | Định Nghĩa |
|-----------|------------|
| **O2O** | Online-to-Offline — đặt hàng online, thực hiện dịch vụ offline |
| **Cluster** | Cụm vận hành: 1 Xưởng giặt phục vụ 3-5 tòa CC trong bán kính ≤500m |
| **Route Density** | Mật độ đơn/tuyến. Ngưỡng tối thiểu: ≥25 đơn/ngày/cluster |
| **Per-Bag Pricing** | Định giá theo túi cố định, không tính theo kg |
| **Subscription** | Gói đăng ký định kỳ — nguồn doanh thu chủ lực |
| **MRR** | Monthly Recurring Revenue — Doanh thu hàng tháng từ Subscription |
| **CAC** | Customer Acquisition Cost — Chi phí có 1 khách mới |
| **LTV** | Lifetime Value — Tổng doanh thu từ 1 khách suốt vòng đời |
| **Contribution Margin (CM)** | Revenue − Variable Costs. Dương = có lời per-order |
| **AOV** | Average Order Value — Giá trị trung bình/đơn |
| **Seal / Niêm Phong** | Dây rút nhựa có QR code, gắn vào túi đảm bảo "1 nhà 1 mẻ" |
| **SLA** | Service Level Agreement — Cam kết thời gian dịch vụ |
| **Moat** | Lợi thế cạnh tranh bền vững, khó bị copy |
| **Asset-light** | Không sở hữu xưởng/xe. Thuê ngoài, chỉ quản lý platform |
| **W-2 Employee** | Nhân viên chính thức (Mỹ) — đối lập với gig worker |
| **E-Cargo Bike** | Xe đạp hàng chạy điện dùng giao nhận |
| **Rollover** | Túi/credit chưa dùng carry sang tháng sau |
| **Linen Rental** | Cho thuê ga/khăn hospitality-grade cho Airbnb/Hotel |
| **GTM** | Go-to-Market — Chiến lược tiếp cận thị trường |

---

## PHẦN I: MA TRẬN SO SÁNH NGANG — TOÀN DIỆN

### A. Hồ Sơ Doanh Nghiệp

| | HERAMO 🇻🇳 | eDaixi 🇨🇳 | Rinse 🇺🇸 | Laundryheap 🇬🇧 | **NowWash** (Đề Xuất) |
|---|-----------|----------|---------|-------------|-------------------|
| **Năm lập** | 2017 | 2013 | 2013 | 2014 | 2026 |
| **Trụ sở** | HCM, VN | Bắc Kinh, TQ | San Francisco, US | London, UK | HCM, VN |
| **Founders** | Lê Phước Phúc (tech), Huỳnh Nhật Phương (MBA) | Zhang Rongyao (truyền thống), Lu Wenyong (Baidu, CEO 2014-2017) | Ajay Prakash (Stanford MBA), James Joun (gia đình giặt rụt), Sam Cheng (CTO) | Deyan Dimitrov (Finance/Rocket Internet), Mayur Bommai | TBD |
| **Tổng khách (claim)** | 136K | 5M (peak) | N/A | Triệu items processed | — |
| **Retention** | ~3 lần/khách rồi bỏ | Phụ thuộc subsidy | Cao (Subscription lock) | Cao (Trustpilot 4.3, App 4.8) | Target: 12 lần/năm |
| **HBS Case Study** | ❌ | ✅ (617-034/038) | ❌ | ❌ | — |

---

### B. Mô Hình Kinh Doanh & Vận Hành

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Mô hình** | Franchise (mặt tiền) | Platform + CTV cộng đồng | Managed Marketplace | Asset-light Platform | **Company-owned Cluster** |
| **Sở hữu xưởng** | ⚠️ Franchise tự quản | ❌ Outsource | ❌ Partner xưởng | ❌ Partner xưởng | ✅ **Tự sở hữu** |
| **Kiểm soát QC** | ⚠️ Phụ thuộc franchisee | ❌ Rất yếu | ⚠️ Gián tiếp (SOP) | ⚠️ Gián tiếp (SOP+audit) | ✅ **100% trực tiếp** |
| **Kiểm soát logistics** | ⚠️ Shipper riêng | ❌ CTV nghiệp dư | ✅ W-2 Valet | ⚠️ Contract driver | ✅ Shipper bán thời gian có SOP |
| **Chi phí mặt bằng** | 🔴 Cao (storefront) | 🟡 Trung bình | 🟢 Thấp (không mặt tiền) | 🟢 Rất thấp | 🟢 **Rất thấp (xưởng trong hẻm)** |
| **Tốc độ scale** | Chậm (franchise) | Quá nhanh → sụp | Trung bình (acquisition) | Tốt (organic + franchise) | Chậm có chủ đích (CM gate) |

---

### C. Pricing Chi Tiết

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Pricing model** | Per kg + per item | **Per bag** (flat 99 RMB) | **Per lb** (W&F) + per item (DC) | Per kg (mixed) + per item | **Per bag (S/M/L)** |
| **Giá cơ bản** | 150K₫/6kg | 99 RMB/túi (~320K₫) | $3.49/lb (~87K₫/kg) | £18.85/6kg (~610K₫) | **79-179K₫/túi** |
| **Giá/kg quy đổi** | ~25K₫/kg | ~16-25K₫/kg (ước) | ~87K₫/kg | ~102K₫/kg | ~16-18K₫/kg (ước) |
| **Combo/Bulk** | Pack 4 lần = 100K₫/lần | Không rõ | Subscription bags | Subscription tiers | Subscription gói tháng |
| **Dry Cleaning (Sơ mi)** | 70-100K₫ | N/A | $5.95 (~149K₫) | £2.95 (~96K₫) | Phase 2 |
| **Min order** | Không rõ | Không | $30 (~750K₫) | £20 (~648K₫) | Không (Subscriber) |

---

### D. Subscription Model

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Có Subscription?** | ⚠️ Combo mua trước (KHÔNG auto-renew) | ❌ Không | ✅ **Core product** | ✅ Membership | ✅ **Core product** |
| **Cơ chế** | Mua 4 lần dùng khi nào tùy ý | — | Pre-purchase bags/month | Fee reduction + cashback | **Pre-purchase bags + auto-renew** |
| **Auto-renewal** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Rollover** | ❌ | ❌ | ✅ **Không bao giờ hết hạn** | ⚠️ Credit hết hạn 2 tháng | ✅ **Rollover max 2 tháng** |
| **Free delivery** | ❌ (≥1M mới miễn) | ❌ | ✅ | ✅ (miễn service fee) | ✅ |
| **Cross-sell credit** | ❌ | ❌ | ✅ $10/tháng DC | ✅ 10% cashback (Pro) | ✅ **50K₫/tháng cho Chăn Ga** |
| **Share with friend** | ❌ | ❌ | ❌ | ✅ **Chia sẻ 1 bạn** | ✅ **Share 1 hàng xóm cùng tòa** |
| **Slot cố định** | ❌ | ❌ | ⚠️ Linh hoạt | ⚠️ Linh hoạt | ✅ **T3/T6 cố định** |

---

### E. Logistics & Giao Nhận

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Turnaround** | 48-72h | 72h (target 48h) | 3-4 ngày | **24h** ⭐ | **36-48h** (target 24h) |
| **Phí ship** | 30-50K₫/chiều | Không rõ | $9.95/đơn | FREE | **FREE (Subscriber)** |
| **Khung giờ** | 9AM-9PM | Theo CTV | 8PM-10PM | Linh hoạt | **7PM-9PM pickup** |
| **Shipper** | Nhân viên riêng | CTV cộng đồng (về hưu) | W-2 Employee | Contract driver | **CTV bán thời gian + SOP** |
| **Contactless** | ❌ | ❌ | ✅ Rinse Drop | ✅ Safe-place delivery | ✅ **Cabin/Locker tòa nhà** |
| **Bằng chứng giao nhận** | Tag mã vạch | ❌ | ✅ Photo inventory | ❌ | ✅ **Seal QR + Camera Top-down** |

---

### F. B2B Programs

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Có B2B?** | ⚠️ Rất yếu | ❌ | ✅ | ✅ **Rất mạnh** | ✅ (Year 1) |
| **Hotel/Homestay** | ❌ | ❌ | ⚠️ Rental hosts | ✅ Hotels + commission | ✅ Airbnb HCM hosts |
| **Corporate** | ❌ | ❌ | ✅ @HOME/@WORK | ✅ Office/Corporate | ✅ Co-working (Dreamplex) |
| **Gym/Spa** | ❌ | ❌ | ⚠️ | ✅ Towels, uniforms | ✅ Khăn gym |
| **Linen Rental** | ❌ | ❌ | ❌ | ✅ **Cho thuê ga/khăn** | 🟡 Phase 2 |
| **% revenue B2B** | ~0-5% | 0% | ~10-15% | **30-40%** ⭐ | Target: 20-30% |

---

### G. Công Nghệ & App

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Kênh đặt** | App native (iOS/Android) | App + WeChat | App + Web + SMS | App + Web | **Zalo Mini App** ⭐ |
| **Tracking** | Tag mã vạch | ⚠️ | ✅ "Where's My Valet" | ✅ Live tracking | ✅ Event-Sourcing log |
| **AI Routing** | ❌ | ❌ | ✅ Routing algorithm | ✅ **ML route optimization** | Phase 2 |
| **Mobile Training** | ❌ | ❌ | ❌ | ✅ Edume platform | ✅ Video SOP trên điện thoại |
| **Camera QC** | ❌ | ❌ | Photo inventory | ❌ | ✅ **Camera Top-down bàn phân loại** |

---

### H. Funding & Hiệu Suất Vốn

| | HERAMO | eDaixi | Rinse | Laundryheap |
|---|--------|-------|-------|------------|
| **Tổng vốn** | Chưa công bố VC | **$123M** | $46.5M | **$22.9M** |
| **Nhà đầu tư** | Angel/Accelerator | Tencent, Baidu, SIG, Matrix | LG Electronics, Javelin, Partech | Sova VC, QVentures, Alex Chesterman |
| **Phạm vi** | 9 CN (HCM) | 16 TP TQ (peak) | 12 metro (US+CA) | **16 QG, 28 TP** ⭐ |
| **$/thành phố** | N/A | $7.7M/TP → co lại | $3.9M/TP | **$0.8M/TP** ⭐ |
| **Profitable?** | ❌ Chưa rõ | ❌ Lỗ nặng | ⚠️ Chưa rõ | ✅ **CM+ tại 70% markets** |

> 🏆 **Champion hiệu suất vốn: Laundryheap** — $22.9M cho 28 TP toàn cầu, gần profitable. eDaixi đốt $123M cho 16 TP rồi co lại.

---

### I. Chính Sách Đền Bù & SLA

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Trần đền bù mất đồ** | 5,000,000₫ | Không rõ | Không rõ | Không rõ | **10,000,000₫** |
| **Khung khiếu nại** | 48h | Không rõ | Không rõ | Không rõ | **72h** |
| **Bằng chứng cần** | Biên nhận điện tử (viết tay KHÔNG chấp nhận) | — | — | — | Camera Top-down + Seal QR |
| **Bảo hiểm đồ hiệu** | ❌ | ❌ | ❌ | ❌ | ✅ **Add-on 50K₫/đơn, trần 20M₫** |

---

### J. Sustainability

| | HERAMO | eDaixi | Rinse | Laundryheap | **NowWash** |
|---|--------|-------|-------|------------|-----------|
| **Xe xanh** | ❌ | ❌ | ❌ | ✅ **E-Cargo Bikes** | Xe máy điện (Phase 2) |
| **Giặt tiết kiệm năng lượng** | ❌ | ❌ | ❌ | ✅ Giặt 30°C mặc định | ✅ Giặt nước ấm |
| **Hóa chất xanh** | ❌ | ❌ | ❌ | ✅ Biodegradable + auto-dosing | ✅ Auto-dosing bột giặt |
| **Bao bì** | Túi plastic | Túi vải branded | Túi Rinse | ✅ Túi cotton tái sử dụng | ✅ **Túi vải in logo, tái sử dụng** |

---

## PHẦN II: BẢNG XẾP HẠNG TỔNG HỢP — AI THẮNG Ở ĐÂU

| Chiều đánh giá | 🥇 #1 | 🥈 #2 | 🥉 #3 | #4 |
|---------------|--------|--------|--------|-----|
| **Subscription Design** | Rinse | Laundryheap | NowWash (đề xuất) | HERAMO |
| **Profitability / Unit Economics** | **Laundryheap** | Rinse | HERAMO | eDaixi |
| **B2B Revenue** | **Laundryheap** | Rinse | — | — |
| **Turnaround Speed** | **Laundryheap** (24h) | NowWash (36-48h) | HERAMO (48-72h) | Rinse (3-4d) |
| **QC Control** | **NowWash** (tự quản) | HERAMO (franchise) | Rinse (SOP) | eDaixi (outsource) |
| **Hiệu suất vốn** | **Laundryheap** ($0.8M/TP) | Rinse ($3.9M/TP) | eDaixi ($7.7M/TP) | — |
| **Innovation (Pricing)** | eDaixi (Per-Bag pioneer) | Rinse (Rollover) | Laundryheap (Share) | HERAMO |
| **Tech & App UX** | Laundryheap (4.8/5) | Rinse | eDaixi (WeChat) | HERAMO |
| **Sustainability** | **Laundryheap** | — | — | — |
| **VN Market Fit** | **NowWash** | HERAMO | — | — |
| **Expansion Strategy** | **Laundryheap** (CM gate) | Rinse (Roll-up) | HERAMO (Franchise) | eDaixi (Blitz→Fail) |

---

## PHẦN III: 5 SAI LẦM CHẾT NGƯỜI TRONG NGÀNH

Tổng hợp từ Washio, Prim, eDaixi, FlyCleaners, Cleanly, và các startup đã phá sản:

| # | Sai Lầm | Case Study | NowWash Phòng Tránh |
|---|---------|-----------|-------------------|
| 1 | **Đốt tiền trợ giá** (Subsidy War) | eDaixi: Lỗ 30-50 RMB/đơn, đốt $123M | Không bán dưới giá thành. Nếu lỗ per-order → DỪNG scale |
| 2 | **Scale quá sớm** (Premature Scaling) | eDaixi: 16 TP trong 18 tháng, chưa profitable ở TP gốc | CM gate: ≥25 đơn/ngày bền vững, CM+ mới mở cluster mới |
| 3 | **Outsource xưởng** (Quality Drift) | eDaixi: Tiệm partner cắt góc QC → mất uy tín | Tự sở hữu xưởng + Camera Top-down |
| 4 | **Đa dạng hóa quá sớm** (Over-diversification) | eDaixi: Mở giao đồ ăn, dắt chó → brand loãng | Chỉ Wash & Fold Year 1-2. Không mở giày/túi/sofa |
| 5 | **Route Density thấp** (Inefficient Logistics) | Washio, Prim: 2 nhà/tối → $15-20/đơn logistics → lỗ nặng | Cluster xưởng ẩn bán kính 500m → logistics gần 0 |

---

## PHẦN IV: ĐỀ XUẤT CHÍNH SÁCH SẢN PHẨM NOWWASH V2.0

> Cập nhật từ v1.0 với bài học mới từ deep-dive Rinse (Rollover, Cross-sell) và Laundryheap (B2B, Share with friend, Sustainability, CM gate).

### A. Pricing Policy

**Nguyên tắc:** Bán theo Túi (3 tiers), KHÔNG bán theo Kg.

| Sản Phẩm | Giá | Capacity | Target |
|----------|-----|----------|--------|
| **Túi S** | 79,000₫ | ~3-5kg / 10-15 items | Độc thân, 1 tuần đồ |
| **Túi M** | 129,000₫ | ~6-8kg / 20-25 items | Cặp đôi |
| **Túi L** | 179,000₫ | ~10kg+ / 30-35 items | Gia đình 3-4 người |
| **Add-on: Chăn Ga** | 99,000₫/cái | 1 chăn hoặc 2 vỏ gối | Order riêng |
| **Phí ship (đơn lẻ)** | 15,000₫/chiều | — | Miễn cho Subscriber |

---

### B. Subscription Model

**Cập nhật v2.0 — Kết hợp Rinse (Rollover) + Laundryheap (Share):**

| Gói | Giá/Tháng | Bao Gồm | Target |
|-----|-----------|---------|--------|
| **Cá Nhân** | 349,000₫ | 4 túi S + Free ship + Free rush | Đi làm, 1 người |
| **Đôi** | 549,000₫ | 4 túi M + Free ship + Free rush | Cặp vợ chồng trẻ |
| **Gia Đình** | 699,000₫ | 4 túi L + Free ship + Free rush | Gia đình 3-4 người |
| **Đơn lẻ** | Giá bảng + 15K ship | Không commitment | Khách thử |

**Quyền lợi Subscriber (MỚI v2.0):**

| Benefit | Chi Tiết | Học Từ |
|---------|----------|-------|
| ✅ **Free delivery** | Miễn hoàn toàn phí ship | Rinse + Laundryheap |
| ✅ **Free Next-Day Rush** | Giao nhanh 24h miễn phí | Rinse |
| ✅ **Rollover 2 tháng** | Túi chưa dùng carry sang tháng sau (max 2 tháng) | Rinse |
| ✅ **Cross-sell credit 50K₫/tháng** | Dùng cho Chăn Ga hoặc Đồ Đặc Biệt | Rinse ($10 DC credit) |
| ✅ **Share với 1 hàng xóm cùng tòa** | Hàng xóm dùng free membership benefits | Laundryheap (Share with friend) |
| ✅ **Slot cố định T3/T6** | Shipper tự đến đúng lịch, không cần đặt lại | NowWash original |

---

### C. B2B Strategy (NEW — Học Từ Laundryheap)

> **Mục tiêu: B2B chiếm 20-30% revenue từ Year 1 để fill capacity rỗi ban ngày**

| Vertical | Target Khách | Dịch Vụ | Revenue Model |
|---------|-------------|---------|-------------|
| **Airbnb/Homestay HCM** | Hosts trong cluster CC | Turn-around ga/gối giữa booking | Per-booking (100-150K₫/bộ) |
| **Co-working (Dreamplex, WeWork)** | Manager tòa nhà | Khăn phòng tắm, gym mini | Monthly contract |
| **Gym (California, Jetts)** | Manager chi nhánh | Khăn tập | Monthly contract |
| **BQL Tòa Nhà** | Ban quản lý CC | Đồng phục bảo vệ, khăn lobby | Monthly contract + "Trojan Horse" vào tòa |
| **F&B Chains** | Highland, Phúc Long | Tạp dề, khăn bàn | Monthly contract |

**Phase 2: Linen Rental** (Cho thuê ga/khăn hospitality-grade → Thu phí thuê + phí giặt = double revenue)

---

### D. Logistics & SLA

| Cam Kết | Chi Tiết | Benchmark |
|---------|----------|----------|
| **Turnaround** | 36-48h (target 24h khi cluster mature) | Laundryheap: 24h |
| **Pickup window** | 7:00 PM - 9:00 PM (buổi tối khi khách đã về) | Rinse: 8-10PM |
| **Delivery** | Sáng hôm sau hoặc tối hôm sau (tùy tier) | — |
| **Slot cố định** | T3 + T6 (Auto, không cần đặt lại) | NowWash original |
| **Contactless** | Để đồ ở Cabin/Locker tòa nhà | Rinse Drop, LH Safe-place |
| **Bằng chứng** | Seal QR vật lý + Camera Top-down tại bàn phân loại | Photo Inventory (Rinse) |
| **Đền bù** | Max 10M₫. Add-on Bảo hiểm Đồ Hiệu 50K₫/đơn (trần 20M₫) | HERAMO: Max 5M₫ |
| **Khung KN** | 72 giờ (so với HERAMO: 48h) | — |

---

### E. GTM — Building-as-a-Channel

| Bước | Hành Động | Metric |
|------|----------|--------|
| 1 | Ký MOU exclusive với BQL 3-5 tòa CC trong 1 cluster | ≥ 3 tòa signed |
| 2 | Đặt QR code NowWash tại bảng tin thang máy, lobby | Impressions tracking |
| 3 | Join Zalo Group cư dân → content "Giặt sạch hơn, rẻ hơn, không trộn đồ" | 10% residents aware |
| 4 | Referral nội tòa: Giới thiệu hàng xóm → tặng 1 túi free | Activation rate ≥ 5% |
| 5 | Share membership: Subscriber chia sẻ cho 1 hàng xóm | Viral coefficient ≥ 1.2 |
| 6 | B2B: Ký contract BQL (đồng phục bảo vệ) → "Trojan Horse" vào tòa | B2B revenue week 2+ |

---

### F. Moat — 5 Hào Thành Cạnh Tranh

| # | Moat | Tại Sao Khó Copy | Học Từ |
|---|------|-----------------|-------|
| 1 | **Thỏa thuận exclusive BQL tòa nhà** | Competitor muốn vào phải đàm phán lại — mất 3-6 tháng | Rinse Property Partners |
| 2 | **Seal vật lý QR "1 nhà 1 mẻ"** | Cần đầu tư dây chuyền Seal + Camera + QR system | NowWash original |
| 3 | **Xưởng tự quản (Company-owned)** | Competitor dùng franchise/outsource không match QC | Bài học eDaixi failure |
| 4 | **Cluster proximity (xưởng 500m)** | Đối thủ cần tìm mặt bằng tương tự — cung hạn chế | NowWash original |
| 5 | **Subscription lock-in + Rollover** | Khách đã trả trước + bags carry over → churn cực thấp | Rinse Repeat |

---

## PHẦN V: DECISION MATRIX — NOWWASH CHỌN GÌ TỪ AI

| Quyết Định | Chọn Từ | Bài Học Cụ Thể | Ưu Tiên |
|-----------|---------|---------------|---------|
| Per-Bag pricing 3 tiers | **eDaixi** (pioneer) + NowWash adapt | 3 sizes thay vì 1 size → fix "heavy-stuffer problem" | 🔴 Critical |
| Subscription-first DNA | **Rinse** | Sub = core product #1, không phải add-on | 🔴 Critical |
| Rollover bags chưa dùng | **Rinse** | Giảm churn. Carry max 2 tháng | 🔴 Critical |
| Cross-sell credit | **Rinse** ($10/tháng) | 50K₫/tháng cho Chăn Ga | 🟠 High |
| Share membership hàng xóm | **Laundryheap** | Viral nội tòa nhà → organic growth | 🔴 Critical |
| B2B lấp capacity rỗi | **Laundryheap** (30-40% rev) | Airbnb hosts + Gym + BQL tòa nhà | 🔴 Critical |
| Bootstrap → chứng minh PMF → gọi vốn | **Laundryheap** (2 năm tự nuôi) | Không gọi vốn trước khi cluster 1 đạt 25 đơn/ngày | 🔴 Critical |
| CM gate per cluster | **Laundryheap** | Không mở Cluster 2 nếu Cluster 1 chưa CM+ | 🔴 Critical |
| Zalo Mini App (= WeChat) | **eDaixi** (WeChat pioneer) | 95% dân HCM dùng Zalo. 0 barrier | 🔴 Critical |
| W-2/trained shipper | **Rinse** (Valet system) | Shipper có SOP + đồng phục + KPI. Không gig | 🟠 High |
| Evening pickup (7-9PM) | **Rinse** (8-10PM) | Khách đã về nhà → pickup rate cao | 🟠 High |
| Contactless delivery | **Rinse** (Drop) + **LH** (Safe-place) | Cabin/Locker tòa nhà | 🟡 Medium |
| Seal QR + Camera Top-down | **NowWash original** | Bằng chứng chủ động. Không ai làm | 🔴 Critical |
| Cluster xưởng ẩn 500m | **NowWash original** | Logistics gần 0. Chi phí mặt bằng giảm 60-70% | 🔴 Critical |
| Sustainability (eco) | **Laundryheap** | Auto-dosing, giặt ấm, túi vải tái sử dụng | 🟠 High |
| Trần đền bù 10M + Bảo hiểm đồ hiệu | Học ngược **HERAMO** (5M₫ quá thấp) | Nâng lên 10M₫ + add-on 50K₫/đơn | 🟡 Medium |
| Mobile training SOP | **Laundryheap** (Edume) | Video SOP trên điện thoại. Scale onboard nhanh | 🟠 High |
| Acquisition roll-up (Phase 3+) | **Rinse** (8 acquisitions) | Mua tiệm nhỏ trong cluster khi dominate | 🟡 Future |

---

## TÓM TẮT KHUYẾN NGHỊ CHIẾN LƯỢC

| Chiều | Hành Động | Source |
|-------|-----------|-------|
| **Pricing** | Per-Bag S/M/L (79-179K₫). Không cân nặng | eDaixi + NowWash |
| **Subscription** | Core product #1. Rollover 2 tháng. Share 1 hàng xóm. Credit 50K chăn ga | Rinse + Laundryheap |
| **B2B** | 20-30% revenue từ Year 1. Airbnb hosts + Gym + BQL tòa. Fill capacity ban ngày | Laundryheap |
| **Logistics** | Slot T3/T6 cố định. Pickup 7-9PM. Xưởng 500m. Seal QR | Rinse + NowWash |
| **Scale** | CM gate per cluster. ≥25 đơn/ngày bền vững mới mở tiếp. Max 1-2 cluster/quý | Laundryheap |
| **GTM** | Building-as-Channel. Zalo Group = kênh #1. Referral nội tòa | NowWash + eDaixi |
| **Moat** | 5 hào thành: Exclusive BQL + Seal QR + Xưởng tự quản + Cluster 500m + Subscription lock | NowWash + Rinse |
| **Funding** | Bootstrap → chứng minh PMF → gọi vốn. KHÔNG đốt tiền subsidy | Laundryheap |
| **QC** | Tự sở hữu xưởng. Camera top-down. KHÔNG outsource | Bài học eDaixi |
| **Sustainability** | Auto-dosing bột giặt. Giặt ấm. Túi vải tái sử dụng | Laundryheap |

---

## Deep-dive Files

| # | Brand | File | Điểm nhấn |
|---|-------|------|----------|
| 01 | HERAMO 🇻🇳 | [01_heramo.md](competitors/01_heramo.md) | Bảng giá 40+ SKU, 9 chi nhánh, Pack 4 lần 100K/lần, Trần đền bù 5M₫ |
| 02 | eDaixi 🇨🇳 | [02_edaixi.md](competitors/02_edaixi.md) | Mô hình Túi 99 Tệ, CTV "Xiaoe Guanjia", 4 sai lầm chết người, HBS Case Study |
| 03 | Rinse 🇺🇸 | [03_rinse.md](competitors/03_rinse.md) | Subscription Rollover, W-2 Valet, 8 acquisitions, Route Density strategy |
| 04 | Laundryheap 🇬🇧 | [04_laundryheap.md](competitors/04_laundryheap.md) | B2B vertical (30-40% revenue), $22.9M→28 TP, CM+ 70% markets, E-Cargo bikes |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-02 | Initial version — Overview 4 thị trường, đề xuất Pricing + Subscription + GTM |
| 2.0 | 2026-04-02 | **Major rewrite** — Tổng hợp từ 4 bản deep-dive. Thêm: Cross-competitor matrix (10 chiều × 5 players), Bảng xếp hạng tổng hợp, 5 sai lầm chết người, Subscription v2.0 (Rollover + Share + Cross-sell credit), B2B Strategy mới (5 verticals), Moat framework (5 hào thành), Decision Matrix (17 quyết định + source), Hiệu suất vốn benchmark ($0.8M-$7.7M/TP), SLA & Đền bù nâng cấp (10M₫ + Bảo hiểm đồ hiệu), Sustainability policy |
